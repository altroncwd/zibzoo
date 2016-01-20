angular.module('zibzoo.vendors.factory', [])
  .factory('vendors', ['$http', function ($http) {
    var vendors = {};

    vendors.tempData = [{
      id: 1,
      name: 'Burger Shop',
      cuisine: 'American',
      wait: 9,
    },
    {
      id: 2,
      name: 'Pasta Shop',
      cuisine: 'Italian?',
      wait: 15,
    },
    {
      id: 3,
      name: 'Soup Shop',
      cuisine: 'Soup',
      wait: 0,
    },
    {
      id: 4,
      name: 'Thai Shop',
      cuisine: 'Thai',
      wait: 60
    },
    {
      id: 5,
      name: 'Seafood Shop',
      cuisine: 'Seafood',
      wait: 90
    }];

    vendors.getVendors = function () {
      return $http({
        method: 'GET',
        url: 'api/vendors'
      })
        .then(function (res) {
          return res;
        }, function (res) {
          console.error('Error: ', res);
        });
    };

    return vendors;
  }]);
