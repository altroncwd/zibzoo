var sockets = require('socket.io');
var mail = require('../mailer/mailer');  // (nodemailer)

module.exports = function (server) {
  var io = sockets(server);

  io.on('connect', function (socket) {
    console.log('Hyperdrive socket now connected');

    socket.on('order finished', function (finishedOrder) {
      // console.log('User Id#:', finishedOrder.ID, ': SERVER SIDE');
      // console.log('User email:', finishedOrder.username, ': SERVER SIDE');

      mail.sendMail(finishedOrder.username);
    });

    // socket.on('incoming order', function (orderObject) {
    //   // See Notes Below
    //   var createIndividualOrder = {};
    //   createIndividualOrder.username = orderObject.username; // email
    //   createIndividualOrder.id = orderObject.id;    // users id
    //   for (var vendorId in orderObject.orders) {
    //     createIndividualOrder.food = orderObject.orders[vendorId];   // the list food items
    //     socket.broadcast.emit(vendorId, createIndividualOrder);
    //     createIndividualOrder = [];  // wipe the item after as a saftey mesure
    //   }
    // });

  });


  return io;

};

// ----------- Socket Connection ----------------------

/* ----------------------------------------------------
 orderObject format
 {  id: xxxxxxxxxx, (userId)
    name: John Doe,   (the users name)
    username: xxxxxxxx@xxxxmail.com,
    order: {
      vendorIdAsAKey: [ { food: 'burger', quantity:25 }, ex... ],
      vendorIdAsAKey: [ { food: 'burger', quantity:25 }, ex... ],
      vendorIdAsAKey: [ { food: 'burger', quantity:25 }, ex... ]
    }
 }
---------------------------------------------------- */
