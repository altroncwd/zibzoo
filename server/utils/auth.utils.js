var jwt = require('jwt-simple');

var secret = process.env.TOKEN_SECRET;

function issueToken(payload) {
  var token = jwt.encode(payload, secret);
  return token;
}

module.exports = {

  verifyToken: function (token) {
    var decoded = jwt.decode(token, secret);
    return decoded;
  },

  extendToken: function (payload, newData) {
    for (var data in newData) {
      if (newData.hasOwnProperty(data)) {
        payload[data] = newData[data];
      }
    }

    return payload;
  },

  hasToken: function (req, res, next) {
    var token = req.headers['authorization'];
    var validToken;

    if (req.headers && token) {
      validToken = module.exports.verifyToken(token);
      if (!validToken) {
        res.status(401).send();
      }

      req.token = validToken;
      next();
    } else {
      res.status(401).send();
    }
  },

  // Jeff, this one is for you <3
  authorizeEntry: function (req, res, successStatus, failureStatus, cb) {
    var userCredentials = {
      email: req.body.email,
      password: req.body.password
    };

    cb(userCredentials)
      .then(function (result) {
        if (result._id) {
          result.token = issueToken(result._id);
          res.status(successStatus).send(result);
        } else {
          res.status(failureStatus).send(result.message);
        }
      });
  }

};
