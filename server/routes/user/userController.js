// var userHelpers = require('./../../db/user/userHelpers.js');
var User = require('../../db/user/userModel.js');
var jwt = require('jwt-simple');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

module.exports = {

  signUp: function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    var isVendor = req.body.isVendor;

    User.findOne({
      username: username
    })
    .then(function (user) {
      if (user) {
        res.status(403).send({error: 'User already exists'});
        next(new Error('User already exists'));
      }

      var newUser = {
        username: username,
        password: password,
        isVendor: isVendor
      };

      var newUser = new User(newUser);
      return newUser.save();
    })
    .then(function (user) {
      res.json({
        id: user._id,
        username: user.username,
        isVendor: user.isVendor,
        token: jwt.encode(user, 'secret')
      });
    })
    .catch(function (error) {
      return error;
    });
  },

  signIn: function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    User.findOne({
      username: username
    })
    .then(function (user) {
      if (!user) {
        res.status(401).send({error: 'User does not exist'});
        next(new Error('User does not exist'));
      }

      return user.checkPassword(password)
        .then(function(isMatch) {
          if (isMatch) {
            res.json({
              id: user._id,
              username: user.username,
              isVendor: user.isVendor,
              token: jwt.encode(user, 'secret')
            });
          } else {
            res.status(401).send('Username/password does not exist');
            next(new Error('Username/password does not exist'));
          }
        });
    })
    .catch(function (error) {
      return error;
    });
  }
};
