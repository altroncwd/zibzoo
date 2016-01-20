describe('VendorsListController', function () {
  beforeEach(module('zibzoo.vendorsList'));

  var $controller;

  beforeEach(inject(function(_$controller_) {
    $controller = _$controller_;
  }));

  describe('$scope.vendors', function () {
    it('should be a property on the scope', function () {
      var $scope = {};
      var controller = $controller('VendorsListController', { $scope: $scope });
      expect($scope).to.have.property('vendors');
    })
    it('should be an array', function () {
      var $scope = {};
      var controller = $controller('VendorsListController', { $scope: $scope });
      expect(Array.isArray($scope.vendors)).to.be.true;
    });
  });
});
