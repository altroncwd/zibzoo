var mongoose = require('mongoose');

var vendorSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    unique: true
  },
  description: String,
  cuisine: [String],
  imageUrl: String
});

module.exports = mongoose.model('Vendor', vendorSchema);
