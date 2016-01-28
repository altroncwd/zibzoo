var menuItemController = require('./menuItemController');

module.exports = function (app) {

  app.post('/', menuItemController.createMenuItem);
  app.delete('/', menuItemController.removeMenuItem);
  app.put('/', menuItemController.updateMenuItem);

};
