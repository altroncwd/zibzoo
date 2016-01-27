var utils = require('../../config/utilities.js');

module.exports = {

  // Jeff, this one is for you <3
  authorizeEntry: function (req, res, successStatus, failureStatus, cb) {
    var userCredentials = {
      email: req.body.email,
      password: req.body.password
    };

    cb(userCredentials)
      .then(function (result) {
        if (result.email) {
          result.token = utils.issueToken(result._id);
          res.status(successStatus).send(result);
        } else {
          res.status(failureStatus).send(result.message);
        }
      })
      .catch(function (error) {
        return error;
      });
  }

};
