angular.module('zibzoo.merchant.order.factory', [])
  .factory('Order', function () {
    var order = [
      { name: 'Benji Chambers',
        ID: 123425667,
        food: [
          { item: 'burger',
            quantity: 2
          }
        ]
      },
      { name: 'Tom Kilr',
        ID: 2098347523,
        food: [
          { item: 'Pizza',
            quantity: 2
          }
        ]
      },
      { name: 'Joe Pentagast',
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
      { name: 'Sam Samwise',
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

    // place for functions

    // place for returns
    return order;
  });
