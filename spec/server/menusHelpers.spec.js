var menusHelpers = require('../../server/db/menus/menusHelpers.js');
var vendorsHelpers = require('../../server/db/vendors/vendorsHelpers.js');
var mongoose = require('mongoose');

// Open connection -- NOTE: must be in first file in server/
mongoose.connect('mongodb://localhost:27017');

describe('menusHelpers', function () {

  // Drop the database before running tests in top file -- NOTE: must be in first file in server/
  beforeAll(function (done) {
    mongoose.connection.on('open', function () {
      mongoose.connection.db.dropDatabase(function (error) {
        if (error) {
          throw error;
        }

        done();
      });
    });
  });

  var mockVendor = {
    name: 'Trunch Box'
  };

  var mockMenu = {};
  var newMenuId;


  describe('.postMenu()', function () {

    beforeAll(function (done) {
      vendorsHelpers.postVendor(mockVendor)
        .then(function (result) {
          mockMenu.vendorId = result._id;
          done();
        });
    });

    it('should be a function', function () {
      expect(typeof menusHelpers.postMenu).toBe('function');
    });

    it('should store a new menu in the database', function (done) {
      var postPromise = menusHelpers.postMenu(mockMenu);

      postPromise
        .then(function (result) {
          newMenuId = result._id;
          expect(result.vendorId).toBeDefined();
          expect(result.vendorId).toBe(mockMenu.vendorId);
          done();
        });
    });

    it('should update a vendor with the new menu', function (done) {
      var getVendorPromise = vendorsHelpers.getVendor(mockVendor);

      getVendorPromise
        .then(function (result) {
          expect(result.menuIds.length).toBe(1);
          expect(result.menuIds[0]).toEqual(newMenuId);
          done();
        });
    });
  });

  describe('.postMenuItem()', function () {
    it('should be a function', function () {
      expect(typeof menusHelpers.postMenu).toBe('function');
    });

    it('should store a new menu item in the database', function (done) {
      var postMenuItemPromise = menusHelpers.postMenuItem(mockMenu);

      postMenuItemPromise
        .then(function (result) {
          expect(result.name).toBe('Willy');
          done();
        });
    });

    it('should return an error if the menu does not exist', function (done) {
      mockMenu.name = 'Little Willy';
      var getPromise = menusHelpers.getMenu(mockMenu);

      getPromise
        .then(function (result) {
          expect(result.message).toBe('Menu does not exist.');
          done();
        });
    });
  });
});
