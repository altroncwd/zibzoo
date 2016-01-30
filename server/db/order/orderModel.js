var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var orderSchema = new Schema({
  createdAt: Date,
  vendorId: String,
  customerId: String,
  isActive: Boolean,
  latitude: String,
  longitude: String,
  menuItems: [{ type: Schema.Types.ObjectId, ref: 'MenuItem' }],
  customerInfo: { type: Schema.Types.ObjectId, ref: 'Customer' },
  vendorInfo: { type: Schema.Types.ObjectId, ref: 'Vendor' }
});

module.exports = mongoose.model('Order', orderSchema);
