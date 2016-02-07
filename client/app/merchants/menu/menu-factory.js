angular.module('zibzoo.merchant.menu.factory', [])
  .factory('menu', ['$http', '$stateParams', 'User', '$q', 'Socket', function ($http, $stateParams, User, $q, Socket) {
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

    menu.update = function (propsToUpdate) {
      Socket.emit('updateStock', propsToUpdate);
    };

    menu.saveMenu = function (toBeUpdatedArray) {
      var promises = [];
      toBeUpdatedArray.forEach(function (menuItem) {
        var propsToUpdate = {
          _id: menuItem._id,
          propertiesToUpdate: {
            index: menuItem.index,
            section: menuItem.section,
            sectionIndex: menuItem.sectionIndex
          }
        };
        var response = menu.update(propsToUpdate);
        promises.push(response);
      });
      return $q.all(promises);
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
