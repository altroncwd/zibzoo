angular.module('zibzoo.merchant.order', [])
  .controller('MerchantOrdersController', ['$scope', 'Order', 'Socket', '$stateParams', function ($scope, Order, Socket, $stateParams) {
    $scope.ordersList = Order;

    $scope.itemFinished = function (currentOrder, index, parentIndex) {
      // console.log(currentOrder, index, parentIndex);
      currentOrder.food.splice(index, 1);
      if (currentOrder.food.length === 0) {
        $scope.finishedOrder(parentIndex, currentOrder.ID);
      }
    };

    $scope.finishedOrder = function (index, order) {
      // console.log('index : ', index, 'ID : ', order.ID);
      // console.log('username aka email : ', order.username);
      Socket.emit('order finished', order);
      Order.callDbOrderFinished(order); // call to update the db
      Order.splice(index, 1);
      // set up a db call place the finished order in the db
    };

    var listenOn = $stateParams.merchantId.toString();
            // listenOn should be the merchants ID number
    Socket.on(listenOn, function (newOrder) {
      console.log('made it back to the client');
      newOrder.orderNumber = Order.total++;
      Order.push(newOrder);
      // set the total to local storage to persist
    });

  }]);
    /* -----------------NOTE's To Self-----------------
     state params is basiclly info in the url, currently its an object containing a merchantId: (number)
    --------------------------------------------------- */
