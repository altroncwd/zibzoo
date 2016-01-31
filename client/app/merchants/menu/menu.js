angular.module('zibzoo.merchant.menu', ['dndLists'])
  .controller('MerchantMenuController', ['$scope', 'menu', 'User', '$stateParams', 'vendor', function ($scope, menu, User, $stateParams, vendor) {

    User.getFromLocal();

    $scope.selectSections = menu.sections;
    $scope.vendor = User.data;
    $scope.menu = menu;
    $scope.menu.items = User.data.menuItems || [];

    $scope.menuItem;

    $scope.models = {
      selected: null,
      lists: {}
    };

    $scope.clearItem = function () {
      $scope.menuItem = {
        name: '',
        description: '',
        price: '',
        section: '',
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

    $scope.setSection = function (section) {
      $scope.menuItem.section = section;
    };

    $scope.deleteMenuItem = function (menuItemIndex) {
      var toDelete = $scope.menu.remove(menuItemIndex);
      User.setNewToLocal();
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

    $scope.setMenuToDnD = function (menuItems) {
      menuItems.forEach(function (item) {
        if ($scope.models.lists[item.section]) {
          $scope.models.lists[item.section].push(item);
        } else {
          $scope.models.lists[item.section] = [item];
        }
      });
    };

    $scope.clearItem();

    $scope.setMenuToDnD($scope.menu.items);

  }]);
