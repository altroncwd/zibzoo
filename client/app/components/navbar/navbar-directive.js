angular.module('zibzoo.navbar.directive', [])
  .directive('navbar', ['Auth', function (Auth) {
    return {
      restrict: 'E',
      templateUrl: 'app/components/navbar/_navbar.html',
      controller: function ($rootScope, $scope) {
        $scope.user = Auth.currentUser;
        $scope.isAuth = Auth.isAuth;
        $scope.signin = Auth.openModal;
        $scope.signout = Auth.signout;

        $rootScope.$on('user:updated', function (event) {
          $scope.user = Auth.currentUser;
        });
      }
    };
  }]);
