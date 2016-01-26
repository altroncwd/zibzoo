var vendorController = require('./vendorController.js');

module.exports = function (app) {

  app.post('/signup', vendorController.signUp);
  app.get('/signin', vendorController.signIn);
  app.get('/', vendorController.retrieveVendors);

};
