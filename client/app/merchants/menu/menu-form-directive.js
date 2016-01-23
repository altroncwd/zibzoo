angular.module('zibzoo.menuform.directive', [])
  .directive('menuForm', function () {
    return {
      restrict: 'E',
      templateUrl: 'app/merchants/menu/menu-form.html',
      scope: {
        menu: '='
      },

      controller: function ($scope) {
        $scope.menuItem = {
          food: '',
          price: '',
          description: '',
          prepTime: '',
        };

        $scope.clearItem = function () {
          for (var key in $scope.menuItem) {
            if (key) {
              $scope.menuItem = '';
            }
          }
        };

        $scope.addItem = function (menuItem) {
          if ($scope.menuItem) {
            $scope.menu.addItem(menuItem);
            $scope.clearItem();
          }
        };

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
