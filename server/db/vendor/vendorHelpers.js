var Vendor = require('./vendorModel');
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

  getOneVendor: function (vendorObj) {
    return Vendor
      .find(vendorObj)
      .populate('menuItems')
      .then(function (vendor) {
        if (vendor.length === 0) {
          throw Error('Vendor does not exist.');
        }
        // console.log('VENDOR MENU ITEMS: ', vendor[0].menuItems);
        return vendor;
      })
      .catch(function (error) {

        return error;
      });
  },

  getVendors: function (vendorObj) {
    return Vendor
      .find(vendorObj)
      .populate('menuIds')
      .then(function (vendors) {
        if (!vendors) {
          throw Error('Vendors do not exist.');
        }

        return Vendor.populate(vendors, {
          path: 'menuIds.menuItemIds',
          model: 'MenuItem'
        });

        // return vendors;
      })
      .then(function (results) {
        return results;
      })
      .catch(function (error) {
        return error;
      });
  }

};
