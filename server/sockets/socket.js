var sockets = require('socket.io');
var mail = require('../mailer/mailer');  // (nodemailer)

module.exports = function (server) {
  var io = sockets(server);

  io.on('connect', function (socket) {
    console.log('Hyperdrive socket now connected');

    socket.on('order finished', function (finsihedOrder) {
      console.log('User email:', finsihedOrder.customerInfo.email, ': SERVER SIDE');

      // Uncomment the line below for emails to work
      mail.sendMail(finsihedOrder);
    });

  });

  return io;

};
