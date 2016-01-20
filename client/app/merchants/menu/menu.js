angular.module('zibzoo.merchant.menu', [])
  .controller('MerchantMenuController', ['$scope', 'menu', function ($scope, menu) {
    $scope.menu = menu;
  }]);
