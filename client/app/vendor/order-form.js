angular.module('zibzoo.vendor.orderform', [])
  .controller('OrderFormController', ['$scope', '$modalInstance', 'item', function ($scope, $modalInstance, item) {
    $scope.item = item;
    $scope.quantity = 1;

    $scope.addToCart = function () {
      console.log('Item ordered: ', $scope.item);
      console.log('Quantity ordered: ', $scope.quantity);
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
