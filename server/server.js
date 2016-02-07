require('dotenv').config();

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('./socket.js')(server);
var mongoose = require('mongoose');

var port = process.env.PORT;
var uri = process.env.MONGOLAB_URI;

module.exports.io = io;

// Export for testing
module.exports.app = server;
module.exports.db = mongoose.connect(uri);

mongoose.connection.once('open', function () {
  console.log('Connected to MongoDB.');
});

require('./config/middleware.js')(app, express);

server.listen(port);

console.log('App listening on port: ', port);

// ------------------------------------------------
// Server side socket test for vendor order list
// ------------------------------------------------
// _id: this is an id that the db adds on for refrence lookup
//
// setInterval(function () {
//   console.log('Set timeout emit');
//   io.sockets.emit('56afac79c04f12f2529bf0f9', {
//     _id: '123j2352g34h342k5g3lk3',
//     createdAt: Date,
//     vendorId: String,
//     customerId: String,
//     isActive: Boolean,
//     latitude: String,
//     longitude: String,
//     menuItems: [{ item: 'hotdog', quantity: 1 },
//                 { item: 'corndog', quantity: 7 }],
//     customerInfo: {
//       email: '___UserEmail___@gmail.com',
//       name: 'Zibby Zabbs'
//     },
//     vendorInfo: {
//       type: 'Schema.Types.ObjectId',
//       ref: 'Vendor' }
//   });
// }, 10000);
