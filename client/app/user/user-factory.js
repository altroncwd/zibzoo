angular.module('zibzoo.user.factory', [])
  .factory('User', ['$rootScope', '$http', '$window', function ($rootScope, $http, $window) {
    var user = {};

    user.data = {
      orders: [],
      menuItems: []
    };

    user.setData = function (data) {
      angular.extend(user.data, data);
      $window.localStorage.setItem('_id', JSON.stringify(user.data));
      $rootScope.$broadcast('user:updated');
    };

    user.addOrder = function (order) {
      user.data.orders.push(order);
      $rootScope.$broadcast('user:updated');
    };

    user.resetUser = function () {
      user.data = {
        orders: [],
        menuItems: []
      };
      $rootScope.$broadcast('user:updated');
    };

    user.getFromLocal = function () {
      user.data = JSON.parse($window.localStorage.getItem('_id'));
    };

    user.setNewToLocal = function () {
      $window.localStorage.removeItem('_id');
      $window.localStorage.setItem('_id', JSON.stringify(user.data));
    };

    return user;
  }]);
