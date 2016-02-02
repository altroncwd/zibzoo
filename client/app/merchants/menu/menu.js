angular.module('zibzoo.merchant.menu', ['dndLists'])
  .controller('MerchantMenuController', ['$scope', 'menu', 'User', '$stateParams', 'vendor', function ($scope, menu, User, $stateParams, vendor) {

    User.getFromLocal();

    $scope.selectSections = menu.sections;
    $scope.vendor = User.data;
    $scope.menu = menu;
    $scope.menu.items = User.data.menuItems || [];

    $scope.menuItem;
    // console.log(User.data.menuItems);

    $scope.models = {
      select: null,
      sectionType: ['section'],
      dropzones: {
        menu: []
      }
    };

    $scope.setMenuToDnD = function () {
      $scope.models.dropzones.menu = $scope.setSections();
    };

    $scope.setSections = function () {
      var sections = [];
      $scope.menu.items.forEach(function (menuItem) {
        if (sections[menuItem.section.sectionIndex]) {
          sections[menuItem.section.sectionIndex].container.push(menuItem);
          sections[menuItem.section.sectionIndex].container.sort(function (a, b) {
            return a.index - b.index;
          });
        } else {
          sections[menuItem.section.sectionIndex] = {
            section: menuItem.section.section,
            type: 'section',
            allowedTypes: ['menuItem'],
            container: [menuItem]
          };
        }
      }
        );
      return sections;
    };

    $scope.clearItem = function () {
      $scope.menuItem = {
        name: '',
        description: '',
        price: '',
        section: {
          section: '',
          sectionIndex: 0,
        },
        index: 0,
        inStock: true,
        type: 'menuItem',
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
      console.log('this is the menuItem being saved', menuItem);
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

    $scope.setMenuToDnD();
    $scope.clearItem();

  }]);
