angular.module('zibzoo.vendor', [])
  .controller('VendorController', ['$scope', '$stateParams', '$modal', 'vendor', 'Auth', function ($scope, $stateParams, $modal, vendor, Auth) {

    $scope.vendor = {};
    $scope.existingSections = [];
    $scope.items = {};

    $scope.getVendor = function (params) {
      vendor.getVendors(params)
        .then(function (data) {
          vendor.setData($scope, data.data[0]);
          var sections = [];
          $scope.existingSections = [];
          $scope.vendor.menuItems.forEach(function (menuItem) {
            if (sections[menuItem.sectionIndex]) {
              sections[menuItem.sectionIndex].container.push(menuItem);
              sections[menuItem.sectionIndex].container.sort(function (a, b) {
                return a.index - b.index;
              });
            } else {
              sections[menuItem.sectionIndex] = {
                section: menuItem.section,
                container: [menuItem]
              };
              $scope.existingSections[menuItem.sectionIndex] = menuItem.section;
            }
          });
          $scope.items = sections;
          console.log($scope.items);
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


    $scope.getVendor({ _id: $stateParams.vendorId });
  }]);
