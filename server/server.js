var express = require('express');
var app = express();
var mongoose = require('mongoose');
var USERTEST = require('./routes/users/usersController.js');
var port = process.env.PORT || 3000;
mongoose.connect('mongodb://localhost:27017');
mongoose.connection.once('open', function() {
  console.log("Connected to mongoDB");
  USERTEST.signup();

})
require('./config/middleware.js')(app, express);

app.listen(port);

console.log('server listening on ', port);
