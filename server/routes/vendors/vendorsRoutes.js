var vendorsController = require('./vendorsController.js');

module.exports = function (app) {

  app.post('/', vendorsController.signUp);
  app.get('/', vendorsController.signIn);
  app.get('/retrieve', vendorsController.retrieveVendor);

};
