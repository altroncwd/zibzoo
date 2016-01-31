var utils = require('../config/utils.js');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var customerSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  salt: { type: String },
  name: String,
  isVendor: { type: Boolean, default: false },
  stripeId: String
});

customerSchema.pre('validate', utils.hashPassword);
customerSchema.methods.checkPassword = utils.verifyPassword;

module.exports = mongoose.model('Customer', customerSchema);
