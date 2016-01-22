describe('VendorsListController', function () {
  var $scope;
  var $rootScope;
  var $location;
  var createController;
  // TODO: $httpBackend is defined but never used
  var $httpBackend;
  var Vendors;

  // using angular mocks, we can inject the injector
  // to retrieve our dependencies
  beforeEach(module('zibzoo'));
  // TODO: inject is not defined
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
      expect($scope.vendors).toBeDefined();
    });
    it('should be an array', function () {
      expect(Array.isArray($scope.vendors)).toBe(true);
    });
    xit('should contain no data', function () {
      expect($scope.vendors.length).toBe(0);
    });
  });

  describe('$scope.getVendors', function () {
    it('should be property on the scope', function () {
      expect($scope.getVendors).toBeDefined();
    });
    it('should be a function', function () {
      expect(typeof $scope.getVendors).toBe('function');
    });
  });
  describe('$scope.filter', function () {
    it('should be a property on the scope', function () {
      expect($scope.filter).toBeDefined();
    });
    it('should be a function', function () {
      expect(typeof $scope.filter).toBe('function');
    });
    it('should assign the  argument it takes in and set it in an array assigned to $scope.selected',
      function () {
        $scope.filter('hello');
        expect($scope.selected).toEqual(['hello']);
      });
    it('if argument does not exist it should not set any value to $scope.selected',
      function () {
        $scope.filter();
        expect($scope.selected).toBeUndefined();
      });
  });
});