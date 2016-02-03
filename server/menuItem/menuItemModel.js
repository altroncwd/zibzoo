var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var menuItemSchema = new Schema({
  vendorId: { type: Schema.Types.ObjectId, required: true },
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  inStock: { type: Boolean, required: true },
  type: String,
  section: String,
  sectionIndex: Number,
  index: Number,
  calories: Number,
  isGlutenFree: Boolean,
  isVegan: Boolean,
  isDairyFree: Boolean,
  isVegetarian: Boolean
});

module.exports = mongoose.model('MenuItem', menuItemSchema);
