angular.module('zibzoo.vendors.list', [])
  .controller('VendorsListController', ['$scope', 'vendors', function ($scope, vendors) {
    $scope.vendors = vendors.tempData;
  }]);
