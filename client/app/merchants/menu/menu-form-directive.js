angular.module('zibzoo.menuform.directive', [])
  .directive('menuForm', function () {
    return {
      restrict: 'E',
      templateUrl: 'app/merchants/menu/_menu-form.html',
      scope: {
        menu: '='
      },
      controller: function ($scope) {
        $scope.addItem = function () {
          $scope.menu.addItem();
        };
      }
    };
  });
