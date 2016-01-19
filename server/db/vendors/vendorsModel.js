var mongoose = require('mongoose');

var vendorSchema = new mongoose.Schema({
  vendorName: {
    type: String,
    require: true,
    unique: true
  },
  description: String,
  cuisine: [String],
  menuIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Menu'
  }],
  thumbnail_image: String,
  medium_image: String,
  large_image: String
});

module.exports = mongoose.model('Vendor', vendorSchema);
