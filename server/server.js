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
