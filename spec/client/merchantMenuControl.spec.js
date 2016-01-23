describe('MerchantMenuController', function () {
  var $scope;
  var $rootScope;
  var $location;
  var createController;
  var $httpBackend;
  var Vendors;
  var menu;

  beforeEach(module('zibzoo'));
  beforeEach(inject(function ($injector) {

    $rootScope = $injector.get('$rootScope');
    $httpBackend = $injector.get('$httpBackend');
    Vendors = $injector.get('vendors');
    menu = $injector.get('menu');

    $scope = $rootScope.$new();

    var $controller = $injector.get('$controller');

    createController = function () {
      return $controller('MerchantMenuController', {
        $scope: $scope,
        Vendors: Vendors,
        menu: menu
      });
    };

    createController();
  }));

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
      expect($scope.clearItem).toHaveBeenCalled();
    });

  });
});
