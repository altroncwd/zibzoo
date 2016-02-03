var bodyParser = require('body-parser');

module.exports = function (app, express) {

  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../../client'));

  var customerRouter = express.Router();
  var vendorRouter = express.Router();
  var menuRouter = express.Router();
  var orderRouter = express.Router();

  app.use('/api/customer', customerRouter);
  app.use('/api/vendors', vendorRouter);
  app.use('/api/menu', menuRouter);
  app.use('/api/orders', orderRouter);

  require('../customer/customerRoutes.js')(customerRouter);
  require('../vendor/vendorRoutes.js')(vendorRouter);
  require('../menuItem/menuItemRoutes.js')(menuRouter);
  require('../order/orderRoutes.js')(orderRouter);

};
