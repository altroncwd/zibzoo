var usersHelpers = require('../../server/db/users/usersHelpers.js');

describe('usersHelpers', function () {
  var mockUser = {
    name: 'Willy'
  };

  describe('.postUser()', function () {
    it('should be a function', function () {
      expect(typeof usersHelpers.postUser).toBe('function');
    });

    it('should store a new user in the database', function (done) {
      var postPromise = usersHelpers.postUser(mockUser);

      postPromise
        .then(function (result) {
          expect(result.name).toBe('Willy');
          done();
        });
    });

    it('should return an error if a user already exists', function (done) {
      var postPromise = usersHelpers.postUser(mockUser);

      postPromise
        .then(function (result) {
          expect(result.message).toBe('User already exists.');
          done();
        });
    });
  });

  describe('.getUser()', function () {
    it('should be a function', function () {
      expect(typeof usersHelpers.postUser).toBe('function');
    });

    it('should retreive a user from the database', function (done) {
      var getPromise = usersHelpers.getUser(mockUser);

      getPromise
        .then(function (result) {
          expect(result.name).toBe('Willy');
          done();
        });
    });

    it('should return an error if the user does not exist', function (done) {
      mockUser.name = 'Little Willy';
      var getPromise = usersHelpers.getUser(mockUser);

      getPromise
        .then(function (result) {
          expect(result.message).toBe('User does not exist.');
          done();
        });
    });
  });
});
