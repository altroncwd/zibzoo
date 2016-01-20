angular.module('zibzoo.vendorList.factory', [])
  .factory('vendors', ['$http', function ($http) {
    var vendors = {};

    vendors.getVendors = function (params) {
      return $http({
        method: 'GET',
        url: 'api/vendors',
        params: params
      })
        .then(function (res) {
          return res;
        }, function (res) {
          console.error('Error: ', res);
        });
    };

    return vendors;
  }]);
