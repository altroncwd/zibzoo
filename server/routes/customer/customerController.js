var customerHelpers = require('../../db/customer/customerHelpers.js');
var utils = require('../../config/utilities.js');

module.exports = {

  signUp: function (req, res) {
    var customer = {
      email: req.body.email,
      password: req.body.password
    };

    customerHelpers.postCustomer(customer)
      .then(function (result) {
        utils.authSignUp(result, res);
      })
      .catch(function (error) {
        return error;
      });
  },

  signIn: function (req, res) {
    var customer = {
      email: req.body.email,
      password: req.body.password
    };

    customerHelpers.getCustomer(customer)
      .then()
      .catch();

    // Customer.findOne({
    //   email: email
    // })
    //   .then(function (customer) {
    //     if (!customer) {
    //       res.status(401).send({ error: 'Customer does not exist' });
    //       next(new Error('Customer does not exist'));
    //     }

    //     return customer.checkPassword(password)
    //       .then(function (isMatch) {
    //         if (isMatch) {
    //           res.json({
    //             id: customer._id,
    //             email: customer.email,
    //             isVendor: customer.isVendor,
    //             token: jwt.encode(customer, 'secret')
    //           });
    //         } else {
    //           res.status(401).send('Customername/password does not exist');
    //           next(new Error('Customername/password does not exist'));
    //         }
    //       });
    //   })
    //   .catch(function (error) {
    //     return error;
    //   });
  }

};
