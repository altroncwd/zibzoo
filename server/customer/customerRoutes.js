var io = require('../server.js');
var customerController = require('./customerController')(io);

module.exports = function (app) {

  app.post('/signup', customerController.signUp);
  app.post('/signin', customerController.signIn);
  app.put('/update', customerController.updateCustomer);
  app.post('/charge', customerController.chargeOrders);

};
