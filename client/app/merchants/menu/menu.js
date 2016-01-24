angular.module('zibzoo.merchant.menu', [])
  .controller('MerchantMenuController', ['$scope', 'menu', 'vendor', '$stateParams', function ($scope, menu, vendor, $stateParams) {

    $scope.menu = menu;
    $scope.vendor = vendor;

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
      angular.extend(menuItem, { vendorId: $stateParams.merchantId });
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

    $scope.getMenu = function (merchantId) {
      $scope.menu.items = [];
      vendor.getVendor(merchantId)
        .then(function (data) {
          if (data.data) {
            $scope.menu.items = data.data.menuItems;
          }
        })
        .catch(function (error) {
          $scope.status = error.status;
        });
    };
    $scope.clearItem();
    $scope.getMenu($stateParams.merchantId);
  }]);
