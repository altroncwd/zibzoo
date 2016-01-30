angular.module('zibzoo.merchant.order.factory', [])
  .factory('Order', ['$window', function ($window) {
    var order = [
      { orderNumber: 1,
        username: '___UserEmail___@gmail.com',
        ID: 123425667,
        food: [
          { item: 'burger',
            quantity: 2
          }
        ]
      },
      { orderNumber: 2,
        username: '___UserEmail___@gmail.com',
        ID: 2098347523,
        food: [
          { item: 'Pizza',
            quantity: 2
          }
        ]
      },
      { orderNumber: 3,
        username: '___UserEmail___@gmail.com',
        ID: 283470524,
        food: [
          { item: 'hotdog',
            quantity: 1
          },
          { item: 'corndog',
            quantity: 7
          }
        ]
      },
      { orderNumber: 4,
        username: 'christopher.w.decker@gmail.com',
        ID: 1234345634567,
        food: [
          { item: 'volcano pizza',
            quantity: 1
          },
          { item: 'cheese bread',
            quantity: 2
          },
          { item: 'pasta',
            quantity: 3
          }
        ]
      },
    ];
    order.total = 4;  // currently set to static data
    // place for functions
    order.setLocalStorage = function () {
      $window.localStorage.setItem('orders', JSON.stringifty(order));
    };

    order.callDbOrderFinished = function (order) {
     // update the server info with the order id?

     // if the server comes back with no matching item
       // set /(or add) active key to false (aka finished)
       // and then do a post request with the missing item
    };
    // place for returns
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












