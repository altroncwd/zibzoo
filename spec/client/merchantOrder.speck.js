// describe('Merchant order view', function () {
//   var $scope;
//   var $rootScope;
//   var createController;
//   var httpBackend;

//   beforeEach(module('zibzoo'));
//   beforeEach(inject(function ($injector) {
//     $rootScope = $injector.get('$rootScope');
//     $httpBackend = $injector.get('$httpBackend');

//     $scope = $rootScope.$new();

//     var $controller = $injector.get('$controller');

//     createController = function () {
//       return $controller('MerchantOrdersController', {
//         // $scope: $scope
//       });
//     };

//     // don't know if I need this but i'm sure the routes will need to change even if i do
//     var fakeVendors = [{}, {}, {}];
//     $httpBackend.whenGET('app/landing/landing.html').respond(fakeVendors);
//     $httpBackend.whenGET('api/vendors').respond(fakeVendors);
//     createController();
//     $httpBackend.flush();
//   }));

//   // dont know if i'll need this either
//   afterEach(function () {
//     $httpBackend.verifyNoOutstandingExpectation();
//     $httpBackend.verifyNoOutstandingRequest();
//   });

//   describe("$scope.ordersList", function () {

//     it('should exist', function () {
//       console.log($scope);
//       expect($scope.ordersList).toBeDefined();
//     });
//     it('should be an array', function () {
//       expect($scope.ordersList instanceof Array).toBe(true);
//     });
//   });


// });
