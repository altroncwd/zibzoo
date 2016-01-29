var configuration = require('../../utils/image.utils.js');
var cloudinary = require('cloudinary');
var dbUtils = require('../../utils/db.utils.js');
var Vendor = require('./vendorModel');
var mongoose = require('mongoose');
var Promise = require('bluebird');

require('../menuItem/menuItemModel.js');

mongoose.Promise = Promise;

cloudinary.config(configuration);
Promise.promisify(cloudinary.uploader.upload);

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
  },

  uploadImage: function (imagePath) {
    return cloudinary.uploader.upload(imagePath)
      .then(function (response) {
        console.log(response);
      });
  }
};
