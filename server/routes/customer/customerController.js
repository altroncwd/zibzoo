var authUtils = require('../../utils/auth.utils.js');
var controllerUtils = require('../../utils/controller.utils.js');
var customerHelpers = require('../../db/customer/customerHelpers.js');


module.exports = {

  signUp: function (req, res) {
    authUtils.authorizeEntry(req, res, 201, 403, customerHelpers.postCustomer);
  },

  signIn: function (req, res) {
    authUtils.authorizeEntry(req, res, 200, 404, customerHelpers.getCustomer);
  },

  updateCustomer: function (req, res) {
    customerHelpers.updateCustomer(req.body)
      .then(function (result) {
        controllerUtils.sendResponse(result, res, 304, 404);
      });
  }

};
