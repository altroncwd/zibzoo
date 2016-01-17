var bodyParser = require('body-parser');

module.exports = function(app, express) {

  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../../client'));

  var usersRouter = express.Router();
  var vendorsRouter = express.Router();

  app.use('/api/users', usersRouter);
  app.use('/api/vendors', vendorsRouter);

  require('../routes/users/usersRoutes.js')(usersRouter);
  require('../routes/vendors/vendorsRoutes.js')(vendorsRouter);

}


