angular.module('zibzoo.merchant.order', [])
  .controller('MerchantOrdersController', ['$scope', 'order', 'Socket', '$stateParams', function ($scope, order, Socket, $stateParams) {
    $scope.ordersList = order;

    $scope.itemFinished = function (currentOrder, index, parentIndex) {
      // console.log(currentOrder, index, parentIndex);
      currentOrder.food.splice(index, 1);
      if (currentOrder.food.length === 0) {
        $scope.finishedOrder(parentIndex, currentOrder.ID);
      }
    };

    $scope.finishedOrder = function (index, userId) {
      Socket.emit('order finished', userId);
      // console.log('index : ', index, 'id : ', userId);
      order.splice(index, 1);
    };

    Socket.on($stateParams.merchantId, function (newOrder) {
      incomingOrders(newOrder);
    });

    var incomingOrders = function (orderObj) {
      order.push(orderObj);
    };


  }]);
    /* -----------------NOTE's To Self-----------------
     state params is basiclly info in the url, currently its an object containing a merchantId: (number)
    --------------------------------------------------- */
