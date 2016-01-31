angular.module('zibzoo.merchant.order.factory', [])
  .factory('Order', ['$window', function ($window) {
    var order = [];
    order.total = 0;

    order.setLocalStorage = function () {
      var modifiedToken = JSON.parse($window.localStorage.getItem('_id'));
      modifiedToken.timeStamp = $window.Date.now();
      modifiedToken.orders = order;
      modifiedToken.total = order.total;
      $window.localStorage.setItem('_id', JSON.stringify(modifiedToken));
    };

    order.callDbOrderFinished = function (finishedOrderObj) {
     // update the server info with the order id?

     // if the server comes back with no matching item
       // set /(or add) active key to false (aka finished)
       // and then do a post request with the missing item
    };

    order.persistLocalTotal = function () {
      var persist = JSON.parse($window.localStorage.getItem('_id'));
      if (persist !== null) {
        if ($window.Date.now() - persist.timeStamp < 10000) { // 3600000 = 1hours
          console.log('Persisted total: ', persist);
          for (var food in persist.orders) { order.push(food); }
          order.total = persist.total;
        } else {
          order.total = 0;
        }
      }
    };

    order.persistLocalTotal();

    return order;
  }]);





/*
> if the server side goes down we save everything in local storage
> if an order gets complete and the server is down we save that order in local storage in a finished order list
> if vendor side crashes and orders come through
  > que the db, remove any finished orders saved in local storage from the db
  > que the db, get all orders that are not finished

> if the server went down

*/












