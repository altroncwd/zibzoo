var mongoose = require('mongoose');
var utils = require('../../config/utilities.js');

var Schema = mongoose.Schema;

var customerSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  salt: { type: String },
  name: String,
  stripeId: String
});

customerSchema.pre('validate', utils.hashPassword);
customerSchema.methods.checkPassword = utils.comparePassword;

module.exports = mongoose.model('Customer', customerSchema);
