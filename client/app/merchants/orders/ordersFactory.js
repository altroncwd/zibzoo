angular.module('zibzoo.merchant.order.factory', [])
  .factory('order', function(){
    var order = [
      { name: "Benji",
        ID: 123425667,
        food: [
          { item: "burger",
            quantity: 2
          }
        ]
      },
      { name: "Tom",
        ID: 2098347523,
        food: [
          { item: "Pizza",
            quantity: 2
          }
        ]
      },
      { name: "Joe",
        ID: 0283470524,
        food: [
          { item: "hotdog",
            quantity: 1
          },{ item: "corndog",
            quantity: 7
          }
        ]
      },
      { name: "Sam",
        ID: 123425667,
        food: [
          { item: "volcano pizza",
            quantity: 1
          },{ item: "cheese bread",
            quantity:2
          },{ item: "pasta",
            quantity: 3
          }
        ]
      },
    ];

    // place for functions

    // place for returns
    return order;
  });
