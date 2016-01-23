var menuItemHelpers = require('../../server/db/menuItem/menuItemHelpers.js');
var vendorHelpers = require('../../server/db/vendor/vendorHelpers.js');
var mongoose = require('mongoose');

// Open a local connection to MongoDB
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

  // Shared testing variables
  var mockVendor = {
    name: "Willy's Chili",
    cuisine: ['Italian', 'Thai', 'Japanese']
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

          // save `vendor._id` in `mockVendor` and `mockMenuItem` for future tests
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


  describe('getVendors(),', function () {

    it('should be a function.', function () {
      expect(typeof vendorHelpers.postVendor).toBe('function');
    });

    it('should retrieve a specfic existing vendor from the database.', function (done) {
      vendorHelpers.getVendors({ _id: mockVendor._id })
        .then(function (vendors) {
          expect(vendors[0]._id).toEqual(mockVendor._id);
          expect(vendors[0].name).toBe(mockVendor.name);
          done();
        });
    });

    it('should retreive multiple existing vendors from the database', function (done) {
      var secondMockVendor = {
        name: 'Bengi and The Mongoose',
        cuisine: ['Italian', 'Japanese']
      };

      vendorHelpers.postVendor(secondMockVendor)
        .then(function (vendor) {
          return vendorHelpers.getVendors({ cuisine: 'Japanese' });
        })
        .then(function (vendors) {
          expect(vendors.length).toBe(2);
          done();
        });

    });

    it('should return an error if a vendor does not exist.', function (done) {
      // query the database with a non-existent `_id`
      vendorHelpers.getVendors({ _id: '56a2c39e63edefd81df25ad2' })
        .then(function (error) {
          expect(error.message).toBe('Unable to find vendor(s).');
          done();
        });
    });

  }); // getVendors()


  describe('postMenuItem(),', function () {

    it('should be a function.', function () {
      expect(typeof vendorHelpers.postVendor).toBe('function');
    });

    it('should store a new menuItem in the database.', function (done) {
      menuItemHelpers.postMenuItem(mockMenuItem)
        .then(function (menuItem) {

          // save `menuItem._id` in `mockMenuItem` for future tests
          mockMenuItem._id = menuItem._id;

          expect(menuItem._id).toBeDefined();
          expect(menuItem.vendorId).toBe(mockMenuItem.vendorId);
          expect(menuItem.name).toBe(mockMenuItem.name);
          done();
        });
    });

    it('should update the vendor with the new menu item _id.', function (done) {
      vendorHelpers.getVendors({ _id: mockVendor._id })
        .then(function (vendorList) {
          expect(vendorList[0].menuItems.length).toBe(1);
          expect(vendorList[0].menuItems[0].toObject().name).toEqual(mockMenuItem.name);
          done();
        });
    });

  }); // postMenuItem()

  describe('deleteMenuItem(),', function () {

    it('should be a function.', function () {
      expect(typeof menuItemHelpers.deleteMenuItem).toBe('function');
    });

    it('should delete an existing menu item.', function (done) {
      menuItemHelpers.deleteMenuItem(mockMenuItem)
        .then(function (docsAffectedObj) {
          expect(docsAffectedObj.result.n).toBe(1);
          done();
        });
    });

    it('should remove the menu item reference from the corresponding vendor', function (done) {
      vendorHelpers.getVendors(mockVendor)
        .then(function (vendorList) {
          expect(vendorList[0].menuItems.length).toBe(0);
          done();
        });
    });

    it('should throw an error if the menu item was not deleted', function (done) {
      menuItemHelpers.deleteMenuItem(mockMenuItem)
        .then(function (error) {
          expect(error.message).toBe('Menu item cannot be deleted because it may not exist.');
          done();
        });
    });

  }); // deleteMenuItem()

}); // Database helper functions
