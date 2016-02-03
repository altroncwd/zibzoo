angular.module('zibzoo.merchant.menu', ['dndLists'])
  .controller('MerchantMenuController', ['$scope', 'menu', 'User', '$stateParams', 'vendor', function ($scope, menu, User, $stateParams, vendor) {

    User.getFromLocal();

    $scope.selectSections = menu.sections;
    $scope.vendor = User.data;
    $scope.menu = menu;
    $scope.menu.items = User.data.menuItems || [];
    $scope.existingSections = [];

    $scope.menuItem;

    $scope.models = {
      select: null,
      sectionType: ['section'],
      dropzones: {
        menu: []
      }
    };


    $scope.setSections = function () {
      var sections = [];
      $scope.existingSections = [];
      $scope.menu.items.forEach(function (menuItem) {
        if (sections[menuItem.sectionIndex]) {
          sections[menuItem.sectionIndex].container.push(menuItem);
          sections[menuItem.sectionIndex].container.sort(function (a, b) {
            return a.index - b.index;
          });
        } else {
          sections[menuItem.sectionIndex] = {
            section: menuItem.section,
            type: 'section',
            allowedTypes: ['menuItem'],
            container: [menuItem]
          };
          $scope.existingSections[menuItem.sectionIndex] = menuItem.section;
        }
      });
      return sections;
    };

    $scope.setMenuToDnD = function () {
      $scope.models.dropzones.menu = $scope.setSections();
    };

    $scope.clearItem = function () {
      $scope.menuItem = {
        name: '',
        description: '',
        price: '',
        section: '',
        sectionIndex: 0,
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





    $scope.saveMenu = function () {
      var toUpdate = [];
      var menuSection = $scope.models.dropzones.menu;
      for (var i = 0; i < menuSection.length; i++) {
        for (var j = 0; j < menuSection[i].container.length; j++) {
          menuSection[i].container[j].index = j;
          menuSection[i].container[j].section = menuSection[i].section;
          menuSection[i].container[j].sectionIndex = i;
          toUpdate.push(menuSection[i].container[j]);
        }
      }
      $scope.menu.saveMenu(toUpdate)
        .then(function (success) {
          console.log('success', success);
        },
          function (error) {
            console.error('error', error);
          });
    };



    $scope.deleteMenuItem = function (menuItem) {
      var toDelete = $scope.menu.remove(menuItem);
      User.setNewToLocal();
      $scope.setMenuToDnD();
      $scope.menu.deleteMenuItem({ _id: toDelete[0]._id })
        .then(function (data) {
          $scope.deleteStatus = data.status;
        })
        .catch(function (error) {
          $scope.deleteStatus = error.status;
        });
    };





    $scope.saveMenuItem = function (menuItem) {
      $scope.itemExists = false;
      if ($scope.existingSections.indexOf(menuItem.section) === -1) {
        $scope.existingSections.push(menuItem.section);
      }
      $scope.models.dropzones.menu.forEach(function (menuSection) {
        if (menuSection.section === menuItem.section) {
          menuItem.index = menuSection.container.length;
        }
        for (var i = 0; i < menuSection.container.length; i++) {
          if (menuSection.container[i].name === menuItem.name) {
            $scope.itemExists = true;
            break;
          }
        }
      });
      if ($scope.itemExists) {
        return;
      }
      menuItem.sectionIndex = $scope.existingSections.indexOf(menuItem.section);
      angular.extend(menuItem, { vendorId: $stateParams.merchantId });
      $scope.menu.saveMenuItem(menuItem)
        .then(function (data) {
          $scope.menu.addItem(data.data);
          $scope.setMenuToDnD();
          $scope.saveStatus = data.status;
        })
        .catch(function (error) {
          $scope.saveStatus = error.status;
        });
      $scope.clearItem();
    };





    if ($scope.menu.items) {
      $scope.setMenuToDnD();
    }
    $scope.clearItem();

  }]);
