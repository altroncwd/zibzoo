angular.module('zibzoo.socketFactory', [])
  .factory('Socket', ['$rootScope', function ($rootScope) {
    var socket = io.connect();
    var socketLogic = {
      on: function (eventName, callback) {
        socket.on(eventName, function () {
          var args = arguments;
          $rootScope.$apply(function () {
            callback.apply(socket, args);
          });
        });
      },

      emit: function (eventName, data, callback) {
        socket.emit(eventName, data, function () {
          var args = arguments;
          $rootScope.$apply(function () {
            if (callback) {
              callback.apply(socket, args);
            }
          });
        });
      },

// Remove callMultipleVendors if sockets are refactored for server side
      callMultipleVendors: function (orderList) {
        // order list should be a list of objects with a status key
        for (var i = 0; i < orderList.length; i++) {
          var currentVendorOrder = orderList[i];
          if (currentVendorOrder.status === 'succeeded') {
            socketLogic.emit(currentVendorOrder.vendorId, currentVendorOrder);
          }
        }
      }

    };

    return socketLogic;

  }]);
