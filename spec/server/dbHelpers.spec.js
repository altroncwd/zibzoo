var customerHelpers = require('../../server/customer/customerHelpers.js');
var menuItemHelpers = require('../../server/menuItem/menuItemHelpers.js');
var vendorHelpers = require('../../server/vendor/vendorHelpers.js');
var mongoose = require('mongoose');

// Open a local connection to MongoDB
mongoose.connect('mongodb://localhost/zibzoo');

describe('The', function () {

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
    email: 'willy@chili.com',
    password: 'rawr',
    name: "Willy's Chili",
    cuisine: 'Japanese'
  };

  var mockMenuItem = {
    name: "Willy's Fajita",
    price: 7,
    inStock: true
  };

  var mockCustomer = {
    // _id:
    email: 'sam@samwise.com',
    password: 'rawr'
    // salt:
  };

  describe('vendor helper function,', function () {

    describe('postVendor(),', function () {

      it('should be a function.', function () {
        expect(vendorHelpers.postVendor).toEqual(jasmine.any(Function));
      });

      it('should store a new vendor in the database and return the document.', function (done) {
        vendorHelpers.postVendor(mockVendor)
          .then(function (vendor) {

            // save `vendor._id` in `mockVendor` and `mockMenuItem` for future tests
            mockVendor._id = vendor._id;
            mockMenuItem.vendorId = vendor._id;

            expect(vendor.email).toBe(mockVendor.email);
            done();
          });
      });

      it('should return an error if a vendor already exists.', function (done) {
        vendorHelpers.postVendor(mockVendor)
          .then(function (error) {
            expect(error.message).toBe(mockVendor.email + ' already exists.');
            done();
          });
      });

    }); // postVendor()

    describe('getVendors(),', function () {

      it('should be a function.', function () {
        expect(vendorHelpers.postVendor).toEqual(jasmine.any(Function));
      });

      it('should retrieve a specfic, existing vendor from the database and return the document.', function (done) {
        vendorHelpers.getVendors({ _id: mockVendor._id })
          .then(function (vendors) {
            expect(vendors[0]._id).toEqual(mockVendor._id);
            expect(vendors[0].email).toBe(mockVendor.email);
            done();
          });
      });

      it('should retrieve multiple existing vendors from the database and return the documents.', function (done) {
        var secondMockVendor = {
          email: 'Bengi and The Mongoose',
          password: 'rawr',
          cuisine: 'Japanese'
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

    describe('updateVendor(),', function () {

      it('should be a function.', function () {
        expect(vendorHelpers.updateVendor).toEqual(jasmine.any(Function));
      });

      it('should update an existing vendor.', function (done) {
        var update = {
          _id: mockVendor._id,
          propertiesToUpdate: {
            name: "Freddy's Fajitas",
            cuisine: 'Italian'
          }
        };

        vendorHelpers.updateVendor(update)
          .then(function (affectedDocsObj) {
            return vendorHelpers.getVendors({ _id: mockVendor._id });
          })
          .then(function (vendor) {
            expect(vendor[0].name).toBe(update.propertiesToUpdate.name);
            expect(vendor[0].cuisine).toBe(update.propertiesToUpdate.cuisine);
            done();
          });
      });

      it('should return an error if no vendors were modified.', function (done) {
        var update = {
          _id: mockVendor._id,
          propertiesToUpdate: {
            invalidProperty: 'Mwahahaha!'
          }
        };

        vendorHelpers.updateVendor(update)
          .then(function (error) {
            expect(error.message).toBe('No records were updated.');
            done();
          });
      });

    }); // updateVendor()

  }); // Vendor helper functions

  describe('menuItem helper function,', function () {

    describe('postMenuItem(),', function () {

      it('should be a function.', function () {
        expect(vendorHelpers.postVendor).toEqual(jasmine.any(Function));
      });

      it('should store a new menuItem in the database and return the document.', function (done) {
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
          .then(function (vendors) {
            expect(vendors[0].menuItems.length).toBe(1);
            expect(vendors[0].menuItems[0].name).toEqual(mockMenuItem.name);
            done();
          });
      });

    }); // postMenuItem()

    describe('deleteMenuItem(),', function () {

      it('should be a function.', function () {
        expect(menuItemHelpers.deleteMenuItem).toEqual(jasmine.any(Function));
      });

      it('should delete an existing menu item and return the number of documents affected.', function (done) {
        menuItemHelpers.deleteMenuItem(mockMenuItem)
          .then(function (docsAffectedObj) {
            expect(docsAffectedObj.result.n).toBe(1);
            done();
          });
      });

      it('should remove the menu item reference from the corresponding vendor.', function (done) {
        vendorHelpers.getVendors({ _id: mockVendor._id })
          .then(function (vendors) {
            expect(vendors[0].menuItems.length).toBe(0);
            done();
          });
      });

      it('should return an error if the menu item was not deleted.', function (done) {
        menuItemHelpers.deleteMenuItem(mockMenuItem)
          .then(function (error) {
            expect(error.message).toBe('Menu item cannot be deleted because it may not exist.');
            done();
          });
      });

    }); // deleteMenuItem()

  }); // Menu item helper functions

  describe('customer helper function,', function () {

    describe('postCustomer(),', function () {

      it('should be a function.', function () {
        expect(customerHelpers.postCustomer).toEqual(jasmine.any(Function));
      });

      it('store a new customer in the database and return the document.', function (done) {
        customerHelpers.postCustomer(mockCustomer)
          .then(function (customer) {

            // save `customer._id` in `mockCustomer` for future tests
            mockCustomer._id = customer._id;

            expect(customer.email).toBe(mockCustomer.email);
            done();
          });
      });

      it('should return an error if the customer already exists.', function (done) {
        customerHelpers.postCustomer(mockCustomer)
          .then(function (error) {
            expect(error.message).toBe(mockCustomer.email + ' already exists.');
            done();
          });
      });

    }); // postCustomer()

    describe('getCustomer(),', function () {

      it('should be a function.', function () {
        expect(customerHelpers.getCustomer).toEqual(jasmine.any(Function));
      });

      it('should retrieve a specific, existing customer from the database and return the document.', function (done) {
        customerHelpers.getCustomer(mockCustomer)
          .then(function (customer) {
            expect(customer._id).toEqual(mockCustomer._id);
            expect(customer.email).toBe(mockCustomer.email);
            done();
          });
      });

      it('should return an error if the customer does not exist.', function (done) {
        // query the database with a non-existent email
        customerHelpers.getCustomer({ email: 'Non-existent email', password: 'not rawr' })
          .then(function (error) {
            expect(error.message).toBe('Customer does not exist.');
            done();
          });
      });

    }); // getCustomer()

    describe('updateCustomer(),', function () {

      it('should be a function.', function () {
        expect(customerHelpers.updateCustomer).toEqual(jasmine.any(Function));
      });

      it('should update an existing customer.', function (done) {
        var update = {
          _id: mockCustomer._id,
          propertiesToUpdate: {
            name: 'Bengi Mongoose'
          }
        };

        customerHelpers.updateCustomer(update)
          .then(function (affectedDocsObj) {
            return customerHelpers.getCustomer({ email: mockCustomer.email });
          })
          .then(function (customer) {
            expect(customer.name).toBe(update.propertiesToUpdate.name);
            expect(customer.cuisine).toBe(update.propertiesToUpdate.cuisine);
            done();
          });
      });


      it('should return an error if no customers were modified.', function (done) {
        var update = {
          _id: mockCustomer._id,
          propertiesToUpdate: {
            invalidProperty: 'Mwahahaha!'
          }
        };

        customerHelpers.updateCustomer(update)
          .then(function (error) {
            expect(error.message).toBe('No records were updated.');
            done();
          });
      });

    }); // updateCustomer()

  }); // Customer helper functions

}); // Database helper functions
