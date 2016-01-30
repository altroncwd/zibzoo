angular.module('zibzoo.merchant', ['ngFileUpload'])
  .controller('MerchantProfileController', ['$scope', 'vendor', '$stateParams', 'User', 'Upload', function ($scope, vendor, $stateParams, User, Upload) {

    User.getFromLocal();

    $scope.cuisines = ['American', 'Burger', 'Fusion', 'Asian', 'Spicy'];
    $scope.vendor = User.data;

    $scope.merchantId = $stateParams.merchantId;

    $scope.diff = {
      _id: $scope.merchantId,
      propertiesToUpdate: {}
    };


    $scope.setImage = function (imageUrl) {
      $scope.img = imageUrl;
    };

    $scope.updateVendor = function (updatedVendor) {

      var updated = $scope.vendor;
      User.resetUser();
      User.getFromLocal();
      var oldVendor = User.data;
      $scope.diff.propertiesToUpdate = User.objectDiff(updated, oldVendor);
      User.setData($scope.vendor);
      User.setNewToLocal();
      vendor.updateVendor($scope.diff)
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
          $scope.setImage(User.data.imageUrl);
        });
    };

    $scope.setImage('https://placehold.it/1000x344');

  }]);
