var utils = require('../config/utils.js');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var vendorSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  salt: { type: String },
  name: String,
  isVendor: { type: Boolean, default: true },
  stripeApiKey: String,
  description: String,
  cuisine: String,
  imageUrl: String,
  location: String,
  menuItems: [{ type: Schema.Types.ObjectId, ref: 'MenuItem' }]
});

// NOTE: May only work on 'validate'
vendorSchema.pre('save', utils.hashPassword);
vendorSchema.methods.checkPassword = utils.verifyPassword;

module.exports = mongoose.model('Vendor', vendorSchema);
