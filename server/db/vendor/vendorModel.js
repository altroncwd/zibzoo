var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var vendorSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  cuisine: [String],
  imageUrl: String,
  location: String,
  menuItems: [{ type: Schema.Types.ObjectId, ref: 'MenuItem' }]
});

module.exports = mongoose.model('Vendor', vendorSchema);
