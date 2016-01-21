var Menu = require('./menusModel');
var MenuItem = require('./menuItemsModel');
var Vendor = require('./../vendors/vendorsModel');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

module.exports = {

  postMenuItem: function (menuItemObj, menuId) {
    return MenuItem.findOne({
      'createdBy': menuItemObj.vendorId,
      'foodName': menuItemObj.foodName
    })
      .then(function (menuItem) {
        if (menuItem) {
          throw Error('Menu item already exists');
        }
        var newMenuItem = new MenuItem(menuItemObj);

        return newMenuItem.save();
      })
      .then(function (result) {
        if (!result) {
          throw Error('Unable to save menu item');
        }
        Menu.update({
          '_id': menuId
        }, {
          $push: { menuItemIds: result._id }
        });
        return result;
      })
      .catch(function (error) {
        console.log('Error adding menu item: ', error);
      });
  },

  postMenu: function (menuObj, vendorId) {
    return Menu.findOne({
      'createdBy': vendorId,
      'menuName': menuObj.menuName
    })
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
        Vendor.update({
          '_id': vendorId
        }, {
          $push: { menuIds: result._id }
        });
        return result;
      })
      .catch(function (error) {
        console.log('Error adding menu: ', error);
      });
  },
  // TODO: vendorId is not defined
  getMenu: function (menuObj) {
    Menu.findOne({
      'createdBy': vendorId,
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
        console.log('Error retrieving menu: ', error);
        return error;
      });
  },

  deleteMenu: function (menuObj) {
    Menu.findById(menuObj.menuId)
      .then(function (menu) {
        menu.remove();
      })
      .catch(function (error) {
        console.log('Error deleting menu: ', error);
        return error;
      });
  },
  // TODO: menuObj is not defined
  deleteMenuItem: function (menuItemObj) {
    MenuItem.findById(menuObj.menuItemId)
      .then(function (menuItem) {
        Menu.update({ _id: menuItem._id }, { $pull: { menuItemIds: menuItem._id } });
        return menuItem.remove();
      })
      .catch(function (error) {
        console.log('Error deleting menu item: ', error);
        return error;
      });
  }

};
