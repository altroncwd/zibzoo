var vendorHelpers = require('../../server/db/vendor/vendorHelpers.js');
var vendorControllers = require('../../server/routes/vendor/vendorController.js');
var httpMocks = require('node-mocks-http');

describe('The vendor controller, ', function () {

  var request = httpMocks.createRequest({
    body: {
      username: 'willy',
      password: 'fajita123'
    },
    query: {
      _id: '56a2c39e63edefd81df25ad2'
    }
  });

  var response = httpMocks.createResponse();

  describe('signUp(),', function () {

    it('should be a function', function () {
      expect(vendorControllers.signUp).toEqual(jasmine.any(Function));
    });

    it('should invoke postVendor()', function () {
      spyOn(vendorHelpers, 'postVendor').and.callThrough();
      vendorControllers.signUp(request, response);
      expect(vendorHelpers.postVendor).toHaveBeenCalled();
    });

  }); // signUp()

  describe('signIn(),', function () {

    it('should be a function', function () {
      expect(vendorControllers.signIn).toEqual(jasmine.any(Function));
    });

    it('should invoke getVendors()', function () {
      spyOn(vendorHelpers, 'getVendors').and.callThrough();
      vendorControllers.signIn(request, response);
      expect(vendorHelpers.getVendors).toHaveBeenCalled();
    });

  }); // signIn()

  describe('retrieveVendors(),', function () {

    it('should be a function', function () {
      expect(vendorControllers.retrieveVendors).toEqual(jasmine.any(Function));
    });

    it('should invoke getVendors()', function () {
      spyOn(vendorHelpers, 'getVendors').and.callThrough();
      vendorControllers.retrieveVendors(request, response);
      expect(vendorHelpers.getVendors).toHaveBeenCalled();
    });

  }); // retrieveVendors()

}); // Vendor controller
