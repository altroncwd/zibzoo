angular.module('zibzoo.vendors', [])
  .controller('VendorsController', ['$rootScope', '$scope', '$stateParams', 'vendor', 'location', function ($rootScope, $scope, $stateParams, vendor, location) {
    $scope.location = location.data;
    $scope.vendors = vendor.tempData;
    $scope.map = { 
      center: { 
        latitude: 37.7874963, 
        longitude: -122.4020974 
      }, 
      zoom: 15
    };

    $scope.getVendors = function (params) {
      vendor.getVendors(params)
        .then(function (vendors) {
          vendor.setData($scope, vendors.data);
        })
        .catch(function (error) {
          $scope.status = error.status;
        });
    };

    location.setLocation($stateParams.latlng, function (location) {
      $scope.map.center.latitude = location.latitude;
      $scope.map.center.longitude = location.longitude;

      // $scope.getVendors({
      //   latitude: location.latitude,
      //   longitude: location.longitude
      // });
    });
  }]);
