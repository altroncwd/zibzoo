angular.module('zibzoo', [
  'zibzoo.vendorsList',
  'ui.router',
  'mm.foundation',
  'zibzoo.navbar.directive',
  'zibzoo.blockgrid.directive',
  'zibzoo.landing'
])

.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('anon', {
      abstract: true,
      template: '<ui-view>',
      data: {
        access: false
      }
    })
    .state('landing', {
      templateUrl: 'app/landing/landing.html',
      url: '/',
      controller: 'LandingController'
    })
    .state('anon.vendors', {
      templateUrl: 'app/vendors/VendorsList/vendorsList.html',
      url: '/vendors',
      controller: 'VendorsListController',
    })
    .state('anon.vendors.menu', {
      templateUrl: '',
      url: '/:vendorname',
      controller: 'MenuController'
    });

  $stateProvider
    .state('user', {
      abstract: true,
      template: '<ui-view>',
      data: {
        access: true
      }
    })
    .state('user.home', {
      templateUrl: '',
      url: '/:username',
      controller: 'UserController',
    })
    .state('user.order', {
      templateUrl: '',
      url: '/:orderID',
      controller: 'OrderController'
    });

  $stateProvider
    .state('vendor', {
      abstract: true,
      template: 'ui-view',
      data: {
        access: true
      }
    })
    .state('vendor.profile', {
      templateUrl: '',
      url: '/:profileID',
      controller: 'ProfileController'
    })
    .state('vendor.profile.menu', {
      templateUrl: '',
      url: '/:menuid',
      controller: 'EditMenuController'
    })
    .state('vendor.profile.orders', {
      templateUrl: '',
      url: '/orders',
      controller: 'FulfillmentController'
    });
})

.run(function ($rootScope, $state) {
  $rootScope.$state = $state;
});
