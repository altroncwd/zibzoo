var dbUtils = require('../../server/utils/db.utils.js');

var mockUser = {
  username: 'willy',
  password: 'willylikeschilly123'
};

var unhashedPassword = mockUser.password;
var hashUserPassword = dbUtils.hashPassword.bind(mockUser);
var compareUserPassword = dbUtils.comparePassword.bind(mockUser);

describe('hashPassword()', function () {
  it('should be a function', function () {
    expect(dbUtils.hashPassword).toEqual(jasmine.any(Function));
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
    expect(dbUtils.comparePassword).toEqual(jasmine.any(Function));
  });

  it('should be able to compare passwords', function (done) {
    compareUserPassword(unhashedPassword)
      .then(function (result) {
        expect(result).toBe(true);
        done();
      });
  });
});
