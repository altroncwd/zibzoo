var usersHelpers = require('../server/db/users/usersHelpers.js');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017');

describe('.postUser()', function () {
  var mockUser = {
    name: 'Willy'
  }

  it('should be a function', function () {
    expect(typeof usersHelpers.postUser).toBe('function');
  });

  it('should store a new user in the database', function (done) {
    var userPromise = usersHelpers.postUser(mockUser);

    userPromise
      .then(function (result) {
        expect(result.name).toEqual('Willy');
        done();
      });
  });

  it('should throw an error if a user already exists', function (done) {
    var userPromise = usersHelpers.postUser(mockUser);

    userPromise
      .then(function (result) {
        expect(result.message).toEqual('User already exists.');
        done();
      });
  });
});
