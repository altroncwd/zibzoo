var usersHelpers = require('./../../db/users/usersHelpers.js');

module.exports = {

  signUp: function (req, res) {
    var user = req.body;
    usersHelpers.postUser(user)
      .then(function (result) {
        res.status(201).send(result);
      })
      .catch(function (error) {
        res.status(401).send(error);
      });
  },

  signIn: function (req, res) {
    var user = req.body;
    usersHelpers.getUser(user)
      .then(function (result) {
        res.status(200).send(result);
      })
      .catch(function (error) {
        res.status(404).send(error);
      });
  }

};
