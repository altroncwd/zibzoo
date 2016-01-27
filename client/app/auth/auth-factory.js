angular.module('zibzoo.auth.factory', [])
  .factory('Auth', ['$rootScope', '$http', '$state', '$window', '$modal', 'User', function ($rootScope, $http, $state, $window, $modal, User) {
    var auth = {};

    auth.currentUser = User.data;

    $rootScope.$on('user:updated', function (event) {
      auth.currentUser = User.data;
    });

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

    auth.signout = function () {
      User.resetUser();

      $window.localStorage.removeItem('com.zibzoo');
      $window.localStorage.removeItem('_id');
      $state.go('landing');
    };

    auth.isAuth = function () {
      return !!$window.localStorage.getItem('com.zibzoo');
    };

    auth.openModal = function () {
      $modal.open({
        templateUrl: 'app/auth/_auth-form.html',
        controller: 'AuthController'
      });
    };

    auth.setUser = function (data) {
      User.setData(data);
    };

    return auth;
  }]);
