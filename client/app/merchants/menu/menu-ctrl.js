angular.module('zibzoo.merchant.menu', [])
  .controller('MerchantMenuController', ['$scope', 'menu', 'vendor', '$stateParams', function ($scope, menu, vendor, $stateParams) {

    $scope.menu = menu;

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

    $scope.deleteMenuItem = function (menuItemIndex) {
      var toDelete = $scope.menu.remove(menuItemIndex);
      $scope.menu.deleteMenuItem({ _id: toDelete })
        .then(function (data) {
          console.log(data);
        })
        .catch(function (error) {
          $scope.status = error.status;
        });
    };

    $scope.saveMenuItem = function (menuItem) {
      angular.extend(menuItem, { _id: $stateParams.merchantId });
      $scope.menu.addItem(menuItem);
      $scope.clearItem();
      $scope.menu.saveMenuItem(menuItem)
        .then(function (data) {
          console.log(data);
        })
        .catch(function (error) {
          $scope.status = error.status;
        });
    };

    $scope.getMenu = function (merchandId) {
      $scope.menu.items = [];
      vendor.getVendor($stateParams.merchantId)
        .then(function (data) {
          $scope.menu.items = data.data.menuItems;
        })
        .catch(function (error) {
          $scope.status = error.status;
        });
    };
    $scope.getMenu();
  }]);
