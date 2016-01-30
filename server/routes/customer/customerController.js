var authUtils = require('../../utils/auth.utils.js');
var controllerUtils = require('../../utils/controller.utils.js');
var customerHelpers = require('../../db/customer/customerHelpers.js');

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

  chargeCustomer: function (req, res) {
    var ordersToCharge = req.body.orders;

    // var chargeReq = {
    //   customerId: '98g9hg9a2e6',
    //   customerEmail: 'customer@customer.com',
    //   orders: {
    //     'asdfasgoi24': [{ /* order 1 information */ }, { /* order 2 information */ }],
    //     'q89qfhwo347': [{ /* order 1 information */ }, { /* order 2 information */ }]
    //   }
    // };

    // stripe charge example
    // var stripe = require('stripe')(api_key);

    // stripe.charges.create({
    //   amount: 1600,
    //   currency: 'usd',
    //   customer: customer.id
    // }, function (err, charge) {
    //   if (err) {
    //     // bad things
    //   } else {
    //     // successful charge
    //   }
    // });

    for (var order in ordersToCharge) {
      if (ordersToCharge.hasOwnProperty(order)) {
        // asynchronously get vendor's stripeKey
        // then asynchronously call stripe.charge(vendorApiKey)
        // handle the result
      }
    }
  }

};

