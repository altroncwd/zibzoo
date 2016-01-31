var vendorController = require('./vendorController.js');
var multiparty = require('connect-multiparty');

var multipartyMiddleware = multiparty();

module.exports = function (app) {

  app.post('/image', multipartyMiddleware, vendorController.upload);
  app.post('/signup', vendorController.signUp);
  app.post('/signin', vendorController.signIn);
  app.get('/', vendorController.retrieveVendors);
  app.put('/', vendorController.updateVendor);

};
