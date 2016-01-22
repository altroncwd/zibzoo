angular.module('zibzoo.menuform.directive', [])
  .directive('menuForm', function () {
    return {
      restrict: 'E',
      templateUrl: 'app/merchants/menu/menu-form.html',
      scope: {
        menu: '='
      },
      controller: function ($scope) {
        $scope.addItem = function (food, price, calories, description, prepTime) {
          $scope.menu.addItem(food, price, calories, description, prepTime);
        };
        console.log($scope.menu);
        $scope.saveMenuItems = function (menuItems) {
          var allItems = {
            items: menuItems
          };
          $scope.menu.saveMenu(allItems)
            .then(function (data) {
              console.log(data);
            })
            .catch(function (error) {
              $scope.status = error.status;
            });
        };

      }
    };
  });
