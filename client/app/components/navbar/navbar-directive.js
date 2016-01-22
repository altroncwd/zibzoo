angular.module('zibzoo.navbar.directive', [])
  .directive('navbar', ['Auth', '$modal', function(Auth, $modal) {
    return {
      restrict: 'E',
      templateUrl: 'app/components/navbar/_navbar.html',
      controller: function ($scope, $rootScope) {
        $scope.isAuth = Auth.isAuth;
        $scope.signout = Auth.signout;

        $scope.open = function () {
          $modal.open({
            templateUrl: 'app/auth/_auth-form.html',
            controller: 'AuthController',
            resolve: {
              user: function () {
                return {};
              }
            }
          });
        };
      }
    };
  }]);
