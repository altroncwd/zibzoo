var bodyParser = require('body-parser');

module.exports = function(app, express) {

  app.use(bodyParser.json());
  app.use(express.static(__dirname + './../../client'));

  var userRouter = express.Router();
  var vendorRouter = express.Router();

  app.use('/api/users', userRouter);
  app.use('/api/vendors', vendorRouter);

  require('./../routes/users/userRoutes.js')(userRouter);
  require('./../routes/vendors/vendorRoutes.js')(vendorRouter);

}


