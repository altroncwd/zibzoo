var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Promise = require('bluebird');

Promise.promisifyAll(bcrypt);

var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: String,
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  salt: { type: String, required: true },
  isVendor: { type: Boolean, default: false }
});

userSchema.pre('validate', function (next) {
  var user = this;

  if (!user.isModified('password')) {
    return next();
  }

  bcrypt.genSalt()
    .then(function (salt) {
      user.salt = salt;
      return bcrypt.hash(user.password, salt, null);
    })
    .then(function (hashedPassword) {
      user.password = hashedPassword;
      next();
    })
    .catch(function (error) {
      return next(error);
    });
});

userSchema.methods.checkPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
