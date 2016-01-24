var usersController = require('./usersController');

module.exports = function (app) {

  app.post('/signup', usersController.signUp);
  app.post('/signin', usersController.signIn);

};
