var Menu = require('./menusModel');
var MenuItem = require('./menuItemsModel');
var Vendor = require('./../vendors/vendorsModel');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

module.exports = {

  postMenuItem: function(menuItemObj, menuId) {
    return MenuItem.findOne({
      'created_by': menuItemObj.vendorId,
      'foodName': menuItemObj.foodName
    })
    .then(function(menuItem) {
      if(menuItem) {
        throw Error('Menu item already exists');
      }
      var newMenuItem = new MenuItem(menuItemObj);

     return newMenuItem.save();
    })
    .then(function(result) {
      if(!result) {
        throw Error('Unable to save menu item');
      }
      Menu.update({
        '_id': menuId
      }, {
        $push: { menuItemIds: result._id }
      });
      return result;
    })
    .catch(function(error) {
      console.log("Error adding menu item: ", error);
    });
  },

  postMenu: function(menuObj, vendorId) {
    return Menu.findOne({
      'created_by': vendorId,
      'menuName': menuObj.menuName
    })
    .then(function(menu) {
      if(menu) {
        throw Error('Menu already exists');
      }
      var newMenu = new Menu(menuObj);

     return newMenu.save();
    })
    .then(function(result) {
      if(!result) {
        throw Error('Unable to save menu');
      }
      Vendor.update({
        '_id': vendorId
      }, {
        $push: { menuIds: result._id }
      });
      return result;
    })
    .catch(function(error) {
      console.log("Error adding menu: ", error);
    });
  }

  getMenu: function() {

  }

  deleteMenu: function() {

  }

  deleteMenuItem: function() {
    
  }

}