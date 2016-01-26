angular.module('zibzoo.merchant', [])
  .controller('MerchantProfileController', ['$scope', 'vendor', '$stateParams', function ($scope, vendor, $stateParams) {

    // themporary data for merchant page, html will need to be refactored for actual incoming data
    // $scope.schedule = {
    //   Monday: { isOpen: false, opens: null, close: null },
    //   Tuesday: { isOpen: true, opens: 12, close: 21 },
    //   Wednesday: { isOpen: true, opens: 12, close: 21 },
    //   Thursday: { isOpen: true, opens: 12, close: 21 },
    //   Friday: { isOpen: true, opens: 12, close: 21 },
    //   Saturday: { isOpen: true, opens: 12, close: 21 },
    //   Sunday: { isOpen: false, opens: null, close: null }
    // };
    $scope.img = 'http://rlv.zcache.com/i_love_food_trucks_square_sticker-r21025c827b5f4cb9823264e110552eeb_v9wf3_8byvr_324.jpg';
    $scope.cuisines = ['American', 'Burger', 'Fusion', 'Asian', 'Spicy'];
    // $scope.description = 'The best pizza around, so good it might kill you';
    // $scope.hour = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    // // '00' needs to be in string because its evaluated as 0
    // $scope.min = ['00', 15, 30, 45];
    $scope.vendor = {
      username: '',
      description: '',
      cuisine: '',
      imageUrl: '',
      location: '',
      menuItems: [],
    };

    $scope.merchantId = $stateParams.merchantId;

    $scope.remove = function (index) {
      $scope.cuisine.splice(index, 1);
    };

    $scope.addCuisine = function (food) {
      $scope.cuisine.push(food);
    };

    $scope.saveVendor = function (vendorObj) {
      vendor.saveVendor(vendorObj)
        .then(function (data) {
          console.log('Vendor saved successfuly', data);
        }, function (err) {
          console.error('Error saving vendor ', err);
        });
    };

    $scope.loadVendor = function (vendorId) {
      var id = {
        _id: vendorId
      };
      vendor.getVendors(id)
        .then(function (data) {
          if (data) {
            $scope.vendor = data.data;
          }
        })
        .catch(function (error) {
          $scope.loadStatus = error.status;
        });
    };
    $scope.loadVendor($scope.merchantId);


  }]);
