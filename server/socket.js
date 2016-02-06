var mail = require('./mailer.js');  // (nodemailer)
var io = require('./server.js');
var sockets = require('socket.io');

module.exports = function (server) {
  var io = sockets(server);

  io.sockets.on('connection', function (socket) {

    socket.on('menuConnect', function (vendor) {
      console.log(vendor);
      console.log("HELLO");
      socket.join(vendor);
    });

var customerController = require('./customer/customerController.js')(socket);

    socket.on('charge', function (chargeData) {
      // console.log(chargeData.orders);
      // delete chargeData.orders[chargeData.vendor._id][0].item['$$hashKey'];
      // delete chargeData.orders[chargeData.vendor._id][0]['$$hashKey'];
      // console.log('-----------------------', chargeData.orders['56b534125eee08602c010d71'][0]);
      customerController.chargeOrders(chargeData)
        .then(function (response) {
          socket.emit('chargeResponse', response);
        });
    });

    socket.on('updateMenu', function (data) {
      socket.to(data.room._id).emit('updateItem', data);
    });

    socket.on('createOrder', function (order) {
      socket.to(order.room._id).emit('sendOrder', order);

    });



    socket.on('orderFinished', function (finishedOrder) {
      mail.sendMail(finishedOrder);
    });
// -------------- remove if server side emit is fixed ------
    // socket.on('new order', function (newOrderObj) {
    //   socket.emit(newOrderObj.vendorId, newOrderObj);
    // });
// ---------------------------------------------------------

  });

  return io;

};
