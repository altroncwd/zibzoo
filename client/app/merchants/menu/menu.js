angular.module('zibzoo.merchant.menu', ['dndLists'])
  .controller('MerchantMenuController', ['$scope', 'menu', 'User', '$stateParams', 'vendor', function ($scope, menu, User, $stateParams, vendor) {

    User.getFromLocal();

    $scope.selectSections = menu.sections;
    $scope.vendor = User.data;
    $scope.menu = menu;
    $scope.menu.items = User.data.menuItems || [];

    $scope.menuItem;

    $scope.models = {
      select: null,
      sectionType: ['section'],
      dropzones: {
        menu: [
          { section: 'Lunch',
            type: 'section',
            allowedTypes: ['menuItem'],
            container: [
              {
                name: 'pizza1',
                description: '',
                price: 5,
                section: {
                  section: '',
                  sectionIndex: 0,
                },
                index: 0,
                inStock: true,
                type: 'menuItem',
                calories: 0,
                isGlutenFree: false,
                isVegan: true,
                isDairyFree: false,
                isVegetarian: false
              }
            ] },
          { section: 'Appetizers',
            type: 'section',
            allowedTypes: ['menuItem'],
            container: [
              {
                name: 'pizza2',
                description: '',
                price: 7,
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
              }
            ] },
          { section: 'Entrees',
            type: 'section',
            allowedTypes: ['menuItem'],
            container: [
              {
                name: 'pizza3',
                description: '',
                price: 8,
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
              }
            ] },
          { section: 'Desserts',
            type: 'section',
            allowedTypes: ['menuItem'],
            container: [
              {
                name: 'pizza4',
                description: '',
                price: 11,
                section: {
                  section: '',
                  sectionIndex: 0,
                },
                index: 0,
                inStock: true,
                type: 'menuItem',
                calories: 0,
                isGlutenFree: false,
                isVegan: true,
                isDairyFree: false,
                isVegetarian: false
              }
            ] },
          { section: 'Drinks',
            type: 'section',
            allowedTypes: ['menuItem'],
            container: [
              {
                name: 'pizza5',
                description: '',
                price: 90,
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
                isVegetarian: true
              }
            ] },

        ]
      }
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

    // THIS IS FOR DND ONLY MENUITEMS NOT MENU SECTIONS
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

    // THIS IS FOR DND ONLY FOR MENUITEM NOT MENU SECTIONS
    // $scope.setMenuToDnD($scope.menu.items);

  }]);
