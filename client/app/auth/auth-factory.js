angular.module('zibzoo.auth.factory', [])
  .factory('Auth', ['$http', '$state', '$window', 'User', function ($http, $state, $window, User) {
    var auth = {};

    auth.currentUser = User.data;

    auth.signin = function (user) {
      return $http({
        method: 'POST',
        url: '/api/user/signin',
        data: user
      })
      .then(function (res) {
        return res.data;
      });
    };

    auth.signup = function (user) {
      return $http({
        method: 'POST',
        url: '/api/user/signup',
        data: user
      })
      .then(function (res) {
        return res.data;
      });
    };

    auth.isAuth = function () {
      return !!$window.localStorage.getItem('com.zibzoo');
    };

    auth.signout = function () {
      User.clearUser();
      $window.localStorage.removeItem('com.zibzoo');
      $state.go('landing');
    };

    return auth;
  }]);
