var mongoose = require('mongoose');

var menuItemSchema = new mongoose.Schema({

  menuId:

  foodName: {
    type: String,
    required: true
  },

  description: String,

  price: {
    type: Number,
    required: true
  },

  inStock: {
    type: Boolean,
    require: true
  },

  isGlutenFree: Boolean,

  isVegan: Boolean,

  isDairyFree: Boolean,

  isVegetarian: Boolean,

  prepTime: Number

});

module.exports = mongoose.model('MenuItem', menuItemSchema);
