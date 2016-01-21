var Vendor = require('./vendorsModel');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

module.exports = {

  postVendor: function (vendorObj) {
    return Vendor
      .findOne({
        name: vendorObj.name
      })
      .then(function (vendor) {
        if (vendor) {
          throw Error('Vendor already exists.');
        }

        var newVendor = new Vendor(vendorObj);

        return newVendor.save();
      })
      .then(function (result) {
        if (!result) {
          throw Error('Unable to save vendor.');
        }

        return result;
      })
      .catch(function (error) {
        return error;
      });
  },

  getVendor: function (vendorObj) {
    return Vendor
      .findOne({
        name: vendorObj.name
      })
      .then(function (vendor) {
        if (!vendor) {
          throw Error('Vendor does not exist.');
        }

        return vendor;
      })
      .catch(function (error) {
        return error;
      });
  }

};
