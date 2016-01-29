var dbUtils = require('../../utils/db.utils.js');
var Vendor = require('./vendorModel');
var mongoose = require('mongoose');

require('../menuItem/menuItemModel.js');

mongoose.Promise = require('bluebird');

module.exports = {

  postVendor: function (vendorObj) {
    return dbUtils.postUser(vendorObj, Vendor);
  },

  // NOTE: returns an array
  getVendors: function (vendorObj) {
    if (arguments.length > 1) {
      var searchParams = {};

      for (var i = 1; i < arguments.length; i++) {
        searchParams[arguments[i]] = vendorObj[arguments[i]];
      }

      vendorObj = searchParams;
    }

    return Vendor
      .find(vendorObj)
      .populate('menuItems')
      .then(function (vendors) {
        if (vendors.length === 0) {
          throw new Error('Unable to find vendor(s).');
        }

        return vendors;
      })
      .catch(function (error) {
        return error;
      });
  },

  updateVendor: function (vendorObj) {
    return dbUtils.updateRecord(vendorObj, Vendor);
  }

};
