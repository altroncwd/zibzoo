angular.module('zibzoo.merchant', [])
  .controller('MerchantProfileController', ['$scope', 'vendor', '$stateParams', function ($scope, vendor, $stateParams) {

    $scope.img = 'http://rlv.zcache.com/i_love_food_trucks_square_sticker-r21025c827b5f4cb9823264e110552eeb_v9wf3_8byvr_324.jpg';
    $scope.cuisines = ['American', 'Burger', 'Fusion', 'Asian', 'Spicy'];
    $scope.vendor = vendor.vendor;

    $scope.merchantId = $stateParams.merchantId;

    $scope.remove = function (index) {
      $scope.cuisine.splice(index, 1);
    };

    $scope.addCuisine = function (food) {
      $scope.cuisine.push(food);
    };

    $scope.updateVendor = function (updatedVendor) {
      vendor.updateVendor(updatedVendor)
        .then(function (data) {
          $scope.updateStatus = data.status;
          console.log('vendor updated successfully', data);
        })
        .catch(function (error) {
          $scope.updateStatus = error.status;
        });
    };
  }]);
