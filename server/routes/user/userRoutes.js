var userController = require('./userController');

module.exports = function (app) {

  app.post('/signup', userController.signUp);
  app.post('/signin', userController.signIn);

};
