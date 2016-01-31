var dbUtils = require('../config/db.utils.js');
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

customerSchema.pre('validate', dbUtils.hashPassword);
customerSchema.methods.checkPassword = dbUtils.comparePassword;

module.exports = mongoose.model('Customer', customerSchema);
