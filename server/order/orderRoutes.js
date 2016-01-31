var orderController = require('./orderController');

module.exports = function (app) {

  app.post('/', orderController.postMultipleOrders);
  app.get('/', orderController.getMultipleOrders);
  app.put('/', orderController.updateOneOrder);

};

