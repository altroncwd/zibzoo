var Customer = require('./customerModel.js');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

module.exports = {

  postCustomer: function (customerObj) {
    return Customer
      .findOne({
        customername: customerObj.customername
      })
      .then(function (customer) {
        if (customer) {
          throw new Error('Customer already exists.');
        }

        var newCustomer = new Customer(customerObj);

        return newCustomer.save();
      })
      .then(function (result) {
        if (!result) {
          throw new Error('Unable to save customer.');
        }

        return result;
      })
      .catch(function (error) {
        return error;
      });
  },

  getCustomer: function (customerObj) {
    return Customer
      .findOne({
        customername: customerObj.customername
      })
      .then(function (customer) {
        if (!customer) {
          throw new Error('Customer does not exist.');
        }

        return customer;
      })
      .catch(function (error) {
        return error;
      });
  }

};

