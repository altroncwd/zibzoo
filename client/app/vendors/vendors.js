angular.module('zibzoo.vendors', [])
  .controller('VendorsController', ['$scope', 'vendor', function ($scope, vendor) {
    $scope.vendors = vendor.tempData;

    $scope.getVendors = function (params) {
      vendor.getVendors(params)
        .then(function (vendors) {
          vendor.setData($scope, vendors.data);
        })
        .catch(function (error) {
          $scope.status = error.status;
        });
    };

    // $scope.getVendors({});
  }]);
