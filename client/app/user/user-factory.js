angular.module('zibzoo.user.factory', [])
  .factory('User', ['$rootScope', '$http', '$window', function ($rootScope, $http, $window) {
    var user = {};

    user.data = {
      orders: [],
      menuItems: []
    };

    user.setData = function (data) {
      if (user.data.confirmPassword) {
        delete user.data.confirmPassword;
      }
      delete user.data.password;
      angular.extend(user.data, data);
      $window.localStorage.setItem('_id', JSON.stringify(user.data));
      $rootScope.$broadcast('user:updated');
    };

    user.updateCustomer = function (customer) {
      return $http({
        method: 'PUT',
        url: 'api/customer/update',
        data: customer
      })
        .then(function (data) {
          return data;
        });
    };

    user.resetUser = function () {
      user.data = {
        orders: [],
        menuItems: []
      };
      $rootScope.$broadcast('user:updated');
    };

    user.addOrder = function (order) {
      user.data.orders.push(order);
      $rootScope.$broadcast('user:updated');
    };

    user.charge = function (orders) {
      return $http({
        method: 'POST',
        url: '/api/customer/charge',
        data: orders
      })
        .then(function (res) {
          return res.data;
        });
    };

    user.getFromLocal = function () {
      var data = JSON.parse($window.localStorage.getItem('_id'));
      if (isNaN(data.longitude) && isNaN(data.latitude)) {
        data.longitude = data.longitude;
        data.latitude = data.latitude;
      }
      user.data = data;
    };

    user.setNewToLocal = function () {
      $window.localStorage.removeItem('_id');
      $window.localStorage.setItem('_id', JSON.stringify(user.data));
    };

    user.objectDiff = function (version2, version1) {
      var diffUser = {};
      for (var key in version2) {
        if ((!Array.isArray(version2[key])) && (version2[key] !== version1[key] || !version1[key])) {
          diffUser[key] = version2[key];

        }
      }
      return diffUser;
    };

    return user;
  }]);
