var authUtils = require('../../utils/auth.utils.js');
var controllerUtils = require('../../utils/controller.utils.js');
var vendorHelpers = require('../../db/vendor/vendorHelpers.js');


module.exports = {

  signUp: function (req, res) {
    authUtils.authorizeEntry(req, res, 201, 403, vendorHelpers.postVendor);
  },

  signIn: function (req, res) {
    authUtils.authorizeEntry(req, res, 200, 404, vendorHelpers.getVendors);
  },

  retrieveVendors: function (req, res) {
    vendorHelpers.getVendors(req.body)
      .then(function (result) {
        controllerUtils.sendResponse(result, res, 200, 404);
      });
  },

  updateVendor: function (req, res) {
    vendorHelpers.updateVendor(req.body)
      .then(function (result) {
        controllerUtils.sendResponse(result, res, 304, 404);
      });
  },

  upload: function (req, res) {
    vendorHelpers.uploadImage(req.files.file.path);
    delete req.files.file;
  }

};
