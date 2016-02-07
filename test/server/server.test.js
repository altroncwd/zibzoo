var server = require('../../server/server.js');
var should = require('should');
var request = require('supertest-as-promised');

var agent = request.agent(server.app);

describe('Test initiated.\n', function () {

  before(function (done) {
    server.db.connection.once('open', function () {
      console.log('Database dropped.\n');
      server.db.connection.db.dropDatabase(done);
    });
  });

  after(function () {
    server.db.disconnect();
  });

  describe('The server:', function () {

    it('should deliver index.html content upon GET request to root directory.', function (done) {
      agent
        .get('/')
        .expect(200)
        .expect('Content-Type', 'text/html; charset=UTF-8')
        .expect('Content-Length', 603)
        .then(function (res) {
          (res.text).should.be.a.String();
          done();
        })
        .catch(done);
    });

  });

});
