angular.module('zibzoo.merchant.menu.factory', [])
  .factory('menu', ['$http', '$stateParams', 'User', function ($http, $stateParams, User) {
    var menu = {};

    menu.items = User.data.menuItems;

    menu.addItem = function (menuItem) {
      menu.items.unshift(menuItem);
    };

    menu.remove = function (index) {
      return menu.items.splice(index, 1);
    };

    menu.deleteMenuItem = function (menuItemId) {
      return $http({
        method: 'DELETE',
        url: 'api/menu',
        data: menuItemId
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
