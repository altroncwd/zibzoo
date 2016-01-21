var vendorsHelpers = require('./../../db/vendor/vendorHelpers.js')

module.exports = {

  signUp: function (req, res) {
    var vendor = req.body;
    vendorsHelpers.postVendor(vendor)
      .then(function (result) {
        res.status(201).send(result);
      })
      .catch(function (error) {
        res.status(401).send(error);
      });
  },

  signIn: function (req, res) {
    var vendor = req.body;
    vendorsHelpers.getVendor(vendor)
      .then(function (result) {
        res.status(200).send(result);
      })
      .catch(function (error) {
        res.status(404).send(error);
      });
  }

};
