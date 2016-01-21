angular.module('zibzoo.filterbox.directive', [])
  .directive('filterbox', function () {
    return {
      restrict: 'E',
      templateUrl: 'app/components/filterbox/_filterbox.html',
      require: '^VendorsListController'
    };
  });
