var menuItemHelpers = require('../../db/menuItem/menuItemHelpers.js');
var controllerUtils = require('../../utils/controller.utils.js');

module.exports = {

  createMenuItem: function (req, res) {
    menuItemHelpers.postMenuItem(req.body)
      .then(function (result) {
        controllerUtils.sendResponse(result, res, 201, 403);
      });
  },

  removeMenuItem: function (req, res) {
    menuItemHelpers.deleteMenuItem(req.body)
      .then(function (result) {
        controllerUtils.sendResponse(result, res, 304, 404);
      });
  },

  updateMenuItem: function (req, res) {
    menuItemHelpers.updateMenuItem(req.body)
      .then(function (result) {
        controllerUtils.sendResponse(result, res, 304, 404);
      });
  }

};
