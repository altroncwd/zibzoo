var MenuItem = require('./menuItemModel');
var Vendor = require('./../vendor/vendorModel.js');
var mongoose = require('mongoose');

mongoose.Promise = require('bluebird');

module.exports = {

  postMenuItem: function (menuObj) {
    return MenuItem
      .findOne(menuObj)
      .then(function (menu) {
        if (menu) {
          throw Error('Menu already exists');
        }

        var newMenu = new MenuItem(menuObj);

        return newMenu.save();
      })
      .then(function (result) {
        if (!result) {
          throw Error('Unable to save menu');
        }

        Vendor.update(
          { _id: menuObj.vendorId },
          { $push: { menuIds: result._id } },
          function (error) {
            if (error) {
              throw Error('Unable to update vendor.');
            }
          }
        );

        return result;
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
