angular.module('zibzoo.merchant.order', [])
  .controller('MerchantOrdersController', ['$scope', 'Order', 'Socket', '$stateParams', '$window', function ($scope, Order, Socket, $stateParams, $window) {

    $scope.ordersList = Order.order;

    $scope.itemFinished = function (currentOrder, index, parentIndex) {
      currentOrder.food.splice(index, 1);
      if (currentOrder.food.length === 0) {
        $scope.finishedOrder(parentIndex, currentOrder.ID);
      }
    };

    $scope.finishedOrder = function (index, order) {
      Socket.emit('order finished', order);
      Order.callDbOrderFinished(order); // call to update the db
      Order.order.splice(index, 1);
      Order.setLocalStorage();
      // set up a db call place the finished order in the db
    };

    var listenOn = $stateParams.merchantId.toString();
            // listenOn should be the merchants ID number
    Socket.on(listenOn, function (newOrder) {
      newOrder.orderNumber = Order.order.total++;
      Order.order.push(newOrder);
      Order.setLocalStorage();
    });

  }]);
