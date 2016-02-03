var Customer = require('./customerModel.js');
var Order = require('../order/orderModel');
var Vendor = require('../vendor/vendorModel');
var utils = require('../config/utils.js');
var Promise = require('bluebird');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var stripe = require('stripe');



// Promisify libraries
mongoose.Promise = Promise;

function _findOneCustomerByProperty(customerObj) {
  return Customer
    .findOne({
      email: customerObj.email
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


module.exports = {

  signIn: function (req, res) {
    var customer = req.body;
    var password = customer.password;

    _findOneCustomerByProperty({ email: customer.email })
      .then(function (foundCustomer) {
        var customerData;
        if (!(foundCustomer instanceof Error)) {
          customerData = {
            _id: foundCustomer._id,
            isVendor: foundCustomer.isVendor
          };
        }
        // console.log(foundVendor.prototype);
        return [customerData, foundCustomer, bcrypt.compareAsync(password, foundCustomer.password)];
        // return foundVendor.schema.verifyPassword(password);
      })
      .spread(function (customerData, foundCustomer, isMatch) {
        if (isMatch) {
          req.token = utils.issueToken(customerData);
          // console.log(req);
        } else {
          throw new Error('Incorrect username or password.');
        }

        utils.sendHttpResponse(foundCustomer, res, 200, 403);
      })
      .catch(function (error) {
        utils.sendHttpResponse(error, res, 200, 403);
      });
  },

  signUp: function (req, res) {
    var customer = req.body;

    utils.saveOneUserByEmail(customer, Customer)
      .then(function (savedCustomer) {
        utils.sendHttpResponse(savedCustomer, res, 201, 403);
      });
  },

  updateCustomer: function (req, res) {
    var customer = req.body;

    utils.modifyOneRecordById(customer)
      .then(function (docsAffected) {
        utils.sendHttpResponse(docsAffected, res, 304, 404);
      });
  },

  chargeOrders: function (req, res) {
    var charge = req.body;
    var orders = charge.orders;
    var vendorIds = Object.keys(orders);
    var stripeId = charge.stripeId;

    Promise
      .map(vendorIds, function (vendorId) {
        return Vendor.findOne({ _id: vendorId }, 'stripeApiKey');
      })
      .then(function (apiKeyArr) {
        return Promise.map(apiKeyArr, function (apiKey, keyIndex) {
          var orderItems = orders[vendorIds[keyIndex]];
          var orderPrice = orderItems.reduce(function (total, item) {
            return total + (item.price * 100);
          }, 0);

          var chargeRecipient = stripe(apiKey.stripeApiKey);
          var chargeObj = {
            amount: orderPrice,
            currency: 'usd',
            customer: stripeId,
            metadata: {
              email: charge.email,
              vendorId: vendorIds[keyIndex]
            }
          };

          return chargeRecipient.charges.create(chargeObj);
        });
      })
      .then(function (chargeObjArr) {
        var failedOrders = [];
        var successfulOrders = [];

        for (var ii = 0; ii < chargeObjArr.length; ii++) {
          var chargeObj = chargeObjArr[ii];
          var vendorId = chargeObj.metadata.vendorId;
          if (chargeObj.status === 'succeeded') {

            successfulOrders.push(charge.orders[vendorId]);
          } else {
            failedOrders.push(charge.orders[vendorId]);
          }
        }

        return [Promise.map(successfulOrders, function (successfulOrderArr) {

          var order = {
            orderItems: successfulOrderArr
          };

          console.log(successfulOrderArr);

          var newOrder = new Order(order);

        }), failedOrders];
      })
      .spread(function (successfulOrders, failedOrders) {

      });
  },

  // TODO: refactor
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
        amount: amount * 100,
        currency: 'usd',
        customer: customerId
      }, function (err, charge) {
        if (err) {
          utils.sendHttpResponse(err, res, 500, 500);
        } else {
          utils.sendHttpResponse(charge, res, 200, 500);
        }
      });
    }
  }

};


// Export private functions for testing
if (process.env.NODE_ENV === 'test') {
  module.exports._findCustomerByEmail = _findCustomerByEmail;
}
