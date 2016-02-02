var MenuItem = require('./menuItemModel.js');
var utils = require('../config/utils.js');
var Vendor = require('../vendor/vendorModel.js');
var mongoose = require('mongoose');
var Promise = require('bluebird');


// Promisify libraries
mongoose.Promise = Promise;


function _saveMenuItem(menuItemObj) {
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
}

function _removeMenuItem(menuItemObj) {
  return MenuItem.remove({ _id: menuItemObj._id })
    .then(function (docsAffectedObj) {
      if (!docsAffectedObj.result.n) {
        throw new Error('Menu item cannot be deleted because it may not exist.');
      }

      Vendor.update(
          { _id: menuItemObj.vendorId },
          { $pull: { menuItems: menuItemObj._id }
        });

      return docsAffectedObj;
    })
    .catch(function (error) {
      return error;
    });
}


module.exports = {

  createMenuItem: function (req, res) {
    var menuItem = req.body;

    _saveMenuItem(menuItem)
      .then(function (savedMenuItem) {
        utils.sendHttpResponse(savedMenuItem, res, 201, 403);
      });
  },

  updateMenuItem: function (req, res) {
    var menuItem = req.body;

    utils.modifyOneRecordById(menuItem, MenuItem)
      .then(function (menuItemUpdateStatus) {
        utils.sendHttpResponse(menuItemUpdateStatus, res, 304, 404);
      });
  },

  deleteMenuItem: function (req, res) {
    var menuItem = req.body;

    _removeMenuItem(menuItem)
      .then(function (menuItemDeleteStatus) {
        utils.sendHttpResponse(menuItemDeleteStatus, res, 304, 404);
      });
  }

};


// Export private functions for testing
if (process.env.NODE_ENV === 'test') {
  module.exports._saveMenuItem = _saveMenuItem;
  module.exports._removeMenuItem = _removeMenuItem;
}
