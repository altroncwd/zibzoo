var User = require('./userModel.js');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

module.exports = {

  postUser: function (userObj) {
    return User
      .findOne({
        username: userObj.username
      })
      .then(function (user) {
        if (user) {
          throw new Error('User already exists.');
        }

        var newUser = new User(userObj);

        return newUser.save();
      })
      .then(function (result) {
        if (!result) {
          throw new Error('Unable to save user.');
        }

        return result;
      })
      .catch(function (error) {
        return error;
      });
  },

  getUser: function (userObj) {
    return User
      .findOne({
        username: userObj.username
      })
      .then(function (user) {
        if (!user) {
          throw new Error('User does not exist.');
        }

        return user;
      })
      .catch(function (error) {
        return error;
      });
  }

};

