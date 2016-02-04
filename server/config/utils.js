var bcrypt = require('bcrypt');
var Promise = require('bluebird');
var jwt = require('jwt-simple');
var mongoose = require('mongoose');
var stripe = require('stripe')(process.env.STRIPE_TEST_API_KEY);


// Set promises
mongoose.Promise = Promise;
Promise.promisifyAll(bcrypt);


var _secret = process.env.TOKEN_SECRET;

function _verifyToken(token) {
  var decoded = jwt.decode(token, _secret);

  return decoded;
}


module.exports = {

  extendToken: function (payload, newData) {
    for (var data in newData) {
      if (newData.hasOwnProperty(data)) {
        payload[data] = newData[data];
      }
    }

    return payload;
  },

  saveOneUserByEmail: function (queryObj, Model) {
    var customerData = queryObj;
    return Model
      .findOne({
        email: customerData.email
      })
      .then(function (user) {
        if (user) {
          throw new Error(user.email + ' already exists.');
        }
        return stripe.customers.create({
          description: 'Customer'
        });

      })
      .then(function (customer) {

        console.log('CUSTOMER', customer);
        customerData.stripeId = customer.id;
        var newUser = new Model(customerData);

        return newUser.save();
      })
      .then(function (savedUser) {
        if (!savedUser) {
          throw new Error('Unable to save ' + savedUser.email + '.');
        }

        return savedUser;
      })
      .catch(function (error) {
        return error;
      });
  },

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

  hasToken: function (req, res, next) {
    var token = req.headers['authorization'];
    var validToken;

    if (req.headers && token) {
      validToken = _verifyToken(token);
      if (!validToken) {
        res.status(403).send(new Error('Invalid token.'));
      }

      req.token = validToken;
      next();
    } else {
      res.status(403).send(new Error('Token not found.'));
    }
  },

// input: { _id: '2983hrp9', isVendor: false }
// if token exists and password is invalid, destroy token
  issueToken: function (payload) {
    var token = jwt.encode(payload, _secret);

    return token;
  },

  sendHttpResponse: function (queryResult, httpResponse, successStatus, failureStatus) {
    if (!(queryResult instanceof Error)) {
      httpResponse.status(successStatus).send(queryResult);
    } else {
      httpResponse.status(failureStatus).send(queryResult);
    }
  },

  // TODO: refactor to accommodate multiple, custom updates actions
  modifyOneRecordById: function (recordObj, Model) {
    return Model
      .update({ _id: recordObj._id },
        { $set: recordObj.propertiesToUpdate })
      .then(function (docsAffected) {
        if (docsAffected.nModified === 0) {
          throw new Error('No records were updated.');
        }

        return docsAffected;
      })
      .catch(function (error) {
        return error;
      });
  },

  verifyPassword: function (submittedPassword) {
    var savedPassword = this.password;

    return bcrypt.compareAsync(submittedPassword, savedPassword);
  }

};
