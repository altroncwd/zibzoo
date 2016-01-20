angular.module('zibzoo.vendors.list', [])
  .controller('VendorsListController', ['$scope', 'vendors', function ($scope, vendors) {
    $scope.vendors = vendors.tempData;
    $scope.getVendors = function () {
      vendors.getVendors()
        .then(function (data) {
          $scope.vendors = data;
        })
        .catch(function (error) {
          console.error('Error getting Vendors: ', error);
        });
    };
    $scope.getVendors();
  }]);
