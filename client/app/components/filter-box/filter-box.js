angular.module('zibzoo.filter-box.directive', [])
  .directive('filterbox', function () {
    return {
      restrict: 'E',
      templateUrl: 'app/components/filter-box/_filter-box.html',
      require: '^VendorsListController'
    };
  });
