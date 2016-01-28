var express = require('express');
var app = express();
var mongoose = require('mongoose');
var port = process.env.PORT || 3000;
var uri = process.env.MONGOLAB_URI || 'mongodb://localhost/zibzoo';
// ------------ Socket Start -------------------
var server = require('http').createServer(app);
var io = require('socket.io')(server);
// ------- Socket End / Mailer Start -----------
var mail = require('./mailer/mailer');
// ------------ Mailer End ---------------------
mongoose.connect(uri);

mongoose.connection.once('open', function () {
  console.log('Connected to mongoDB.');
});

require('./config/middleware.js')(app, express);

server.listen(port);

mail.sendMail();

console.log('server listening on ', port);
// ----------- Socket Connection ----------------------
io.on('connect', function (socket) {
  console.log('Hyperdrive socket now connected');

  // socket.on('order finished', function (UserIdNumber) {
  //   console.log('User Id#:', UserIdNumber, ': Order has finnished   ');
  //   socket.emit(UserIdNumber, 'Your order is ready for pickup');
  // });

  socket.on('incoming order', function (orderObject) {
    // See Notes Below
    var createIndividualOrder = {};
    for (var vendorId in orderObject.orders) {
      createIndividualOrder.username = orderObject.username; // email
      createIndividualOrder.id = orderObject.id;    // users id
      createIndividualOrder.name = orderObject.name;
      createIndividualOrder.food = orderObject.orders.vendorId;   // the list food items
      socket.emit(vendorId, createIndividualOrder);
      createIndividualOrder = {};  // wipe the item after as a saftey mesure
    }
  });

});
/* ----------------------------------------------------
 orderObject format
 {  id: xxxxxxxxxx, (userId)
    name: John Doe,   (the users name)
    username: xxxxxxxx@xxxxmail.com,
    order: {
      vendorIdAsAKey: [ { food: 'burger', quantity:25 }, ],
      vendorIdAsAKey: [ { food: 'burger', quantity:25 }, ],
      vendorIdAsAKey: [ { food: 'burger', quantity:25 }, ]
    }
 }
---------------------------------------------------- */
