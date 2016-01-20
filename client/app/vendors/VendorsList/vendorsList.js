angular.module('zibzoo.vendorsList', [])
  .controller('VendorsListController', ['$scope', 'vendors', function ($scope, vendors) {
    $scope.vendors = vendors.tempData;
  }]);
