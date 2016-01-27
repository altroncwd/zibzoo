describe('MerchantMenuController', function () {
  var $scope;
  var $rootScope;
  var createController;
  var $httpBackend;
  var user;
  var menu;
  var vendor;

  beforeEach(module('zibzoo'));
  beforeEach(inject(function ($injector) {

    $rootScope = $injector.get('$rootScope');
    $httpBackend = $injector.get('$httpBackend');
    user = $injector.get('User');
    menu = $injector.get('menu');
    vendor = $injector.get('vendor');

    $scope = $rootScope.$new();

    var $controller = $injector.get('$controller');

    createController = function () {
      return $controller('MerchantMenuController', {
        $scope: $scope,
        user: user,
        menu: menu,
        vendor: vendor
      });
    };

    var fakeData = [{}, {}, {}, {}];
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

  describe('$scope.selectSections', function () {
    it('should be a property on the scope object', function () {
      expect($scope.selectSections).toBeDefined();
    });
    it('should be an array set to vendor.sections', function () {
      expect(Array.isArray($scope.selectSections)).toBe(true);
      expect($scope.selectSections).toEqual(vendor.sections);
    });
  });

  describe('$scope.vendor', function () {
    it('should be a property on the scope object', function () {
      expect($scope.vendor).toBeDefined();
    });
    it('should be assigned to User.data on controller load', function () {
      expect($scope.vendor).toBe(user.data);
    });
    it('should not be changed by any other function in the same scope',
      function () {
        $scope.toggle();
        $scope.deleteMenuItem(0);
        $scope.saveMenuItem({});
        $scope.clearItem();
        $httpBackend.flush();
        expect($scope.vendor).toBe(user.data);
      });
  });

  describe('$scope.menu', function () {
    it('should be a property on the $scope', function () {
      expect($scope.menu).toBeDefined();
    });
    it('should be assigned to the menu factory', function () {
      expect($scope.menu).toBe(menu);
    });
    it('should not be changed by any other function in the same scope',
      function () {
        $scope.toggle();
        $scope.deleteMenuItem(0);
        $scope.saveMenuItem({});
        $scope.clearItem();
        $httpBackend.flush();
        expect($scope.menu).toBe(menu);
      });
  });

  describe('$scope.menuItem', function () {
    it('should be a property on the $scope object', function () {
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

  describe('$scope.toggle', function () {
    it('should be a property on the $scope object', function () {
      expect($scope.toggle).toBeDefined();
    });
    it('should be a function', function () {
      expect(typeof $scope.toggle).toBe('function');
    });
  });

  describe('$scope.deleteMenuItem', function () {
    it('should be a function on the scope object', function () {
      expect(typeof $scope.deleteMenuItem).toBe('function');
    });
    it('should make a delete request by calling $scope.menu.deleteMenuItem', function () {
      spyOn($scope.menu, 'remove').and.callThrough();
      spyOn($scope.menu, 'deleteMenuItem').and.callThrough();
      $scope.deleteMenuItem(5);
      $httpBackend.flush();
      expect($scope.deleteStatus).toEqual(204);
      expect($scope.menu.remove).toHaveBeenCalled();
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
      spyOn(angular, 'extend').and.callThrough();
      spyOn($scope, 'clearItem').and.callThrough();
      spyOn($scope.menu, 'saveMenuItem').and.callThrough();
      $scope.saveMenuItem({ name: 'fajita' });
      $httpBackend.flush();
      expect($scope.clearItem).toHaveBeenCalled();
      expect(angular.extend).toHaveBeenCalled();
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
});
