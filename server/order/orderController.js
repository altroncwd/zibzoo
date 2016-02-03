var Order = require('./orderModel.js');
var utils = require('../config/utils.js');
var Promise = require('bluebird');
var mongoose = require('mongoose');


// Promisify libraries
mongoose.Promise = Promise;


function _findMultipleOrders(queryObj, referenceModel) {
  return Order
    .find(queryObj)
    .populate({ path: referenceModel, select: 'name' })
    .then(function (orders) {
      if (orders.length === 0) {
        throw new Error('Unable to retrieve orders.');
      }

      return orders;
    })
    .catch(function (error) {
      return error;
    });
}

function _saveMultipleOrders(orderArr) {
  return Promise
    .map(orderArr, function (order) {
      var newOrder = new Order(order);
      return newOrder.save();
    })
    .then(function (orders) {
      return orders;
    })
    .catch(function (error) {
      return error;
    });
}


module.exports = {

  // TODO: tidy up model selection
  getMultipleOrders: function (req, res) {
    var searchParams = {};
    var token = req.token;
    var model = '';

    if (token && token.isVendor) {
      model = 'Customer';
      searchParams.vendorId = token._id;
    } else {
      model = 'Vendor';
      searchParams.customerId = token._id;
    }

    _findMultipleOrders(searchParams, model)
      .then(function (orders) {
        utils.sendHttpResponse(orders, res, 200, 404);
      });
  },

  postMultipleOrders: function (req, res) {
    var orders = req.body.orders;

    _saveMultipleOrders(orders)
      .then(function (savedOrders) {
        utils.sendHttpResponse(savedOrders, res, 201, 403);
      });
  },

  updateOneOrder: function (req, res) {
    var order = req.body.order;

    utils.modifyOneRecordById(order, Order)
      .then(function (orderUpdateStatus) {
        utils.sendHttpResponse(orderUpdateStatus, res, 304, 404);
      });
  }

};


// Export private functions for testing
if (process.env.NODE_ENV === 'test') {
  module.exports._findMultipleOrders = _findMultipleOrders;
  module.exports._saveMultipleOrders = _saveMultipleOrders;
}
