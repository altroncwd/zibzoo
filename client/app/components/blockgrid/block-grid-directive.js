angular.module('zibzoo.blockgrid.directive', [])
  .directive('blockgrid', function () {
    return {
      restrict: 'E',
      templateUrl: 'app/components/blockgrid/_blockgrid.html',
      require: ['^VendorListController', '^LandingController']
    };
  });
