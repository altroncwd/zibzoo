angular.module('zibzoo.merchant.order', [])
  .controller('MerchantOrdersController', ['$scope', 'order', function ($scope, order) {
    $scope.ordersList = order;


  }]);

