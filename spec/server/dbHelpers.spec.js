var menuItemHelpers = require('../../server/db/menuItem/menuItemHelpers.js');
var vendorHelpers = require('../../server/db/vendor/vendorHelpers.js');
var mongoose = require('mongoose');

// Open a connection to local MongoDB
mongoose.connect('mongodb://localhost:27017');

describe('Database helper functions', function () {

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
    name: 'Willy Con Carne',
    price: 7,
    inStock: true
  };

  describe('postVendor()', function () {

    it('should be a function', function () {
      expect(typeof vendorHelpers.postVendor).toBe('function');
    });

    it('should store a new vendor in the database', function (done) {
      vendorHelpers.postVendor(mockVendor)
        .then(function (vendor) {
          // save vendorId in mockMenuItem
          mockMenuItem.vendorId = vendor._id;
          expect(vendor.name).toBe("Willy's Chili");
          done();
        });
    });

    it('should return an error if a vendor already exists', function (done) {
      vendorHelpers.postVendor(mockVendor)
        .then(function (error) {
          expect(error.message).toBe('Vendor already exists.');
          done();
        });
    });

  }); // postVendor()

  describe('postMenuItem()', function () {

    it('should be a function', function () {
      expect(typeof vendorHelpers.postVendor).toBe('function');
    });

    it('should store a new menuItem in the database', function (done) {
      menuItemHelpers.postMenuItem(mockMenuItem)
        .then(function (menuItem) {
          expect(menuItem.vendorId).toBe(mockMenuItem.vendorId);
          expect(menuItem.name).toBe('Willy Con Carne');
          done();
        });
    });

  }); // postMenuItem()

  xdescribe('getVendor()', function () {

    it('should be a function', function () {
      expect(typeof vendorHelpers.postVendor).toBe('function');
    });

    it('should retrieve an existing vendor from the database', function (done) {
      var getPromise = vendorHelpers.getVendor(mockVendor);

      getPromise
        .then(function (vendor) {
          expect(vendor.name).toBe("Willy's Chili");
          done();
        });
    });

    xit('should return an error if a vendor already exists', function (done) {
      var getPromise = vendorHelpers.getVendor(mockVendor);

      getPromise
        .then(function (error) {
          expect(error.message).toBe('Vendor already exists.');
          done();
        });
    });

  }); // getVendor()






}); // Database helper functions

  // });

  // describe('.getVendor()', function () {

  //   var menuItems = {};
  //   menuItems.items = [{ name: 'Chicken' }, { name: 'Beef' }];

  //   beforeAll(function (done) {
  //     var menuPromise = menusHelpers.postMenu(mockMenu);

  //     menuPromise
  //       .then(function (result) {
  //         menuItems.menuId = result._id;
  //         for (var i = 0; i < menuItems.items.length; i++) {
  //           menuItems.items[i].menuId = result._id;
  //         }

  //         menusHelpers.postMenuItems(menuItems)
  //           .then(function (data) {
  //             console.log('\nMENU ITEMS', data);
  //           });

  //         done();
  //       });
  //   });

  //   it('should be a function', function () {
  //     expect(typeof vendorsHelpers.postVendor).toBe('function');
  //   });

  //   it('should retreive a vendor from the database', function (done) {
  //     var getPromise = vendorsHelpers.getVendor(mockVendor);

  //     getPromise
  //       .then(function (result) {
  //         expect(result.name).toBe("Willy's Chili");
  //         done();
  //       });
  //   });

  //   it('should return an error if the vendor does not exist', function (done) {
  //     mockVendor.name = "Little Willy's Chili";
  //     var getPromise = vendorsHelpers.getVendor(mockVendor);

  //     getPromise
  //       .then(function (result) {
  //         expect(result.message).toBe('Vendor does not exist.');
  //         done();
  //       });
  //   });
