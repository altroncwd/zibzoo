var usersController = require('./usersController');

module.exports = function (app) {

  app.post('/', usersController.signUp);
  app.get('/', usersController.signIn);

};
