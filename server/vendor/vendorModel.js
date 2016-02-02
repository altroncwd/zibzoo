var utils = require('../config/utils.js');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Promise = require('bluebird');


// Set promises
mongoose.Promise = Promise;
Promise.promisifyAll(bcrypt);

var Schema = mongoose.Schema;

var VendorSchema = new Schema({
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

VendorSchema.methods.verifyPassword = function (submittedPassword) {
  var savedPassword = this.password;
  console.log('savedPassword :');

  return bcrypt.compareAsync(submittedPassword, savedPassword);
};
// NOTE: May only work on 'validate'
VendorSchema.pre('save', utils.hashPassword);

module.exports = mongoose.model('Vendor', VendorSchema);
