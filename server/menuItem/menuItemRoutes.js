var server = require('../server.js');
var menuItemController = require('./menuItemController');


module.exports = function (app) {

  app.post('/', menuItemController.createMenuItem);
  app.put('/', menuItemController.updateMenuItem);
  app.delete('/', menuItemController.deleteMenuItem);

};
