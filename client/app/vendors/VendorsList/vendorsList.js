angular.module('zibzoo.vendorsList', [])
  .controller('VendorsListController', ['$scope', function ($scope) {
    $scope.vendors = [{
      name: 'Burger Shop',
      cuisine: 'American',
      wait: 9,
    },
    {
      name: 'Pasta Shop',
      cuisine: 'Italian?',
      wait: 15,
    },
    {
      name: 'Soup Shop',
      cuisine: 'Soup',
      wait: 0,
    },
    {
      name: 'Thai Shop',
      cuisine: 'Thai',
      wait: 60
    },
    {
      name: 'Seafood Shop',
      cuisine: 'Seafood',
      wait: 90
    }];
  }]);
