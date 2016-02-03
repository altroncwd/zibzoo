var sockets = require('socket.io');
var mail = require('../mailer/mailer');  // (nodemailer)

module.exports = function (server) {
  var io = sockets(server);

  io.on('connect', function (socket) {
    socket.on('order finished', function (finsihedOrder) {
      mail.sendMail(finsihedOrder);
    });

  });

  return io;

};
