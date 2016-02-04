var mail = require('./mailer.js');  // (nodemailer)
var sockets = require('socket.io');

module.exports = function (server) {
  var io = sockets(server);

  io.on('connect', function (socket) {
    socket.on('order finished', function (finishedOrder) {
      mail.sendMail(finishedOrder);
    });

    socket.on('new order', function (newOrderObj) {
      socket.emit(newOrderObj.vendorId, newOrderObj);
    });

  });

  return io;

};
