angular.module('zibzoo.navbar.directive', [])
  .directive('navbar', ['Auth', function (Auth) {
    return {
      restrict: 'E',
      templateUrl: 'app/components/navbar/_navbar.html',
      controller: function ($rootScope, $scope) {
        $scope.isAuth = Auth.isAuth;
        $scope.signin = Auth.openModal;
        $scope.signout = Auth.signout;
        $scope.items = Auth.currentUser.orders;

        $rootScope.$on('user:updated', function (event) {
          $scope.items = Auth.currentUser.orders;
        });
      }
    };
  }]);
