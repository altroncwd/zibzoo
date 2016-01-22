angular.module('zibzoo.merchant.menu.factory', [])
  .factory('menu', ['$http', '$stateParams', function ($http, $stateParams) {
    var menu = {};
    console.log($stateParams);

    menu.items = [];

    menu.addItem = function (food, price, calories, description, prepTime) {
      var item = {
        food: food,
        price: price,
        description: description,
        inStock: true,
        prepTime: prepTime,
        merchantId: $stateParams.merchantId

      };
      menu.items.unshift(item);
    };
    
    menu.remove = function (index) {
      var removeFromDb = menu.items.splice(index, 1);
    };

    menu.saveMenu = function (menuItemsObject) {
      return $http({
        method: 'POST',
        url: 'api/vendors/menuItems',
        data: JSON.stringify(menuItemsObject)
      })
        .success(function (data, status, headers, config) {
          console.log(data);
          return data;
        })
        .error(function (data, status) {
          console.error(
            JSON.stringify(data),
            JSON.stringify(status)
            );
        });
    };
    menu.log = function (x) {
      console.log('testing');
      console.log(x);
    };
    // initialize
    // menu.addItem();

    return menu;
  }]);
