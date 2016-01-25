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

    vendor.getVendor = function (params) {
      return $http({
        method: 'GET',
        url: '/api/vendors',
        params: params
      })
      .then(function (res) {
        return res.data;
      }, function (res) {
        console.error('Error: ', res);
      });
    };

    return vendor;
  }]);
