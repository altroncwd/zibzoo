describe('AuthController', function () {
  var $scope;
  var $rootScope;
  var createController;
  var $httpBackend;
  var $window;
  var $state;
  var Auth;
  var User;
  var $modalInstance;
  var $controller;

  beforeEach(module('zibzoo'));
  beforeEach(inject(function ($injector) {
    $rootScope = $injector.get('$rootScope');
    $httpBackend = $injector.get('$httpBackend');
    $window = $injector.get('$window');
    $state = $injector.get('$state');
    Auth = $injector.get('Auth');
    User = $injector.get('User');
    $modalInstance = {
      dismiss: jasmine.createSpy('$modalInstance.dismiss')
    };
    $controller = $injector.get('$controller');

    $scope = $rootScope.$new();
    createController = function () {
      return $controller('AuthController', {
        $scope: $scope,
        $window: $window,
        $state: $state,
        Auth: Auth,
        User: User,
        $modalInstance: $modalInstance
      });
    };

    $httpBackend.whenGET('app/landing/landing.html').respond('your good');
    $httpBackend.whenPOST('/api/user/signin').respond({ name: 'joe' });
    createController();
    // $httpBackend.flush();
  }));

  afterEach(function () {
    $httpBackend.flush();
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('$scope.user', function () {
    it('Should be a property on the scope', function () {
      expect($scope.user).toBeDefined();
    });
    it('Should be assigned the user.data from the User factory', function () {
      expect($scope.user).toBe(User.data);
    });
    it('Should contain an order property, which is an array', function () {
      expect($scope.user.orders).toBeDefined();
      expect(Array.isArray($scope.user.orders)).toBe(true);
    });
    it('Should contain an error property, which is set to null', function () {
      expect($scope.error).toBeDefined();
      expect($scope.error).toBe(null);
    });
    it('Should contain a signin property, which is a function', function () {
      expect($scope.signin).toBeDefined();
      expect(typeof $scope.signin).toBe('function');
    });
    it('Should make a request by calling auth.signin', function () {
      spyOn(Auth, 'signin').and.callThrough();
      $scope.signin({});
      expect(Auth.signin).toHaveBeenCalled();
      expect($scope.user).toBe({ name: 'joe' });
    });

  });


});
