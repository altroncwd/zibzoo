angular.module('zibzoo.user.factory', [])
  .factory('User', ['$http', function($http) {
    var user = {};

    user.data = {
      orders: []
    };

    return user;
  }]);
