describe('VendorsController', function () {
  var $scope;
  var $rootScope;
  var $location;
  var createController;
  var $httpBackend;
  var vendor;

  // using angular mocks, we can inject the injector
  // to retrieve our dependencies
  beforeEach(module('zibzoo'));
  beforeEach(inject(function ($injector) {

    $rootScope = $injector.get('$rootScope');
    $httpBackend = $injector.get('$httpBackend');
    vendor = $injector.get('vendor');

    $scope = $rootScope.$new();

    var $controller = $injector.get('$controller');

    createController = function () {
      return $controller('VendorsController', {
        $scope: $scope,
        vendor: vendor,
        $location: $location
      });
    };
    var fakeVendors = [{}, {}, {}];
    $httpBackend.whenGET('app/landing/landing.html').respond(fakeVendors);
    $httpBackend.whenGET('api/vendors').respond(fakeVendors);
    createController();
    $httpBackend.flush();
  }));

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  xdescribe('$scope.vendors', function () {
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

  xdescribe('$scope.selected', function () {
    it('should not be defined on page load', function () {
      expect($scope.selected).toBeUndefined();
    });
    it('should be assigned an array contained a value after $scope.filter is called',
      function () {
        $scope.filter('hello');
        expect($scope.selected).toEqual(['hello']);
      });
  });

  xdescribe('$scope.filter', function () {
    it('should be a property on the scope', function () {
      expect($scope.filter).toBeDefined();
    });
    it('should be a function', function () {
      expect(typeof $scope.filter).toBe('function');
    });
    it('if argument does not exist it should not set any value to $scope.selected',
      function () {
        $scope.filter();
        expect($scope.selected).toBeUndefined();
      });
  });

  xdescribe('$scope.getVendors', function () {
    it('should be property on the scope', function () {
      expect($scope.getVendors).toBeDefined();
    });
    it('should be a function', function () {
      expect(typeof $scope.getVendors).toBe('function');
    });
    xit('should be invoked and make an api call on page load and set the result of that data to $scope.vendors',
      function () {
        expect($scope.vendors).toEqual([{}, {}, {}]);
      });
    xit('should expect to throw an error when an error code is received',
      function () {
        $httpBackend.expectGET('api/vendors').respond(500);
        createController();
        $httpBackend.flush();
        expect($scope.status).toBe(500);
      });
  });
});
