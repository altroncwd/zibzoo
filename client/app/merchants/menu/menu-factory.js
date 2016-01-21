angular.module('zibzoo.merchant.menu.factory', [])
  .factory('menu', function() {
    var menu = {};

    menu.items = [
      { 
        name: 'Beef Taco',
        description: 'Best taco in town',
        price: 5.50
      },
      { 
        name: 'Chicken Fajitas',
        description: 'Yummy stuff',
        price: 4.25
      }
    ];

    menu.addItem = function() {
      var item = {
        name: '',
        description: '',
        price: null
      }
      
      menu.items.push(item);
    };

    // initialize
    menu.addItem(); 

    return menu;
  });
