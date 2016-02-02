var sockets = require('socket.io');
var mail = require('../mailer/mailer');  // (nodemailer)

module.exports = function (server) {
  var io = sockets(server);

  io.on('connect', function (socket) {
    console.log('Hyperdrive socket now connected');

    socket.on('order finished', function (finishedOrder) {
      console.log('User email:', finishedOrder.customerInfo.email, ': SERVER SIDE');

      // Uncomment the line below for emails to work
      // mail.sendMail(finishedOrder.customerInfo.email);
    });

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
