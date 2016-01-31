var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var orderSchema = new Schema({
  createdAt: Date,
  vendorId: String,
  customerId: String,
  isActive: Boolean,
  latitude: String,
  longitude: String,
  menuItems: [Schema.Types.Mixed],
  customerInfo: { type: Schema.Types.ObjectId, ref: 'Customer' },
  vendorInfo: { type: Schema.Types.ObjectId, ref: 'Vendor' }
});

module.exports = mongoose.model('Order', orderSchema);
