angular.module('zibzoo.order', [])
  .controller('OrderFormController', ['$scope', '$modalInstance', 'item', 'User', function ($scope, $modalInstance, item, User) {
    $scope.item = item;
    $scope.quantity = 1;

    $scope.addToCart = function () {
      var order = {
        item: $scope.item,
        quantity: $scope.quantity
      }

      User.data.orders.push(order);
      $modalInstance.close();
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

    $scope.increment = function () {
      ++$scope.quantity;
    };

    $scope.decrement = function () {
      if ($scope.quantity > 0) {
        --$scope.quantity;
      }
    };
  }]);
