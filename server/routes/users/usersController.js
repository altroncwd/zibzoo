var usersHelpers = require('./../../db/users/usersHelpers.js')

module.exports = {

  signup: function(req, res) {
    var user = {username: 'MAKDD1DDAACMCDDDDAD'};
    usersHelpers.postUser(user)
      .then(function(result) {
        console.log(result);
        // res.status(201).send(result);
      })
      .catch(function(error) {
        res.status(401).send(error);
      })
  }
};
