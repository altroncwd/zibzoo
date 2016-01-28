angular.module('zibzoo.cart', [])
  .controller('CartController', ['$scope', 'User', 'Socket', function ($scope, User, Socket) {
    $scope.cart = User.data.orders;

    $scope.groupOrders = function (orders) {
      _.chain(orders)
      .groupBy('vendor.id')
      .map(function(value, key) {
        console.log('value: ', value);
        console.log('key: ', key);
        // return {
        //   // type: key,
        //   // foods: _.pluck(value, 'food')
        //   console.log('value: ', value);
        //   console.log('key: ', key);
        // }
      })
      .value();
    }

    $scope.removeItem = function (index) {
      $scope.cart.splice(index, 1);
    };

    $scope.groupOrders(User.data.orders);
  }]);
