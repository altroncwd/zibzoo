angular.module('zibzoo.auth', [])
  .controller('AuthController', ['$scope', '$window', '$state', 'Auth', 'User', '$modalInstance', function ($scope, $window, $state, Auth, User, $modalInstance) {
    $scope.user = User.data;
    $scope.error = null;

    $scope.signin = function () {

    };

    $scope.signup = function () {
      
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }]);
