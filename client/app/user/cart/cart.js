angular.module('zibzoo.cart', [])
  .controller('CartController', ['$scope', 'User', 'Socket', function ($scope, User, Socket) {
    $scope.cart = User.data.orders;

    $scope.removeItem = function (index) {
      $scope.cart.splice(index, 1);
    };
  }]);
