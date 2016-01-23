angular.module('zibzoo.merchant.menu.factory', [])
  .factory('menu', ['$http', '$stateParams', function ($http, $stateParams) {
    var menu = {};

    menu.items = [];
    menu.createdItems = [];
    menu.removedItems = [];

    menu.addItem = function (menuItem) {
      angular.extend(menuItem, { merchantId: $stateParams.merchantId });
      // fix to add to createdItems
      menu.items.unshift(menuItem);
    };

    menu.remove = function (index) {
      // fix for removal from createdItems
      menu.removedItems.push(menu.items.splice(index, 1));
    };

    menu.saveMenu = function (menuItemsObject) {
      return $http({
        method: 'POST',
        url: 'api/vendors/menuItems',
        data: JSON.stringify(menuItemsObject)
      })
        .success(function (data, status, headers, config) {
          console.log(data);
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
