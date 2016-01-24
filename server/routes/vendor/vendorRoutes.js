var vendorController = require('./vendorController.js');

module.exports = function (app) {

  app.post('/', vendorController.signUp);
  app.get('/', vendorController.signIn);
  app.get('/retrieve', vendorController.retrieveVendors);

};
