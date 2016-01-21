var mongoose = require('mongoose');

var menuSchema = new mongoose.Schema({

  name: String,

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vendor'
  },

  menuItemIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MenuItems'
  }]
});

module.exports = mongoose.model('Menu', menuSchema);
