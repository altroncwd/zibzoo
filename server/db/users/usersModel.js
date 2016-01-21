var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  favorites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vendor'
  }]
});

module.exports = mongoose.model('User', UserSchema);
