angular.module('zibzoo.vendor', [])
  .controller('VendorController', ['$scope', '$stateParams', '$modal', 'vendor', 'Auth', function ($scope, $stateParams, $modal, vendor, Auth) {
    //$scope.vendor = vendor.data;
    $scope.vendor = function (data) {
      for (var i = 0; i < data.length; i++) {
        if (data[i].id == $stateParams.vendorId) {
          return data[i];
        }  
      }
    }(vendor.tempData) || [];
    $scope.items  = _.chunk($scope.vendor.menuItems, 2);

    $scope.getVendor = function (params) {
      vendor.getVendors(params)
        .then(function (data) {
          $scope.vendor = data.data;
        })
        .catch(function (error) {
          console.error('Error getting vendor: ', error);
        });
    };

    $scope.order = function (item) {
      if (Auth.isAuth()) {
        $modal.open({
          templateUrl: 'app/vendor/_order-form.html',
          controller: 'OrderFormController',
          resolve: {
            item: function () {
              return item;
            },
            vendor: function () {
              return $scope.vendor;
            }
          }
        });
      } else {
        Auth.openModal();
      }
    };

   // $scope.getVendor($stateParams.vendorId);
  }]);
