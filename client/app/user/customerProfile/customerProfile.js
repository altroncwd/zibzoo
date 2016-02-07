angular.module('zibzoo.customer.profile', [])
  .controller('CustomerProfileController', ['$scope', 'User', function ($scope, User) {
    User.getFromLocal();

    $scope.customer = User.data;

    $scope.diff = {
      _id: $scope.customer._id,
      propertiesToUpdate: {}
    };

    $scope.updateCustomer = function (customer) {
      var updated = $scope.customer;
      User.resetUser();
      User.getFromLocal();
      var oldCustomer = User.data;
      $scope.diff.propertiesToUpdate = User.objectDiff(updated, oldCustomer);
      delete $scope.diff.propertiesToUpdate.latitude;
      delete $scope.diff.propertiesToUpdate.longitude;
      delete $scope.diff.propertiesToUpdate.isVendor;
      delete $scope.diff.propertiesToUpdate.propertiesToUpdate;
      User.setData($scope.diff);
      User.updateCustomer($scope.diff)
        .then(function (data) {
          $scope.updateSuccess = data;
        })
        .catch(function (error) {
          $scope.updateError(error);
        });
    };

  }]);
