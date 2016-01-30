var customerController = require('./customerController');

module.exports = function (app) {

  app.post('/signup', customerController.signUp);
  app.post('/signin', customerController.signIn);
  app.put('/', customerController.updateCustomer);
  app.post('/charge', customerController.charge);

};
