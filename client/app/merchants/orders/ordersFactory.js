angular.module('zibzoo.merchant.order.factory', [])
  .factory('Order', function () {
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

    // place for returns
    return order;
  });
