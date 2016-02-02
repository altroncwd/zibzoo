angular.module('zibzoo.merchant.order.factory', [])
  .factory('Order', ['$window', function ($window) {
    var order = [];
    order.total = 0;

    var setLocalStorage = function () {
      var modifiedToken = JSON.parse($window.localStorage.getItem('_id'));
      modifiedToken.timeStamp = $window.Date.now();
      modifiedToken.orders = order;
      modifiedToken.total = order.total;
      // console.log('New modified token', modifiedToken);
      $window.localStorage.setItem('_id', JSON.stringify(modifiedToken));
    };

    var callDbOrderFinished = function (finishedOrderObj) {
     // call the DB using the order's unique number. its a put request
    };

    var persistLocalData = function () {
      var persist = JSON.parse($window.localStorage.getItem('_id'));
      if (persist !== null) {
        if ($window.Date.now() - persist.timeStamp < 10000) { // 3600000 = 1hours, set lower for testing
          // console.log('Persisted total: ', persist);
          for (var i = 0; i < persist.orders.length; i++) {
            // console.log('looking for that hash', persist.orders[i]);
            var temp = persist.orders[i];
            order.push(temp);
          }
          order.total = persist.total;
        }
      }
    };

    persistLocalData();

    return {
      order: order,
      setLocalStorage: setLocalStorage,
      callDbOrderFinished: callDbOrderFinished,
    };
  }]);





/*
> if the server side goes down we save everything in local storage
> if an order gets complete and the server is down we save that order in local storage in a finished order list
> if vendor side crashes and orders come through
  > que the db, remove any finished orders saved in local storage from the db
  > que the db, get all orders that are not finished

> if the server went down

*/












