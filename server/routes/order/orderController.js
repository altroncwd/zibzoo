var Order = require('../../db/order/orderModel.js');
var controllerUtils = require('../../utils/controller.utils.js');
var mongoose = require('mongoose');
var Promise = require('bluebird');

require('../../db/menuItem/menuItemModel.js');

mongoose.Promise = Promise;

function _updateRecord(recordObj, Model) {
  return Model.update(
    { _id: recordObj._id },
    { $set: recordObj.propertiesToUpdate })
    .then(function (affectedDocsObj) {
      if (affectedDocsObj.nModified === 0) {
        throw new Error('No records were updated.');
      }

      return affectedDocsObj;
    })
    .catch(function (error) {
      return error;
    });
}

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

  postMultipleOrders: function (req, res) {
    var orders = req.body.orders;

    _saveMultipleOrders(orders)
      .then(function (result) {
        controllerUtils.sendHttpResponse(result, res, 201, 403);
      });
  },

  // TODO: look into tidying up model selection
  getMultipleOrders: function (req, res) {
    var searchParams = {};
    var token = req.token;
    var model = '';

    if (token.isVendor) {
      model = 'Customer';
      searchParams.vendorId = token._id;
    } else {
      model = 'Vendor';
      searchParams.customerId = token._id;
    }

    _findMultipleOrders(searchParams, model)
      .then(function (orders) {
        controllerUtils.sendHttpResponse(orders, res, 200, 404);
      });
  },

  modifyOneOrder: function (req, res) {
    var order = req.body.order;

    // NOTE: change to utility version of update record
    _updateRecord(order, Order)
      .then(function (orderUpdateStatus) {
        controllerUtils.sendHttpResponse(orderUpdateStatus, res, 304, 404);
      });
  },

};
