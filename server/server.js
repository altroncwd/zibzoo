var express = require('express');
var app = express();
var mongoose = require('mongoose');
var port = process.env.PORT || 3000;
var uri = process.env.MONGOLAB_URI || 'mongodb://localhost/zibzoo';
// ------------ Socket Start -------------------
var server = require('http').createServer(app);
var io = require('socket.io')(server);
// ------------ Socket End ---------------------
mongoose.connect(uri);

mongoose.connection.once('open', function () {
  console.log('Connected to mongoDB.');
});

require('./config/middleware.js')(app, express);

server.listen(port);

console.log('server listening on ', port);
// ----------- Socket Connection ----------------------
io.on('connect', function (socket) {
  console.log('Hyperdrive socket now connected');

  socket.on('order finished', function (UserIdNumber, test) {
    console.log('User Id#:', UserIdNumber, ': Order has finnished   ', test);
    // for pining a user, i have a user number, if its stored as a number, i could +'' to convert it to a string
    socket.emit(UserIdNumber, 'Your order is ready for pickup');
  });

  socket.on('incoming order', function (orderObject) {
    // the orderObject must be an object that contains the basic order format in addition to a vendorId number
    socket.emit(orderObject.vendorId, orderObject);
  });

});
