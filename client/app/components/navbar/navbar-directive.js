angular.module('zibzoo.navbar.directive', [])
  .directive('navbar', ['Auth', function (Auth) {
    return {
      restrict: 'E',
      templateUrl: 'app/components/navbar/_navbar.html',
      controller: function ($scope) {
        $scope.isAuth = Auth.isAuth;
        $scope.signin = Auth.open;
        $scope.signout = Auth.signout;
        $scope.items = Auth.currentUser.orders;
      }
    };
  }]);
