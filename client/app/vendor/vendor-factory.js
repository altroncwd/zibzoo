angular.module('zibzoo.vendor.factory', [])
  .factory('vendor', ['$http', function ($http) {
    var vendor = {
      id: 1,
      name: 'Taco Loco',
      description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.',
      cuisine: 'Mexican',
      imageUrl: 'https://placehold.it/1000x344',
      menu: [
        {
          name: 'Chicken Fajita',
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
    };

    vendor.tempData = [{
      id: 1,
      name: 'Burger Shop',
      cuisine: 'American',
      description: 'this is a shop that sells food aka a restaurant',
      imageUrl: 'https://placehold.it/1000x344'
    },
    {
      id: 2,
      name: 'Pasta Shop',
      cuisine: 'Italian?',
      description: 'this is a shop that sells food aka a restaurant',
      imageUrl: 'https://placehold.it/1000x344'
    },
    {
      id: 3,
      name: 'Soup Shop',
      cuisine: 'Soup',
      description: 'this is a shop that sells food aka a restaurant',
      imageUrl: 'https://placehold.it/1000x344'
    },
    {
      id: 4,
      name: 'Thai Shop',
      cuisine: 'Thai',
      description: 'this is a shop that sells food aka a restaurant',
      imageUrl: 'https://placehold.it/1000x344'
    },
    {
      id: 5,
      name: 'Seafood Shop',
      cuisine: 'Seafood',
      description: 'this is a shop that sells food aka a restaurant',
      imageUrl: 'https://placehold.it/1000x344'
    }];

    vendor.getVendor = function (params) {
      return $http({
        method: 'GET',
        url: 'api/vendors',
        params: params
      })
      .success(function (data, status, headers, config) {
        return data;
      })
      .error(function (data, status) {
        console.error(
          data,
          status
          );
      });
    };

    vendor.saveVendor = function (vendorObj) {
      return $http({
        method: 'POST',
        url: 'api/vendors',
        data: vendorObj
      })
        .success(function (data, status, headers, config) {
          return data;
        })
        .error(function (data, status) {
          console.error(
            data,
            status
          );
        });
    };

    return vendor;
  }]);
