angular.module('zibzoo.vendors.factory', [])
  .factory('vendors', ['$http', function ($http) {
    var vendors = {};

    vendors.tempData = [{
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

    vendors.getVendors = function () {
      return $http({
        method: 'GET',
        url: 'api/vendors'
      })
      .success(function (data, status, headers, config) {
        return data;
      })
      .error(function (data, status) {
        console.error(
          JSON.stringify(data),
          JSON.stringify(status)
          );
      });
    };

    return vendors;
  }]);
