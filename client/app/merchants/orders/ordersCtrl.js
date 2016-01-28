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

    $scope.finishedOrder = function (index, userId) {
      // Socket.emit('order finished', userId);     // refactor for email notification instead
      // console.log('index : ', index, 'id : ', userId);

      Order.splice(index, 1);
    };

    var listenOn = $stateParams.merchantId.toString();

    Socket.on(listenOn, function (newOrder) {
      Order.push(newOrder);
    });

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
