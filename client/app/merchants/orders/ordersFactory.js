angular.module('zibzoo.merchant.order.factory', [])
  .factory('Order', ['$window', '$http', function ($window, $http) {
    var order = [{orderNumber:2345}];
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
      var update = {
        _id: finishedOrderObj._id,
        propertiesToUpdate: { isActive: false }
      };
      $http({
        method: 'PUT',
        url: 'api/orders',
        data: update
      })
        .success(function (data) {
          return data;
        })
        .error(function (data, status) {
          console.error(data, status);
        });
    };

    var persistLocalData = function () {
      var persist = JSON.parse($window.localStorage.getItem('_id'));
      if (persist !== null) {
        if ($window.Date.now() - persist.timeStamp < 3600000) { // 3600000 = 1hours, set lower for testing
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
