var bcrypt = require('bcrypt');
var Promise = require('bluebird');

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
  }
};
