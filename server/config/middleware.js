var bodyParser = require('body-parser');

module.exports = function (app, express) {
  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../../client'));

  var usersRouter = express.Router();
  var vendorRouter = express.Router();

  app.use('/api/users', usersRouter);
  app.use('/api/vendor', vendorRouter);

  require('../routes/users/usersRoutes.js')(usersRouter);
  require('../routes/vendor/vendorRoutes.js')(vendorRouter);
};

