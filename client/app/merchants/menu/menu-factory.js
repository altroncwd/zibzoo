angular.module('zibzoo.merchant.menu.service', [])
  .factory('menu', function() {
    var menu = {};

    menu.items = [
      { food : "cheese",
        price : 14.50,
        description : "three cheese pizza with a garlic stuffed crust",
        inStock : true,
        prepTime : 20 ,
      },
      { food : "volcano",
        price : 18.00,
        description : "three cheese topped with jalapenos, red pepers, spicy italian sausage and a stuffed jalapeno creamcheese crust ",
        inStock : true,
        prepTime : 22 ,
      },
      { food : "garlic breadsticks",
        price : 7.0,
        description : "soft homemade breadsticks brushed with butter and our special mix of garlic and spices",
        inStock : true,
        prepTime : 15 ,
      }
    ];

    menu.addItem = function(food, price, calories, description, prepTime) {
      var item = {
        food: food,
        price: price,
        description: description,
        inStock: true,
        prepTime: prepTime ,
      };
      console.log(item);
      menu.items.unshift(item);
    };
    menu.remove = function (index){
      var removeFromDb = menu.items.splice(index,1);
    };
    // Only for test use
    menu.log = function(x){
      console.log("testing");
      console.log(x);
    }
    // initialize
    // menu.addItem();

    return menu;
  });
