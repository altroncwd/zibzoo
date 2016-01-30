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
        controllerUtils.sendHttpResponse(result, res, 200, 404);
      });
  },

  updateVendor: function (req, res) {
    vendorHelpers.updateVendor(req.body)
      .then(function (result) {
        controllerUtils.sendHttpResponse(result, res, 304, 404);
      });
  },

  upload: function (req, res) {
    vendorHelpers.uploadImage(req.files.file.path)
      .then(function (result) {
        console.log(result.url);
        var updateObj = {
          _id: req.body._id,
          propertiesToUpdate: {
            imageUrl: result.url
          }
        };
        vendorHelpers.updateVendor(updateObj)
          .then(function (numUpdated) {
            console.log('this is how many properties were update', numUpdated);
          })
          .catch(function (error) {
            console.error('Unable to update vendor');
          });
        controllerUtils.sendHttpResponse(updateObj, res, 200, 500);
      });
    delete req.files.file;
  }

};
