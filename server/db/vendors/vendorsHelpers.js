var Vendor = require('./vendorsModel');
var Promise = require('bluebird');
Promise.promisifyAll(require('mongoose'));

module.exports = {

  postVendor: function(vendorObj) {
    Vendor.findOne({
      'vendorName': vendorObj.vendorName
    })
    .then(function(vendor) {
      if(vendor) {
        throw Error('Vendor already exists!')
      }
      var newVendor = new Vendor({
        'vendorName': vendorRecord.vendorName
      });
      newVendor.save()
        .then(function(result) {
          if(!result) {
            throw Error('Unable to save vendor');
          }
          res.status(201).send(result);
        })
    })
    .catch(function(error) {
      console.log("Error adding vendor: ", error);
    });
  }

  getVendor: function(vendorRecord) {
    Vendor.findOne({
      'vendorName': vendorRecord.vendorName
    })
    .populate('menuIds')
    .then(function(vendor) {
      if(!vendor) {
        throw Error('Vendor does not exist');
      }
      Vendor.populate(vendor, {
        path: 'menuIds.menuItemIds',
        model: 'MenuItems'
      })
      .then(function(result) {
        if(!result) {
          throw Error('Error retrieving vendor');
        }
        res.status(200).send(result);
      });
    })
    .catch(function(error) {
      console.log("Error retrieving vendor: ", error);
    })
  }

}