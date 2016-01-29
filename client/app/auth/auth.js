angular.module('zibzoo.auth', [])
  .controller('AuthController', ['$rootScope', '$scope', '$window', '$state', '$modalInstance', 'Auth', function ($rootScope, $scope, $window, $state, $modalInstance, Auth) {
    $scope.user = Auth.currentUser;
    $scope.error = null;

    $rootScope.$on('user:updated', function (event) {
      $scope.user = Auth.currentUser;
    });

    $scope.signin = function (data, userType) {
      data.isVendor = (userType === 'vendors');
      Auth.signin(data, userType)
        .then(function (user) {
          Auth.setUser(user);
          $scope.cancel();
          $window.localStorage.setItem('com.zibzoo', user.token);
          $scope.redirectUser(user);
        })
        .catch(function (error) {
          $scope.error = error.data;
        });
    };

    $scope.signup = function (data) {
      var userType = (data.isVendor) ? 'vendors' : 'customer';
      Auth.signup(data, userType)
        .then(function (user) {
          Auth.setUser(user);
          $scope.cancel();
          $window.localStorage.setItem('com.zibzoo', user.token);
          $scope.redirectUser(user);
        })
        .catch(function (error) {
          $scope.error = error.data.error;
        });
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

    $scope.redirectUser = function (user) {
      if (user.isVendor) {
        $state.go('orders', { merchantId: user._id });
      }
    };
  }]);
