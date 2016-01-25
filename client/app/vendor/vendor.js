angular.module('zibzoo.vendor', [])
  .controller('VendorController', ['$scope', '$stateParams', 'vendor', '$modal', function ($scope, $stateParams, vendor, $modal) {
    $scope.vendor = vendor;
    $scope.items  = _.chunk($scope.vendor.menu, 2);

    $scope.getVendor = function (params) {
      vendor.getVendor(params)
        .then(function (data) {
          $scope.vendor = data.data;
        })
        .catch(function (error) {
          console.error('Error getting vendor: ', error);
        });
    };

    $scope.open = function (item) {
      $modal.open({
        templateUrl: 'app/vendor/_order-form.html',
        controller: 'OrderFormController',
        resolve: {
          item: function () {
            return item;
          }
        }
      });
    };

    // $scope.getVendor($stateParams.vendorId);
  }]);
