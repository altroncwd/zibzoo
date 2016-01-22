var mongoose = require('mongoose');

var vendorSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  description: String,
  cuisine: [String],
  imageUrl: String,
  location: String,
  menuIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Menu'
  }]
});

module.exports = mongoose.model('Vendor', vendorSchema);
