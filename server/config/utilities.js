var bcrypt = require('bcrypt');
var Promise = require('bluebird');
var jwt = require('jwt-simple');

var secret = process.env.TOKEN_SECRET || 'bengi and the mongoose';

Promise.promisifyAll(bcrypt);

module.exports = {

  // Database schema
  hashPassword: function (next) {
    var _this = this;

    bcrypt.genSaltAsync()
      .then(function (salt) {
        _this.salt = salt;
        return bcrypt.hashAsync(_this.password, salt);
      })
      .then(function (hashedPassword) {
        _this.password = hashedPassword;
        return next();
      })
      .catch(function (error) {
        return next(error);
      });
  },

  comparePassword: function (submittedPassword) {
    var savedPassword = this.password;
    return bcrypt.compareAsync(submittedPassword, savedPassword);
  },

  // Auth controller
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

  authSignUp: function (queryResult, res) {
    if (queryResult.email) {
      var userInfo = queryResult;
      userInfo.token = module.exports.issueToken(userInfo._id);
      res.status(201).send(userInfo);
    } else {
      res.status(403).send(queryResult.message);
    }
  },

  handleSignInAuth: function (queryResultArr, req, res) {
    var password = req.body.password;

    // Store the promises from checking the user and vendor passwords, respectively
    var compareUserPassword = module.exports.comparePassword.bind(queryResultArr[0], password);
    var compareVendorPassword = module.exports.comparePassword.bind(queryResultArr[1][0], password);

    // Pass the array containing both password checks on to be handled below
    Promise.all([compareUserPassword, compareVendorPassword])
      .then(function (resultArr) {
        var validSignIn = resultArr.indexOf(true);

        // Handle a successful vendor or user sign in
        if (validSignIn !== -1) {
          var userInfo = queryResultArr[validSignIn];
          userInfo.token = module.exports.issueToken(userInfo._id);
          res.status(201).send(userInfo);

          // Handle an unsuccessful user/vendor sign in
        } else {
          res.status(403).send(new Error('Unable to find a valid user or vendor account.'));
        }
      });
  },

  // Middleware
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

};
