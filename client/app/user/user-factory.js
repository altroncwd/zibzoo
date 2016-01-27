angular.module('zibzoo.user.factory', [])
  .factory('User', ['$rootScope', '$http', function ($rootScope, $http) {
    var user = {};

    user.data = { orders: [],
                menuItems: []
                };

    user.setData = function (data) {
      angular.extend(user.data, data);
      $rootScope.$broadcast('user:updated');
    };

    user.addOrder = function (order) {
      user.data.orders.push(order);
      $rootScope.$broadcast('user:updated');
    };

    user.resetUser = function () {
      user.data = { orders: [] };
      $rootScope.$broadcast('user:updated');
    };

    return user;
  }]);
