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

  authorizeEntry: function (req, res, successStatus, failureStatus, cb) {
    var userCredentials = {
      email: req.body.email,
      password: req.body.password,
      isVendor: req.body.isVendor
    };

    cb(userCredentials, 'email')
      .then(function (result) {
        var token;
        // Handle a vendor result
        if (result[0]) {
          token = issueToken(result[0]._id);
          res.status(successStatus).send({
            _id: result[0]._id,
            email: result[0].email,
            isVendor: result[0].isVendor,
            menuItems: result[0].menuItems,
            imageUrl: result[0].imageUrl,
            name: result[0].name,
            cuisine: result[0].cuisine,
            description: result[0].description,
            token: token
          });
        // Handle a customer result
        } else if (result._id) {
          token = issueToken(result._id);
          res.status(successStatus).send({
            _id: result._id,
            email: result.email,
            isVendor: result.isVendor,
            token: token
          });
        // Handle a general rejection
        } else {
          res.status(failureStatus).send(result.message);
        }
      });
  }

};
