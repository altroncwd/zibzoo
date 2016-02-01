require('dotenv').config();
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var port = process.env.PORT;
var uri = process.env.MONGOLAB_URI;
var server = require('http').createServer(app);
var io = require('./sockets/socket.js')(server);

module.exports = io;  // simpley aquire the server to have access to the socket

mongoose.connect(uri);

mongoose.connection.once('open', function () {
  console.log('Connected to mongoDB.');
});

require('./config/middleware.js')(app, express);

server.listen(port);

console.log('server listening on ', port);

// ------------------------------------------------
// Server side socket test for vendor order list
// ------------------------------------------------
setInterval(function () {
  console.log('Set timeout emit');
  io.sockets.emit('1', {
    createdAt: Date,
    vendorId: String,
    customerId: String,
    isActive: Boolean,
    latitude: String,
    longitude: String,
    menuItems: [{ item: 'hotdog', quantity: 1 },
                { item: 'corndog', quantity: 7 }],
    customerInfo: {
      email: '___UserEmail___@gmail.com',
      name: 'Zibby Zabbs'
    },
    vendorInfo: {
      type: 'Schema.Types.ObjectId',
      ref: 'Vendor' }
  });
}, 10000);

/*
{
  createdAt: Date,
  vendorId: String,
  customerId: String,
  isActive: Boolean,
  latitude: String,
  longitude: String,
  menuItems: [{ item: 'hotdog', quantity: 1 },
              { item: 'corndog', quantity: 7 }],
  customerInfo: {
                email: '___UserEmail___@gmail.com',
                name: 'Zibby Zabbs'
    },
  vendorInfo: { type: Schema.Types.ObjectId, ref: 'Vendor' }
}
 */
