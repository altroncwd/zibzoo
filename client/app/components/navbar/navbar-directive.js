angular.module('zibzoo.navbar.directive', [])
  .directive('navbar', function() {
    return {
      restrict: 'E',
      templateUrl: 'app/components/navbar/_navbar.html',
      controller: function($scope, $rootScope) {
        $rootScope.isNavbarCollapsed = true;
      }
    };
  });