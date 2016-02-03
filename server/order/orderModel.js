var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var orderSchema = new Schema({
  createdAt: Date,
  vendorId: String,
  customerId: String,
  transactionId: String,
  isActive: { type: Boolean, default: true },
  latitude: String,
  longitude: String,
  orderItems: [Schema.Types.Mixed],
  customerInfo: { type: Schema.Types.ObjectId, ref: 'Customer' },
  vendorInfo: { type: Schema.Types.ObjectId, ref: 'Vendor' }
});

module.exports = mongoose.model('Order', orderSchema);
