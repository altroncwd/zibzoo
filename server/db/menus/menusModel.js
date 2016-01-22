var mongoose = require('mongoose');

var menuSchema = new mongoose.Schema({

  vendorId: String,

  menuItemIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MenuItems'
  }]
});

module.exports = mongoose.model('Menu', menuSchema);
