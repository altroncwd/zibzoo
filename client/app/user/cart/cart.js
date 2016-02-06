angular.module('zibzoo.cart', [])
  .controller('CartController', ['$scope', '$modal', 'User', 'Socket', function ($scope, $modal, User, Socket) {
    $scope.cart = User.data.orders;
    $scope.total = getTotal();

    $scope.removeItem = function (index) {
      $scope.cart.splice(index, 1);
    };

    $scope.checkout = function () {
      $modalInstance = $modal.open({
        templateUrl: 'app/user/cart/_checkout.html',
        controller: 'CartController'
      });
    };

    $scope.charge = function () {
      var orders = {
        _id: User.data._id,
        stripeId: User.data.stripeId,
        email: User.data.email,
        orders: _.groupBy(User.data.orders, 'vendor._id')
      };
      console.log(orders.orders);
      for(var key in orders.orders) {
        orders.orders[key].forEach(function (orderItem) {

          delete orderItem.item['$$hashKey'];
          delete orderItem['$$hashKey'];
        });
      }

      Socket.emit('charge', orders);

      Socket.on('chargeResponse', function (data) {

        $scope.cancel();
        console.log("CHARGE HAPPENED!", data);
      });
      // User.charge(orders)
      //   .then(function (result) {
      //     User.data.orders.length = 0;
      //     // Socket.emit(result);
      //   })
      //   .catch(function (error) {
      //     console.log('error: ', error);
      //   });
    };

    function getTotal() {
      return _.reduce(User.data.orders, function (total, order) {
        return total + order.item.price;
      }, 0);
    }

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }]);
