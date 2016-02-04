var vendorController = require('./vendorController.js');
var multiparty = require('connect-multiparty')();

module.exports = function (app) {

  app.post('/image', multiparty, vendorController.upload);
  app.post('/signup', vendorController.signUp);
  app.post('/signin', vendorController.signIn);
  app.get('/', vendorController.getMultipleVendors);
  app.put('/', vendorController.updateOneVendor);

};
