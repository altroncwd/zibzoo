var jwt = require('jwt-simple');

var secret = process.env.TOKEN_SECRET || 'bengi and the mongoose';

module.exports = {

  issueToken: function (payload) {
    var token = jwt.encode(payload, secret);
    return token;
  },

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
  }

};
