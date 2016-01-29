angular.module('zibzoo.merchant', ['ngFileUpload'])
  .controller('MerchantProfileController', ['$scope', 'vendor', '$stateParams', 'User', 'Upload', function ($scope, vendor, $stateParams, User, Upload) {

    User.getFromLocal();

    $scope.img = 'https://placehold.it/1000x344';
    $scope.cuisines = ['American', 'Burger', 'Fusion', 'Asian', 'Spicy'];
    $scope.vendor = User.data;

    $scope.merchantId = $stateParams.merchantId;

    $scope.setImage = function () {
      $scope.img = User.data.imageUrl;
    };

    $scope.updateVendor = function (updatedVendor) {
      User.setNewToLocal();
      vendor.updateVendor(updatedVendor)
        .then(function (data) {
          $scope.updateStatus = data.status;
          console.log('vendor updated successfully', data);
        })
        .catch(function (error) {
          $scope.updateStatus = error.status;
        });
    };

    $scope.upload = function (file) {
      Upload.upload({
        url: 'api/vendors/image',
        data: { file: file, _id: $scope.merchantId }
      })
        .then(function (response) {
          User.setData(response.data.propertiesToUpdate);
          User.setNewToLocal();
          User.getFromLocal();
          $scope.setImage();
        });
    };

    $scope.setImage();

  }]);
