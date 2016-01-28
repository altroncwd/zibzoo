var customerController = require('./customerController');

module.exports = function (app) {

  app.post('/signup', customerController.signUp);
  app.post('/signin', customerController.signIn);

};