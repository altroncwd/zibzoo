angular.module('zibzoo.merchant.menu.factory', [])
  .factory('menu', ['$http', '$stateParams', function ($http, $stateParams) {
    var menu = {};

    menu.items = [];

    menu.addItem = function (menuItem) {
      menu.items.unshift(menuItem);
    };

    menu.remove = function (index) {
      return menu.items.splice(index, 1);
    };

    menu.deleteMenuItem = function (menuItemId) {
      return $http({
        method: 'DELETE',
        url: 'api/vendor/menuItems',
        data: JSON.stringify(menuItemId)
      })
        .success(function (data) {
          return data;
        })
        .error(function (data, status) {
          console.error(
            JSON.stringify(data),
            JSON.stringify(status)
            );
        });
    };

    menu.saveMenuItem = function (menuItemObject) {
      return $http({
        method: 'POST',
        url: 'api/vendor/menuItems',
        data: JSON.stringify(menuItemObject)
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
