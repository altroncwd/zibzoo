var bcrypt = require('bcrypt');
var Promise = require('bluebird');
var mongoose = require('mongoose');

mongoose.Promise = Promise;
Promise.promisifyAll(bcrypt);

module.exports = {

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

  postUser: function (userObj, Model) {
    return Model
      .findOne({
        email: userObj.email
      })
      .then(function (user) {
        if (user) {
          throw new Error(user.email + ' already exists.');
        }

        var newUser = new Model(userObj);

        return newUser.save();
      })
      .then(function (result) {
        if (!result) {
          throw new Error('Unable to save ' + result.email + '.');
        }

        return result;
      })
      .catch(function (error) {
        return error;
      });
  },

  updateUser: function (userObj, Model) {
    return Model.update(
      { _id: userObj._id },
      { $set: userObj.propertiesToUpdate })
      .then(function (affectedDocsObj) {
        if (affectedDocsObj.nModified === 0) {
          throw new Error('No users were updated.');
        }

        return affectedDocsObj;
      })
      .catch(function (error) {
        return error;
      });
  }

};
