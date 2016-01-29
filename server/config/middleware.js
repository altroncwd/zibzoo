var bodyParser = require('body-parser');

module.exports = function (app, express) {

  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../../client'));

  var customerRouter = express.Router();
  var vendorRouter = express.Router();

  app.use('/api/customer', customerRouter);
  app.use('/api/vendors', vendorRouter);

  require('../routes/customer/customerRoutes.js')(customerRouter);
  require('../routes/vendor/vendorRoutes.js')(vendorRouter);

};
