angular.module('zibzoo.vendors.directive', [])
  .directive('vendorsGrid', function () {
    return {
      restrict: 'E',
      scope: {
        vendors: "=",
        loading: "="
      },
      templateUrl: 'app/components/vendors/_vendors-grid.html'
    };
  });
