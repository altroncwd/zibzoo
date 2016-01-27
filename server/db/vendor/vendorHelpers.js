var Vendor = require('./vendorModel');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

module.exports = {

  postVendor: function (vendorObj) {
    return Vendor
      .findOne({
        email: vendorObj.email
      })
      .then(function (vendor) {
        if (vendor) {
          throw new Error('Vendor already exists.');
        }

        var newVendor = new Vendor(vendorObj);

        return newVendor.save();
      })
      .then(function (result) {
        if (!result) {
          throw new Error('Unable to save vendor.');
        }

        return result;
      })
      .catch(function (error) {
        return error;
      });
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
    return Vendor.update(
      { _id: vendorObj._id },
      { $set: vendorObj.propertiesToUpdate },
      function (error) {
        if (error) {
          throw new Error('Unable to update vendor data.');
        }
      })
      .then(function (affectedDocsObj) {
        return affectedDocsObj.result.n;
      })
      .catch(function (error) {
        return error;
      });
  }

};
