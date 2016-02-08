angular.module('zibzoo.landing', [])
  .controller('LandingController', ['$scope', '$state', 'vendor', 'location', function ($scope, $state, vendor, location) {
    $scope.location = null;
    $scope.vendors = [];
    $scope.cuisines = [];
    $scope.loading = true;

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
          $scope.loading = false;
          $scope.vendors.forEach(function (vendorObj) {
            if ($scope.cuisines.indexOf(vendorObj.cuisine) === -1) {
              $scope.cuisines.push(vendorObj.cuisine);
            }
          });
        })
        .catch(function (error) {
          $scope.searchError = error.status;
        });
    };

    location.getCurrentLocation(function (location) {
      $scope.location = location;
      $scope.$apply();

      $scope.searchVendors({
        latitude: location.latitude,
        longitude: location.longitude
      });
    });
  }]);
