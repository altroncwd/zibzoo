angular.module('zibzoo.auth', [])
  .controller('AuthController', ['$scope', '$window', '$state', 'Auth', 'User', function ($scope, $window, $state, Auth, User) {
    $scope.user = User.data;
    $scope.error = null;

    $scope.signin = function () {

    };

    $scope.signup = function () {
      
    };
  }]);
