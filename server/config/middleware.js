var utils = require('./utils.js');
var bodyParser = require('body-parser');

module.exports = function (app, express) {

  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../../client'));

  var customerRouter = express.Router();
  var vendorRouter = express.Router();
  var menuRouter = express.Router();
  var orderRouter = express.Router();

  app.use('/api/customer', utils.hasToken, customerRouter);
  app.use('/api/vendors', utils.hasToken, vendorRouter);
  app.use('/api/menu', menuRouter);
  app.use('/api/orders', utils.hasToken, orderRouter);

  require('../routes/customer/customerRoutes.js')(customerRouter);
  require('../routes/vendor/vendorRoutes.js')(vendorRouter);
  require('../routes/menuItem/menuItemRoutes.js')(menuRouter);
  require('../routes/order/orderRoutes.js')(orderRouter);

};
