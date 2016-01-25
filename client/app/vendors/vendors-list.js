angular.module('zibzoo.vendors.list', [])
  .controller('VendorsListController', ['$scope', 'vendor', function ($scope, vendor) {
    $scope.vendors = vendor.tempData;
    $scope.selected;
    $scope.filter = function (cuisineType) {
      if (cuisineType) {
        $scope.selected = [cuisineType];
      }
    };
    $scope.getVendors = function () {
      var allVendors = {};
      vendor.getVendor(allVendors)
        .then(function (data) {
          $scope.vendors = data.data;
        })
        .catch(function (error) {
          $scope.status = error.status;
        });
    };
    $scope.getVendors();
  }]);
