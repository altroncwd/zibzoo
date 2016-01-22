var mongoose = require('mongoose');

var menuSchema = new mongoose.Schema({

  vendorId: mongoose.Schema.Types.ObjectId,

  menuItemIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MenuItem'
  }]
});

module.exports = mongoose.model('Menu', menuSchema);
