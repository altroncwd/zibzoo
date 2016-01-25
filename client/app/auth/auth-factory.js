angular.module('zibzoo.auth.factory', [])
  .factory('Auth', ['$http', '$state', '$window', '$modal', 'User', function ($http, $state, $window, $modal, User) {
    var auth = {};

    auth.currentUser = User.data;

    auth.open = function () {
      $modal.open({
        templateUrl: 'app/auth/_auth-form.html',
        controller: 'AuthController'
      });
    };

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
