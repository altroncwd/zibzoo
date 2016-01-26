angular.module('zibzoo.user.factory', [])
  .factory('User', ['$rootScope', '$http', function ($rootScope, $http) {
    var user = {};

    user.data = { orders: [] };

    user.setData = function (data) {
      data.orders = user.data.orders;
      user.data = data;
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
