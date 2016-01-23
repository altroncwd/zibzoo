describe('Merchant order view', function () {
  var $scope;
  var $rootScope;
  var createController;
  var httpBackend;

  beforeEach(module('zibzoo'));
  beforeEach(inject(function ($injector) {
    $rootScope = $injector.get('$rootScope');
    $httpBackend = $injector.get('$httpBackend');

    $scope = $rootScope.$new();

    var $controller = $injector.get('$controller');

    createController = function () {
      return $controller('MerchantOrdersController', {
        $scope: $scope
      });
    };



  }));

});
