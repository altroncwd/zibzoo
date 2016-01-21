var mongoose = require('mongoose');

var menuSchema = new mongoose.Schema({

  name: String,

  // TODO: Schema is not defined
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'Vendor'
  },

  menuItemIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MenuItems'
  }]
});

module.exports = mongoose.model('Menu', menuSchema);
