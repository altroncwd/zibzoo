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

  socket.on('hello', function (x) {
    console.log('hi', x);
  });

});
