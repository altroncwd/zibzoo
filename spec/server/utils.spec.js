var authUtils = require('../../server/config/auth.utils.js');
var dbUtils = require('../../server/config/db.utils.js');
var vendorHelpers = require('../../server/vendor/vendorHelpers.js');
var httpMocks = require('node-mocks-http');

var mockUser = {
  username: 'willy',
  password: 'willylikeschilly123'
};

var unhashedPassword = mockUser.password;
var hashUserPassword = dbUtils.hashPassword.bind(mockUser);
var compareUserPassword = dbUtils.comparePassword.bind(mockUser);

describe('The', function () {

  describe('database utility function,', function () {

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

    }); // hashPassword()

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

    }); // comparePassword()

  }); // db.utils.js

  describe('auth utility function,', function () {

    var req = httpMocks.createRequest({
      body: {
        username: 'willy',
        password: 'fajita123'
      },
      query: {
        _id: '56a2c39e63edefd81df25ad2'
      }
    });

    var res = httpMocks.createResponse();

    describe('authorizeEntry(),', function () {

      it('should be a function.', function () {
        expect(authUtils.authorizeEntry).toEqual(jasmine.any(Function));
      });

      it('should invoke the callback function.', function () {
        spyOn(vendorHelpers, 'postVendor').and.callThrough();
        authUtils.authorizeEntry(req, res, 200, 404, vendorHelpers.postVendor);
        expect(vendorHelpers.postVendor).toHaveBeenCalled();
      });

    }); // authorizeEntry()

  }); // auth.util.js

}); // Utility functions
