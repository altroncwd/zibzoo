angular.module('zibzoo.merchant', ['ngFileUpload'])
  .controller('MerchantProfileController', ['$scope', 'vendor', '$stateParams', 'User', 'Upload', 'location', function ($scope, vendor, $stateParams, User, Upload, location) {

    User.getFromLocal();

    $scope.cuisines = ['American', 'Chinese', 'Hawaiian', 'French', 'German', 'Japanese', 'Spanish', 'Mexican', 'Peruvian', 'Filipino', 'Korean', 'Indian', 'Bacon'];
    $scope.vendor = User.data;
    $scope.merchantId = $stateParams.merchantId;
    $scope.diff = {
      _id: $scope.merchantId,
      propertiesToUpdate: {}
    };

    $scope.setImage = function () {
      if (!User.data.bannerImageUrl) {
        $scope.bannerImg = 'https://placehold.it/1000x344';
      } else {
        $scope.bannerImg = User.data.bannerImageUrl;
      }
      if (!User.data.thumbImageUrl) {
        $scope.thumbImg = 'https://placehold.it/900x500';
      } else {
        $scope.thumbImg = User.data.thumbImageUrl;
      }
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


    $scope.setLocation = function () {
      location.getCurrentLocation(function (currLocation) {
        console.log(currLocation);
        User.setData({ latitude: currLocation.latitude,
                      longitude: currLocation.longitude
                      });
        $scope.locationSuccess = true;
        $scope.updateVendor($scope.vendor);
        console.log($scope.vendor);
      });
    };

    $scope.upload = function (file, type) {
      Upload.upload({
        url: 'api/vendors/image',
        data: { file: file, _id: $scope.merchantId, type: type }
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
