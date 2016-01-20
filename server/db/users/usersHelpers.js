var User = require('./usersModel.js');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

module.exports = {

  postUser: function (userObj) {
    return User
      .findOne({
        'username': userObj.username
      })
      .then(function (user) {
        if (user) {
          throw Error('User already exists!')
        }
        var newUser = new User({
          'username': userObj.username
        });

        return newUser.save()
      })
      .then(function (result) {
        if (!result) {
          throw Error('Unable to save user');
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
        'username': userObj.username
      })
      .then(function (user) {
        if (!user) {
          throw Error('User does not exist');
        }

        return user;
      })
      .catch(function (error) {
        return error;
      });
  }

}

