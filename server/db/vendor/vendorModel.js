var mongoose = require('mongoose');
var dbUtils = require('../../utils/db.utils.js');

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

vendorSchema.pre('validate', dbUtils.hashPassword);
vendorSchema.methods.checkPassword = dbUtils.comparePassword;

module.exports = mongoose.model('Vendor', vendorSchema);
