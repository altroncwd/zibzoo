var MenuItem = require('./menuItemModel');
var Vendor = require('./../vendor/vendorModel.js');
var mongoose = require('mongoose');

mongoose.Promise = require('bluebird');

module.exports = {

  postMenuItem: function (menuItemObj) {
    var newMenuItem = new MenuItem(menuItemObj);

    return newMenuItem
      .save()
      .then(function (menuItem) {
        if (!menuItem) {
          throw Error('Unable to save menu item.');
        }

        Vendor.update(
          { _id: menuItemObj.vendorId },
          { $push: { menuItems: menuItem._id } },
          function (error) {
            if (error) {
              throw Error('Unable to update vendor.');
            }
          }
        );

        return menuItem;
      })
      .catch(function (error) {

        return error;
      });
  },

  deleteMenuItem: function (menuItemObj) {
    MenuItem.findById(menuItemObj.menuItemId)
      .then(function (menuItem) {
        MenuItem.update({ _id: menuItem._id }, { $pull: { menuItemIds: menuItem._id } });
        return menuItem.remove();
      })
      .catch(function (error) {

        return error;
      });
  }

};
