angular.module('zibzoo.landing', [])
  .controller('LandingController', ['$scope', '$state', 'vendor', 'location', function ($scope, $state, vendor, location) {
    $scope.location = null;
    $scope.vendors = [];

    $scope.findVendors = function () {
      if ($scope.selectedPlace) {
        var latitude = $scope.selectedPlace.geometry.location.lat();
        var longitude = $scope.selectedPlace.geometry.location.lng();
        
        $state.go('vendors', { latlng: latitude + ',' + longitude });
      }
    };

    $scope.searchVendors = function (params) {
      vendor.searchVendors(params)
        .then(function (vendors) {
          $scope.vendors = vendors;
        })
        .catch(function (error) {
          console.log('error: ', error);
        });
    };

    $scope.getVendors = function (params) {
      vendor.getVendors(params)
        .then(function (vendors) {
          $scope.vendors = vendors;
        })
        .catch(function (error) {
          console.log('error: ', error);
        });
    };

    location.getCurrentLocation(function (location) {
      $scope.location = location;
      $scope.$apply();
      
      // $scope.searchVendors({
      //   latitude: location.latitude,
      //   longitude: location.longitude
      // });

      $scope.getVendors({});
    });
  }]);
