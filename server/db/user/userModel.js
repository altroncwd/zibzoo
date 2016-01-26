var mongoose = require('mongoose');
var utils = require('../../config/utilities.js');

var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  salt: { type: String, required: true },
  isVendor: { type: Boolean, default: false },
  name: String
});

userSchema.pre('validate', utils.hashPassword);

userSchema.methods.checkPassword = utils.comparePassword;

module.exports = mongoose.model('User', userSchema);
