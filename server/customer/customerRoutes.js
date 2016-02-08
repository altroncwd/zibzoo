var server = require('../server.js');
var customerController = require('./customerController')(server.io);

module.exports = function (app) {

  app.post('/signup', customerController.signUp);
  app.post('/signin', customerController.signIn);
  app.put('/update', customerController.updateCustomer);
  app.post('/charge', customerController.chargeOrders);
  app.post('/card', customerController.saveCard);

};
