var vendorsHelpers = require('../../server/db/vendors/vendorsHelpers.js');
var mongoose = require('mongoose');

describe('vendorsHelpers', function () {
  var mockVendor = {
    name: "Willy's Chili"
  }

  // Disconnect from database after all tests have run -- NOTE: must be in last file in server/
  afterAll(function () {
    mongoose.disconnect();
  });

  describe('.postVendor()', function () {
    it('should be a function', function () {
      expect(typeof vendorsHelpers.postVendor).toBe('function');
    });

    it('should store a new vendor in the database', function (done) {
      var postPromise = vendorsHelpers.postVendor(mockVendor);

      postPromise
        .then(function (result) {
          expect(result.name).toBe("Willy's Chili");
          done();
        });
    });

    it('should return an error if a vendor already exists', function (done) {
      var postPromise = vendorsHelpers.postVendor(mockVendor);

      postPromise
        .then(function (result) {
          expect(result.message).toBe('Vendor already exists.');
          done();
        });
    });
  });

  describe('.getVendor()', function () {
    it('should be a function', function () {
      expect(typeof vendorsHelpers.postVendor).toBe('function');
    });

    it('should retreive a vendor from the database', function (done) {
      var getPromise = vendorsHelpers.getVendor(mockVendor);

      getPromise
        .then(function (result) {
          expect(result.name).toBe("Willy's Chili");
          done();
        });
    });

    it('should return an error if the vendor does not exist', function (done) {
      mockVendor.name = "Little Willy's Chili"
      var getPromise = vendorsHelpers.getVendor(mockVendor);

      getPromise
        .then(function (result) {
          expect(result.message).toBe('Vendor does not exist.');
          done();
        });
    });
  });
});
