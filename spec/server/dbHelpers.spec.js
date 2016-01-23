var menuItemHelpers = require('../../server/db/menuItem/menuItemHelpers.js');
var vendorHelpers = require('../../server/db/vendor/vendorHelpers.js');
var mongoose = require('mongoose');

// Open a connection to local MongoDB
mongoose.connect('mongodb://localhost:27017');


describe('The database helper function,', function () {

  // Drop the database before tests run
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

  // Disconnect from the database after tests run
  afterAll(function () {
    mongoose.disconnect();
  });

  // Global testing variables
  var mockVendor = {
    name: "Willy's Chili"
  };

  var mockMenuItem = {
    name: "Willy's Fajita",
    price: 7,
    inStock: true
  };


  describe('postVendor(),', function () {

    it('should be a function.', function () {
      expect(typeof vendorHelpers.postVendor).toBe('function');
    });

    it('should store a new vendor in the database.', function (done) {
      vendorHelpers.postVendor(mockVendor)
        .then(function (vendor) {

          // save vendor _id in mockVendor and mockMenuItem
          mockVendor._id = vendor._id;
          mockMenuItem.vendorId = vendor._id;

          expect(vendor.name).toBe(mockVendor.name);
          done();
        });
    });

    it('should return an error if a vendor already exists.', function (done) {
      vendorHelpers.postVendor(mockVendor)
        .then(function (error) {
          expect(error.message).toBe('Vendor already exists.');
          done();
        });
    });

  }); // postVendor()


  describe('getOneVendor(),', function () {

    it('should be a function.', function () {
      expect(typeof vendorHelpers.postVendor).toBe('function');
    });

    it('should retrieve an existing vendor from the database.', function (done) {
      vendorHelpers.getOneVendor(mockVendor)
        .then(function (vendor) {
          expect(vendor._id).toEqual(mockVendor._id);
          expect(vendor.name).toBe(mockVendor.name);
          done();
        });
    });

    it('should return an error if a vendor does not exist.', function (done) {
      // query the database with a non-existent _id
      vendorHelpers.getOneVendor({ _id: '56a2c39e63edefd81df25ad2' })
        .then(function (error) {
          expect(error.message).toBe('Vendor does not exist.');
          done();
        });
    });

  }); // getOneVendor()


  describe('postMenuItem(),', function () {

    it('should be a function.', function () {
      expect(typeof vendorHelpers.postVendor).toBe('function');
    });

    it('should store a new menuItem in the database.', function (done) {
      menuItemHelpers.postMenuItem(mockMenuItem)
        .then(function (menuItem) {
          expect(menuItem._id).toBeDefined();
          expect(menuItem.vendorId).toBe(mockMenuItem.vendorId);
          expect(menuItem.name).toBe(mockMenuItem.name);
          done();
        });
    });

    it('should update the vendor with the new menu item _id.', function (done) {
      vendorHelpers.getOneVendor(mockVendor)
        .then(function (vendor) {
          expect(vendor.menuItems.length).toBe(1);
          expect(vendor.menuItems[0].name).toEqual(mockMenuItem.name);
          done();
        });
    });

  }); // postMenuItem()

}); // Database helper functions
