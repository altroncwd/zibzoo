angular.module('zibzoo.merchant.order', [])
  .controller('MerchantOrdersController', ['$scope', 'order', 'Socket', function ($scope, order, Socket) {
    $scope.ordersList = order;

    $scope.itemFinished = function (currentOrder, index, parentIndex) {
      // console.log(currentOrder, index, parentIndex);
      currentOrder.food.splice(index, 1);
      // this will check if there are any other items left to make on this order, if there are none, it will automatically remove the whole order.
      if (currentOrder.food.length === 0) {
        $scope.finishedOrder(parentIndex, currentOrder.ID);
      }
    };

    $scope.finishedOrder = function (index, userId) {
      Socket.emit('order finished', userId, 'testing');
      // console.log('index : ', index, 'id : ', userId);
      order.splice(index, 1);
    };

    // TODO: incomingOrders is defined but never used
    // var incomingOrders = function (orderObj) {
    //   order.push(orderObj);
    // };


  }]);

