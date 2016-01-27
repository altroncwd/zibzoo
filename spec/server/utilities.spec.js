var utils = require('../../server/config/utilities.js');

var mockUser = {
  username: 'willy',
  password: 'willylikeschilly123'
};

var unhashedPassword = mockUser.password;
var hashUserPassword = utils.hashPassword.bind(mockUser);
var compareUserPassword = utils.comparePassword.bind(mockUser);

describe('hashPassword()', function () {
  it('should be a function', function () {
    expect(utils.hashPassword).toEqual(jasmine.any(Function));
  });

  it('should hash a password', function (done) {
    hashUserPassword(function () {
      expect(mockUser.password).toEqual(jasmine.any(String));
      expect(mockUser.password).not.toBe(unhashedPassword);
      done();
    });
  });
});

describe('comparePassword()', function () {
  it('should be a function', function () {
    expect(utils.comparePassword).toEqual(jasmine.any(Function));
  });

  it('should be able to compare passwords', function (done) {
    compareUserPassword(unhashedPassword)
      .then(function (result) {
        expect(result).toBe(true);
        done();
      });
  });
});
