angular.module('zibzoo.landing', [])
  .controller('LandingController', ['$scope', '$state', 'vendor', 'location', function ($scope, $state, vendor, location) {
    $scope.location = location.data;
    $scope.vendors = vendor.tempData;

    $scope.findVendors = function () {
      if ($scope.selectedPlace) {
        var latitude = $scope.selectedPlace.geometry.location.lat();
        var longitude = $scope.selectedPlace.geometry.location.lng();
        
        $state.go('vendors', { latlng: latitude + ',' + longitude });
      }
    };

    location.getCurrentLocation();
  }]);
