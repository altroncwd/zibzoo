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

    var listenOn = $stateParams.merchantId.toString();

    Socket.on(listenOn, function (newOrder) {
      incomingOrders(newOrder);
    });

    var incomingOrders = function (orderObj) {
      order.push(orderObj);
    };

    // setInterval(function () {  // testing function
    //   console.log('PLACING A NEW ORDER');
    //   Socket.emit('incoming order', {
    //     vendorId: listenOn,
    //     name: 'Benjamin Button',
    //     ID: 123425667,
    //     food: [
    //       { item: 'burger',
    //         quantity: 25
    //       }
    //     ]
    //   });
    // }, 4000);

  }]);
    /* -----------------NOTE's To Self-----------------
     state params is basiclly info in the url, currently its an object containing a merchantId: (number)
    --------------------------------------------------- */
