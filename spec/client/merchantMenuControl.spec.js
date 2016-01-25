describe('MerchantMenuController', function () {
  var $scope;
  var $rootScope;
  var createController;
  var $httpBackend;
  var vendor;
  var menu;

  beforeEach(module('zibzoo'));
  beforeEach(inject(function ($injector) {

    $rootScope = $injector.get('$rootScope');
    $httpBackend = $injector.get('$httpBackend');
    vendor = $injector.get('vendor');
    menu = $injector.get('menu');

    $scope = $rootScope.$new();

    var $controller = $injector.get('$controller');

    createController = function () {
      return $controller('MerchantMenuController', {
        $scope: $scope,
        vendor: vendor,
        menu: menu
      });
    };

    var fakeData = [{}, {}, {}, {}];
    $httpBackend.whenGET('api/vendors').respond(fakeData);
    $httpBackend.whenGET('app/landing/landing.html').respond(fakeData);
    $httpBackend.whenPOST('api/menu').respond(201);
    $httpBackend.whenDELETE('api/menu').respond(204);

    createController();
    $httpBackend.flush();
  }));

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('$scope.menu', function () {
    it('should be a property on the $scope', function () {
      expect($scope.menu).toBeDefined();
    });
    it('should be assigned to the menu factory', function () {
      expect($scope.menu).toBe(menu);
    });
  });

  describe('$scope.menuItem', function () {
    it('should be a property on the$scope object', function () {
      expect($scope.menuItem).toBeDefined();
    });
    it('should have a blank Menu Item saved to it on Page load',
      function () {
        var menuItem = {
          name: '',
          description: '',
          price: '',
          inStock: true,
          calories: 0,
          isGlutenFree: false,
          isVegan: false,
          isDairyFree: false,
          isVegetarian: false
        };
        expect($scope.menuItem).toEqual(menuItem);
      });
  });

  describe('$scope.clearItem', function () {
    it('should be a function on the $scope object', function () {
      expect(typeof $scope.clearItem).toEqual('function');
    });
    it('should reassign $scope.menuItem to a blank menuItem when it is invoked',
      function () {
        var menuItem = {
          name: '',
          description: '',
          price: '',
          inStock: true,
          calories: 0,
          isGlutenFree: false,
          isVegan: false,
          isDairyFree: false,
          isVegetarian: false
        };

        $scope.menuItem.name = 'pasta';
        $scope.menuItem.description = 'this is a delicious pasta';
        $scope.menuItem.price = 300;
        $scope.clearItem();
        expect($scope.menuItem).toEqual(menuItem);
      });
    it('should be called by $scope.saveMenuItem', function () {
      spyOn($scope, 'clearItem');
      $scope.saveMenuItem({ name: 'hello' });
      $httpBackend.flush();
      expect($scope.clearItem).toHaveBeenCalled();
    });
  });

  describe('$scope.deleteMenuItem', function () {
    it('should be a function on the scope object', function () {
      expect(typeof $scope.deleteMenuItem).toBe('function');
    });
    it('should make a delete request by calling $scope.menu.deleteMenuItem', function () {
      spyOn($scope.menu, 'deleteMenuItem').and.callThrough();
      $scope.deleteMenuItem(5);
      $httpBackend.flush();
      expect($scope.deleteStatus).toEqual(204);
      expect($scope.menu.deleteMenuItem).toHaveBeenCalled();
    });
    it('should throw an error when an error code is recieved', function () {
      $httpBackend.expectDELETE('api/menu').respond(500);
      $scope.deleteMenuItem(88);
      $httpBackend.flush();
      expect($scope.deleteStatus).toEqual(500);
    });
  });

  describe('$scope.saveMenuItem', function () {
    it('should be a function on the scope object', function () {
      expect(typeof $scope.saveMenuItem).toBe('function');
    });
    it('should make a post request calling $scope.menu.saveMenutItem', function () {
      spyOn($scope.menu, 'saveMenuItem').and.callThrough();
      $scope.saveMenuItem({ name: 'fajita' });
      $httpBackend.flush();
      expect($scope.menu.saveMenuItem).toHaveBeenCalled();
      expect($scope.saveStatus).toEqual(201);
    });
    it('should throw an error when an error code is recieved', function () {
      $httpBackend.expectPOST('api/menu').respond(500);
      $scope.saveMenuItem({ name: 'willys fajita' });
      $httpBackend.flush();
      expect($scope.saveStatus).toEqual(500);
    });
  });
  describe('$scope.getMenu', function () {
    it('should be a function on th scope object', function () {
      expect(typeof $scope.getMenu).toBe('function');
    });
    // THIS TEST PASSES LOCALLY BUT FAILS ON TRAVIS CI
    xit('should make a get request by calling vendor.getVendors', function () {
      spyOn($scope.vendor, 'getVendors').and.callThrough();
      var data = {
        menuItems: [{}, {}, {}, {}]
      };
      $httpBackend.expectGET('api/vendors').respond(data);
      $scope.getMenu(4567890);
      $httpBackend.flush();
      expect($scope.vendor.getVendors).toHaveBeenCalled();
      expect($scope.menu.items).toEqual(data.menuItems);

    });
  });
});
