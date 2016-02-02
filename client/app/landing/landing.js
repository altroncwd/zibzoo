angular.module('zibzoo.landing', [])
  .controller('LandingController', ['$rootScope', '$scope', 'vendor', 'geolocation', function ($rootScope, $scope, vendor, geolocation) {
    geolocation.getLocation();
    $scope.geolocation = geolocation.data;
    $scope.vendors = vendor.tempData;
  }]);
