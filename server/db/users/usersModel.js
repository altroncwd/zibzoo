var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var promise = require('bluebird');
var compare = promise.promisify(bcrypt.compare);
var SALT_WORK_FACTOR = 10;

var userSchema = new mongoose.Schema({
  name: String,
  username: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  isVendor: {
    type: Boolean,
    default: false
  },
  created_at: Date,
  updated_at: Date
});

userSchema.pre('validate', function(next) {
  var user = this;

  if (!user.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, function(err, hash) {  
      if (err) {
        return next(err);
      }

      var currentDate = new Date();

      user.password = hash;
      user.updated_at = currentDate;

      if (!this.created_at) {
        user.created_at = currentDate;
      }

      next();
    });
  });
});

userSchema.methods.checkPassword = function(password) {
  return compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
