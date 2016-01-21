angular.module('zibzoo.cart', [])
  .controller('CartController', ['$scope', function ($scope) {
    $scope.cart = [
      {
        name: 'orange',
        price: 5,
        qty: 800
      },
      {
        name: 'banana',
        price: 0.30,
        qty: 11
      },
      {
        name: 'honey',
        price: 300,
        qty: 18
      },
      {
        name: 'chex mix',
        price: 5,
        qty: 1
      },
      {
        name: 'oreo',
        price: 0.50,
        qty: 12
      },
      {
        name: 'rent',
        price: 'too damn high',
        qty: 0
      },
      {
        name: 'bagel',
        price: 17000,
        qty: 72
      }
    ];
  }]);
