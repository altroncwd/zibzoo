angular.module('zibzoo.merchant.menu', [])
  .controller('MerchantMenuController', ['$scope', 'menu', 'User', '$stateParams', function ($scope, menu, User, $stateParams) {

    $scope.vendor = User.data;
    $scope.menu = menu;
    $scope.menu.items = User.data.menuItems || [];

    $scope.menuItem;

    $scope.clearItem = function () {
      $scope.menuItem = {
        name: '',
        description: '',
        price: '',
        inStock: true,
        calories: 0,
        isGlutenFree: false,
        isVegan: false,
        isDairyFree: false,
        isVegetarian: false
      };
    };

    $scope.toggle = function (model) {
      model = !model;
    };

    $scope.deleteMenuItem = function (menuItemIndex) {
      var toDelete = $scope.menu.remove(menuItemIndex);
      $scope.menu.deleteMenuItem({ _id: toDelete._id })
        .then(function (data) {
          $scope.deleteStatus = data.status;
        })
        .catch(function (error) {
          $scope.deleteStatus = error.status;
        });
    };

    $scope.saveMenuItem = function (menuItem) {
      angular.extend(menuItem, { _id: $stateParams.merchantId });
      $scope.menu.addItem(menuItem);
      $scope.clearItem();
      $scope.menu.saveMenuItem(menuItem)
        .then(function (data) {
          $scope.saveStatus = data.status;
        })
        .catch(function (error) {
          $scope.saveStatus = error.status;
        });
    };
    $scope.clearItem();
  }]);
