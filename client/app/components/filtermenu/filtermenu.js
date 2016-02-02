angular.module('zibzoo.filtermenu.directive', [])
  .directive('filtermenu', function () {
    return {
      restrict: 'E',
      templateUrl: 'app/components/filtermenu/_filtermenu.html',
      controller: function ($rootScope) {
        $rootScope.selected;

        $rootScope.filter = function (cuisine) {
          $rootScope.selected = (cuisine) ? [cuisine] : [];
        };
      }
    };
  });
