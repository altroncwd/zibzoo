var express = require('express');
var app = express();
var mongoose = require('mongoose');
var port = process.env.PORT || 3000;
var dbUri = process.env.MONGOLAB_URI || 'mongodb://localhost:27017';

mongoose.connect(dbUri);

mongoose.connection.once('open', function () {
  console.log('Connected to mongoDB.');
});

require('./config/middleware.js')(app, express);

app.listen(port);

console.log('server listening on ', port);
