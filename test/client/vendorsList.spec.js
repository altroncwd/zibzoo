describe('VendorsListController', function () {
  var $scope;
  var $rootScope;
  var $location;
  var createController;
  var $httpBackend;
  var Vendors;

  // using angular mocks, we can inject the injector
  // to retrieve our dependencies
  beforeEach(module('zibzoo'));
  beforeEach(inject(function ($injector) {

    $rootScope = $injector.get('$rootScope');
    $httpBackend = $injector.get('$httpBackend'); // not used in the tests right now
    Vendors = $injector.get('vendors');
    $location = $injector.get('$location'); // not used in the tests right now

    $scope = $rootScope.$new();

    var $controller = $injector.get('$controller');

    createController = function () {
      return $controller('VendorsListController', {
        $scope: $scope,
        Vendors: Vendors,
        $location: $location
      });
    };

    createController();
  }));

  describe('$scope.vendors', function () {
    it('should be a property on the scope', function () {
      expect($scope).to.have.property('vendors');
    });
    it('should be an array', function () {
      expect(Array.isArray($scope.vendors)).to.be.true;
    });
    xit('should have no contain no data', function () {
      expect($scope.vendors.length).to.equal(0);
    });
  });
});