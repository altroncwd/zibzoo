angular.module('zibzoo.cart', [])
  .controller('CartController', ['$scope', 'User', function ($scope, User) {
    $scope.cart = User.data.orders;
  }]);
