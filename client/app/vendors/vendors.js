angular.module('zibzoo.vendors', [])
  .controller('VendorsController', ['$scope', '$stateParams', 'vendor', 'location', function ($scope, $stateParams, vendor, location) {
    $scope.location = location.data;
    $scope.vendors = [];
    $scope.loading = true;
    $scope.map = {
      center: {
        latitude: 37.7874963,
        longitude: -122.4020974
      },
      zoom: 15
    };

    $scope.searchVendors = function (params) {
      vendor.searchVendors(params)
        .then(function (vendors) {
          $scope.vendors = vendors;  
          $scope.loading = false;
        })
        .catch(function (error) {
          console.log('error: ', error);
        });
    };

    location.setLocation($stateParams.latlng, function (location) {
      $scope.map.center.latitude = location.latitude;
      $scope.map.center.longitude = location.longitude;
      $scope.$apply();

      $scope.searchVendors({
        latitude: location.latitude,
        longitude: location.longitude
      });
    });
  }]);
