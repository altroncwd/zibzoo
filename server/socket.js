var mail = require('./mailer.js');
var utils = require('./config/utils.js');
var MenuItem = require('./menuItem/menuItemModel.js');
var sockets = require('socket.io');

module.exports = function (server) {
  var io = sockets(server);

  io.sockets.on('connection', function (socket) {
    var customerController = require('./customer/customerController.js')(socket);

    socket.on('menuConnect', function (vendor) {
      socket.join(vendor);
    });


    socket.on('charge', function (chargeData) {

      customerController.chargeOrders(chargeData)
        .then(function (response) {
          socket.emit('chargeResponse', response);
        });
    });

    socket.on('updateStock', function (update) {
      utils.modifyOneRecordById(update, MenuItem)
        .then(function (menuItem) {

          socket.to(update.vendorId).emit('updateItem', update);
        });
    });

    socket.on('createOrder', function (order) {
      socket.to(order.room._id).emit('sendOrder', order);

    });

    socket.on('orderFinished', function (finishedOrder) {
      mail.sendMail(finishedOrder);
    });

  });

  return io;

};
