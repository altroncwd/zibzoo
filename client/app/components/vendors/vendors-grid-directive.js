angular.module('zibzoo.vendors.directive', [])
  .directive('vendorsGrid', function () {
    return {
      restrict: 'E',
      templateUrl: 'app/components/vendors/_vendors-grid.html',
      require: ['^VendorsListController', '^LandingController']
    };
  });
