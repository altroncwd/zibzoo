angular.module('zibzoo.merchant.menu.factory', [])
  .factory('menu', ['$http', '$stateParams', 'User', function ($http, $stateParams, User) {
    var menu = {};

    menu.items = User.data.menuItems;

    menu.sections = ['', 'Appetizers', 'Entrees', 'Desserts', 'Drinks'];

    menu.addItem = function (menuItem) {
      User.data.menuItems.unshift(menuItem);
      User.setNewToLocal();
    };

    menu.remove = function (menuItem) {
      var menuItemsIndex = 0;
      for (var i = 0; i < menu.items.length; i++) {
        if (menu.items[i].name === menuItem.name) {
          menuItemsIndex = i;
        }
      }
      return menu.items.splice(menuItemsIndex, 1);
    };

    menu.deleteMenuItem = function (menuItemId) {
      return $http({
        method: 'DELETE',
        url: 'api/menu',
        params: menuItemId
      })
        .success(function (data) {
          return data;
        })
        .error(function (data, status) {
          console.error(
            data,
            status
            );
        });
    };

    menu.saveMenuItem = function (menuItemObject) {
      return $http({
        method: 'POST',
        url: 'api/menu',
        data: menuItemObject
      })
        .success(function (data, status, headers, config) {
          return data;
        })
        .error(function (data, status) {
          console.error(
            JSON.stringify(data),
            JSON.stringify(status)
            );
        });
    };

    return menu;
  }]);
