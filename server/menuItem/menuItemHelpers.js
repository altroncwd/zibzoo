var dbUtils = require('../config/db.utils.js');
var MenuItem = require('./menuItemModel');
var Vendor = require('../vendor/vendorModel.js');
var mongoose = require('mongoose');

mongoose.Promise = require('bluebird');

module.exports = {

  postMenuItem: function (menuItemObj) {
    var newMenuItem = new MenuItem(menuItemObj);

    return newMenuItem
      .save()
      .then(function (menuItem) {
        if (!menuItem) {
          throw new Error('Unable to save menu item.');
        }

        Vendor.update(
          { _id: menuItemObj.vendorId },
          { $push: { menuItems: menuItem._id } },
          function (error) {
            if (error) {
              throw new Error('Unable to update vendor.');
            }
          });

        return menuItem;
      })
      .catch(function (error) {
        return error;
      });
  },

  deleteMenuItem: function (menuItemObj) {
    return MenuItem.remove({ _id: menuItemObj._id })
      .then(function (docsAffectedObj) {
        if (!docsAffectedObj.result.n) {
          throw new Error('Menu item cannot be deleted because it may not exist.');
        }

        Vendor.update({ _id: menuItemObj.vendorId }, { $pull: { menuItems: menuItemObj._id } });
        return docsAffectedObj;
      })
      .catch(function (error) {
        return error;
      });
  },

  updateMenuItem: function (menuItemObj) {
    return dbUtils.updateRecord(menuItemObj, MenuItem);
  }

};
