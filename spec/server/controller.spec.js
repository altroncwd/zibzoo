var vendorHelpers = require('../../server/db/vendor/vendorHelpers.js');
var authController = require('../../server/routes/auth/authController.js');
var httpMocks = require('node-mocks-http');

describe('The vendor controller, ', function () {

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
      expect(authController.authorizeEntry).toEqual(jasmine.any(Function));
    });

    it('should invoke the callback function.', function () {
      spyOn(vendorHelpers, 'postVendor').and.callThrough();
      authController.authorizeEntry(req, res, 201, 403, vendorHelpers.postVendor);
      expect(vendorHelpers.postVendor).toHaveBeenCalled();
    });

  }); // authorizeEntry()

}); // Vendor controller
