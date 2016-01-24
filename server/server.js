var express = require('express');
var app = express();
var mongoose = require('mongoose');
var port = process.env.PORT || 3000;
var uri = process.env.MONGOLAB_URI || 'mongodb://localhost/zibzoo';

mongoose.connect(uri);

mongoose.connection.once('open', function () {
  console.log('Connected to mongoDB.');
});

require('./config/middleware.js')(app, express);

app.listen(port);

console.log('server listening on ', port);
