var authUtils = require('../../utils/auth.utils.js');
var controllerUtils = require('../../utils/controller.utils.js');
var customerHelpers = require('../../db/customer/customerHelpers.js');
var _ = require('underscore');

module.exports = {

  signUp: function (req, res) {
    authUtils.authorizeEntry(req, res, 201, 403, customerHelpers.postCustomer);
  },

  signIn: function (req, res) {
    authUtils.authorizeEntry(req, res, 200, 404, customerHelpers.getCustomer);
  },

  updateCustomer: function (req, res) {
    customerHelpers.updateCustomer(req.body)
      .then(function (result) {
        controllerUtils.sendHttpResponse(result, res, 304, 404);
      });
  },

  charge: function (req, res) {
    var customerId = process.env.STRIPE_CUSTOMER_ID; // test customer id
    var email = req.body.email;
    var orders = req.body.orders;

    for (var vendorId in orders) {
      if (!orders.hasOwnProperty(vendorId)) continue;

      var stripe = require('stripe')(process.env.STRIPE_TEST_API_KEY);
      var amount = _.reduce(orders[vendorId], function (total, order) {
        return total + order.item.price;
      }, 0);

      stripe.charges.create({
        amount: amount,
        currency: 'usd',
        customer: customerId
      }, function (err, charge) {
        if (err) {
          controllerUtils.sendHttpResponse(err, res, 500, 500);
        } else {
          controllerUtils.sendHttpResponse(charge, res, 200, 500);
        }
      });
    }
  }

};

