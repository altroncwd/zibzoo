var bodyParser = require('body-parser');

module.exports = function (app, express) {
  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../../client'));

  var userRouter = express.Router();
  var vendorRouter = express.Router();

  app.use('/api/user', userRouter);
  app.use('/api/vendor', vendorRouter);

  require('../routes/user/userRoutes.js')(userRouter);
  require('../routes/vendor/vendorRoutes.js')(vendorRouter);
};

