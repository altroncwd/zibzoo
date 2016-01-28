var dbUtils = require('../../utils/db.utils.js');
var Vendor = require('./vendorModel');
var mongoose = require('mongoose');

mongoose.Promise = require('bluebird');

module.exports = {

  postVendor: function (vendorObj) {
    return dbUtils.postUser(vendorObj, Vendor);
  },

  getVendors: function (vendorObj) {
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
