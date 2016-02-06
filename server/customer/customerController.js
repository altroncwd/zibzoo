var Customer = require('./customerModel.js');
var utils = require('../config/utils.js');
var Order = require('../order/orderModel.js');
var Vendor = require('../vendor/vendorModel.js');
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


module.exports = function (socket) {
  return {
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
      utils.modifyOneRecordById(customer, Customer)
        .then(function (docsAffected) {
          utils.sendHttpResponse(docsAffected, res, 304, 404);
        });
    },

    chargeOrders: function (chargeData) {
      var charge = chargeData;
      var orders = charge.orders;
      var vendorIds = Object.keys(orders);
      var stripeId = charge.stripeId;

      return Promise
        .map(vendorIds, function (vendorId) {
          return Vendor.findOne({ _id: vendorId }, 'stripeApiKey');
        })
        .then(function (apiKeyArr) {
          return Promise.map(apiKeyArr, function (apiKey, key) {
            var orderItems = orders[vendorIds[key]];
            var orderPrice = orderItems.reduce(function (total, item, index) {
              return total + (orderItems[index].item.price * 100);
            }, 0);

            var chargeRecipient = stripe(apiKey.stripeApiKey);
            var chargeObj = {
              amount: orderPrice,
              currency: 'usd',
              customer: stripeId,
              metadata: {
                email: charge.email,
                vendorId: vendorIds[key]
              }
            };
            console.log("BEFORE CHARGE");
            return chargeRecipient.charges.create(chargeObj);
          });
        })
        .then(function (chargeObjArr) {
          var savedOrders = [];
          console.log("AFTER CHARGE");
          for (var i = 0; i < chargeObjArr.length; i++) {
            var order = {
              vendorId: vendorIds[i],
              customerId: charge._id,
              customerEmail: chargeObjArr[i].metadata.email,
              transactionId: chargeObjArr[i].id,
              transactionStatus: chargeObjArr[i].status,
              orderItems: orders[vendorIds[i]]
            };

            if (order.transactionStatus === 'failure') {
              order.isActive = false;
            }

            savedOrders.push(order);
          }

          return Promise.map(savedOrders, function (savedOrder) {
            var newOrder = new Order(savedOrder);
            return newOrder.save();
          });
        })
        .then(function (storedOrders) {
          // console.log(storedOrders);
          // TODO: Remove unnecessary code if sockets are implemented separately
          for (var i = 0; i < storedOrders.length; i++) {
            var storedOrder = storedOrders[i];
            if (storedOrder.transactionStatus === 'succeeded') {

              console.log(storedOrder.vendorId);
              console.log(storedOrder);
              socket.to(storedOrder.vendorId).emit('newOrder', storedOrder);
            }
          }

          // utils.sendHttpResponse(storedOrders, res, 201, 404);
        });

    }
  };

};


// Export private functions for testing
if (process.env.NODE_ENV === 'test') {
  module.exports._findCustomerByEmail = _findOneCustomerByProperty;
}
