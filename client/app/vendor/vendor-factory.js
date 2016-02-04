angular.module('zibzoo.vendor.factory', [])
  .factory('vendor', ['$http', '$state', function ($http, $state) {
    var vendor = {};

    vendor.data = {};

    vendor.tempData = [{
      _id: 1421341,
      name: 'Burger Shop',
      cuisine: 'American',
      description: 'this is a shop that sells food aka a restaurant',
      imageUrl: 'https://placehold.it/1000x344',
      latitude: 37.787899, 
      longitude: -122.399699,
      menuItems: [
        {
          name: 'Royale with Cheese',
          description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit',
          price: 3.75
        },
        {
          name: '1/4 Burger',
          description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit',
          price: 4.75
        },
        {
          name: '1/4 Bacon Burger',
          description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit',
          price: 3.75
        },
        {
          name: 'Burger & Avocado',
          description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit',
          price: 3.50
        },
        {
          name: 'Everything Burger',
          description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit',
          price: 5.75
        },
        {
          name: 'The Burger',
          description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit',
          price: 4.50
        }
      ]
    },
    {
      _id: 2563684,
      name: 'Pasta Shop',
      cuisine: 'Italian',
      description: 'this is a shop that sells food aka a restaurant',
      imageUrl: 'https://placehold.it/1000x344',
      latitude: 37.789699, 
      longitude: -122.397494,
      menuItems: [
        {
          name: 'Peperonni Pizza',
          description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit',
          price: 7.75
        },
        {
          name: 'Combination Pizza',
          description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit',
          price: 9.75
        },
        {
          name: 'Calzone',
          description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit',
          price: 10.75
        },
        {
          name: 'Salad',
          description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit',
          price: 5.50
        },
        {
          name: 'Pasta Bowl',
          description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit',
          price: 8.75
        },
        {
          name: 'Pizza Sticks',
          description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit',
          price: 6.50
        }
      ]
    },
    {
      _id: 3974567,
      name: 'Soup Shop',
      cuisine: 'Soup',
      description: 'this is a shop that sells food aka a restaurant',
      imageUrl: 'https://placehold.it/1000x344',
      latitude: 37.788001, 
      longitude: -122.398815,
      menuItems: [
        {
          name: 'Chicken Soup',
          description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit',
          price: 3.75
        },
        {
          name: 'Southwestern Soup',
          description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit',
          price: 4.75
        },
        {
          name: 'Chilli',
          description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit',
          price: 3.75
        },
        {
          name: 'Tomato Bisque',
          description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit',
          price: 4.50
        },
        {
          name: 'Corn Chowder',
          description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit',
          price: 5.75
        },
        {
          name: 'Minestrone',
          description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit',
          price: 4.50
        }
      ]
    },
    {
      _id: 4234666,
      name: 'Thai Shop',
      cuisine: 'Thai',
      description: 'this is a shop that sells food aka a restaurant',
      imageUrl: 'https://placehold.it/1000x344',
      latitude: 37.787094, 
      longitude: -122.402962,
      menuItems: [
        {
          name: 'Pad Thai',
          description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit',
          price: 3.75
        },
        {
          name: 'Baja Shrimp',
          description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit',
          price: 4.75
        },
        {
          name: 'Beef Fajita',
          description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit',
          price: 3.75
        },
        {
          name: 'Fried Avocado',
          description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit',
          price: 3.50
        },
        {
          name: 'Dirty Sanchez',
          description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit',
          price: 5.75
        },
        {
          name: 'Green Chile',
          description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit',
          price: 4.50
        }
      ]
    },
    {
      _id: 59567856,
      name: 'Seafood Shop',
      cuisine: 'Seafood',
      description: 'this is a shop that sells food aka a restaurant',
      imageUrl: 'https://placehold.it/1000x344',
      latitude: 37.786971, 
      longitude: -122.398086,
      menuItems: [
        {
          name: 'Filet of Soul',
          description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit',
          price: 3.75
        },
        {
          name: 'Alaskan King Crab',
          description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit',
          price: 12.75
        },
        {
          name: 'Salmon',
          description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit',
          price: 23.75
        },
        {
          name: 'Calamari',
          description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit',
          price: 12.20
        },
        {
          name: 'Fish \'n Chips',
          description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit',
          price: 5.75
        },
        {
          name: 'Halibut',
          description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit',
          price: 14.50
        }
      ]
    }];

    vendor.getVendors = function (params) {
      return $http({
        method: 'GET',
        url: 'api/vendors',
        params: params
      })
      .then(function (res) {
        return res.data;
      });
    };

    vendor.searchVendors = function (params) {
      return $http({
        method: 'GET',
        url: 'api/vendors/search',
        params: params
      })
      .then(function (res) {
        return res.data;
      });
    };

    vendor.saveVendor = function (vendorObj) {
      return $http({
        method: 'POST',
        url: 'api/vendors',
        data: vendorObj
      })
      .then(function (res) {
        return res.data;
      });
    };

    vendor.updateVendor = function (vendorObj) {
      return $http({
        method: 'PUT',
        url: 'api/vendors',
        data: vendorObj
      })
      .then(function (res) {
        return res.data;
      });
    };

    vendor.setData = function (scope, vendorData) {
      if ($state.is('vendor')) {
        scope.vendor = vendorData;
      } else {
        scope.vendors = vendorData;
      }
    };

    return vendor;
  }]);
