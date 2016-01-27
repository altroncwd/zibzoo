var mongoose = require('mongoose');
var utils = require('../../config/utilities.js');

var Schema = mongoose.Schema;

var vendorSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  salt: { type: String },
  name: String,
  description: String,
  cuisine: String,
  imageUrl: String,
  location: String,
  menuItems: [{ type: Schema.Types.ObjectId, ref: 'MenuItem' }]
});

vendorSchema.pre('validate', utils.hashPassword);
vendorSchema.methods.checkPassword = utils.comparePassword;

module.exports = mongoose.model('Vendor', vendorSchema);
