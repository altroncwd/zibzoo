angular.module('zibzoo.order', [])
  .controller('OrderFormController', ['$scope', '$modalInstance', 'vendor', 'item', 'User', function ($scope, $modalInstance, vendor, item, User) {
    $scope.item = item;
    $scope.quantity = 1;

    $scope.addToCart = function () {
      item.vendorId = vendor.id;
      item.quantity = $scope.quantity;

      User.addOrder(item);
      $scope.cancel();
    };

    $scope.increment = function () {
      ++$scope.quantity;
    };

    $scope.decrement = function () {
      if ($scope.quantity > 0) {
        --$scope.quantity;
      }
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }]);
