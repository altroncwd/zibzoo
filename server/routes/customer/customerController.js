var Customer = require('../../db/customer/customerModel.js');
var jwt = require('jwt-simple');
var mongoose = require('mongoose');
var env = require('env');
var SWIPE_API_KEY = process.env.SWIPE_API_KEY || env.SWIPE_TEST_API_KEY;

mongoose.Promise = require('bluebird');

module.exports = {

  signUp: function (req, res, next) {
    var email = req.body.email;
    var password = req.body.password;

    Customer.findOne({
      email: email
    })
    .then(function (customer) {
      if (customer) {
        res.status(403).send({ error: 'Customer already exists' });
        next(new Error('Customer already exists'));
      }

      var newCustomer = {
        email: email,
        password: password,
      };

      newCustomer = new Customer(newCustomer);
      return newCustomer.save();
    })
    .then(function (customer) {
      res.json({
        id: customer._id,
        email: customer.email,
        isVendor: customer.isVendor,
        token: jwt.encode(customer, 'secret')
      });
    })
    .catch(function (error) {
      return error;
    });
  },

  signIn: function (req, res, next) {
    var email = req.body.email;
    var password = req.body.password;

    Customer.findOne({
      email: email
    })
    .then(function (customer) {
      if (!customer) {
        res.status(401).send({ error: 'Customer does not exist' });
        next(new Error('Customer does not exist'));
      }

      return customer.checkPassword(password)
        .then(function (isMatch) {
          if (isMatch) {
            res.json({
              id: customer._id,
              email: customer.email,
              isVendor: customer.isVendor,
              token: jwt.encode(customer, 'secret')
            });
          } else {
            res.status(401).send('Customername/password does not exist');
            next(new Error('Customername/password does not exist'));
          }
        });
    })
    .catch(function (error) {
      return error;
    });
  }
};
