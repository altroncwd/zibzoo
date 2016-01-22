var Menu = require('./menusModel');
var MenuItem = require('./menuItemsModel');
var Vendor = require('./../vendors/vendorsModel.js');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

module.exports = {

  postMenu: function (menuObj) {
    return Menu
      .findOne(menuObj)
      .then(function (menu) {
        if (menu) {
          throw Error('Menu already exists');
        }

        var newMenu = new Menu(menuObj);

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

  // TODO: Removed menu item existence check in favor of client-side implementation
  postMenuItems: function (menuItemObj) {
    var menuItems = menuItemObj.items.length;
    var itemModels = [];
    for (var i = 0; i < menuItems; i++) {
      var newMenuItem = new MenuItem(menuItemObj.items[i]);
      itemModels.push(newMenuItem);
    }
    return MenuItem.create(itemModels)
      .then(function (items) {
        if (items.length === 0) {
          throw Error('Unable to save menu items');
        }
        var itemIds = [];
        for (var numItems = 0; numItems < items.length; numItems++) {
          itemIds.push(items[numItems]._id);
        }
        Menu.update(
          { '_id': menuItemObj.menuId },
          { $push: { menuItemIds: { $each: itemIds } } },
          function (error, numRecords) {
            if (error) {
              throw Error('Unable to update menu.');
            }
          }
        );

        return items;
      })
      .catch(function (error) {

        return error;
      });
  },

  getMenu: function (menuObj) {
    Menu.findOne({
      'createdBy': menuObj.vendorId,
      'name': menuObj.name
    })
      .populate('MenuItemIds')
      .then(function (menu) {
        if (!menu) {
          throw Error('Unable to retrieve menu');
        }

        return menu;
      })
      .catch(function (error) {

        return error;
      });
  },

  deleteMenu: function (menuObj) {
    Menu.findById(menuObj.menuId)
      .then(function (menu) {
        menu.remove();
      })
      .catch(function (error) {

        return error;
      });
  },

  deleteMenuItem: function (menuItemObj) {
    MenuItem.findById(menuItemObj.menuItemId)
      .then(function (menuItem) {
        Menu.update({ _id: menuItem._id }, { $pull: { menuItemIds: menuItem._id } });
        return menuItem.remove();
      })
      .catch(function (error) {

        return error;
      });
  }

};
