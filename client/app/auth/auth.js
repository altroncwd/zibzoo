angular.module('zibzoo.auth', [])
  .controller('AuthController', ['$scope', '$window', '$state', 'Auth', 'User', '$modalInstance', function ($scope, $window, $state, Auth, User, $modalInstance) {
    $scope.user = User.data;
    $scope.error = null;

    $scope.signin = function (data) {
      Auth.signin(data)
        .then(function (user) {
          User.data = user;
          $window.localStorage.setItem('com.zibzoo', user.token);

          $scope.cancel();
          $scope.routeUser(user);
        })
        .catch(function (error) {
          $scope.error = error.data.error;
        });
    };

    $scope.signup = function (data) {
      Auth.signup(data)
        .then(function (user) {
          console.log('user: ', user);

          User.data = user;
          $window.localStorage.setItem('com.zibzoo', user.token);

          $scope.cancel();
          $scope.routeUser(user);
        })
        .catch(function (error) {
          $scope.error = error.data.error;
        });
    };

    $scope.routeUser = function (user) {
      (user.isVendor) ? $state.go('merchant', { merchantId: user.id })
                      : $state.go('landing');
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }]);
