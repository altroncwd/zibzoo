angular.module('zibzoo.menuform.directive', [])
  .directive('menuForm', function() {
    return {
      restrict: 'E',
      templateUrl: 'app/merchants/menu/menu-form.html',
      scope: {
        menu: "="
      },
      controller: function($scope) {
        $scope.addItem = function(food, price, calories, description, prepTime) {
          $scope.menu.addItem(food, price, calories, description, prepTime);
        };

      }
    };
  });
