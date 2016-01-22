var vendorsHelpers = require('./../../db/vendors/vendorsHelpers.js');

module.exports = {
  // TODO: Add password hashing
  signUp: function (req, res) {
    var vendor = {
      name: req.body.username,
      password: req.body.password
    };
    vendorsHelpers.postVendor(vendor)
      .then(function (result) {
        res.status(201).send(result);
      })
      .catch(function (error) {
        res.status(401).send(error);
      });
  },

  signIn: function (req, res) {
    var vendor = {
      username: req.body.username
    };
    vendorsHelpers.getVendor(vendor)
      .then(function (result) {
        res.status(200).send(result);
      })
      .catch(function (error) {
        res.status(404).send(error);
      });
  },

  retrieveVendor: function (req, res) {
    var vendor = req.query;
    vendorsHelpers.getVendor(vendor)
      .then(function (result) {
        res.status(200).send(result);
      })
      .catch(function (error) {
        res.status(404).send(error);
      });
  }

};
