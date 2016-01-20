angular.module('zibzoo', [
  'zibzoo.vendorsList',
  'ui.router',
  'mm.foundation',
  'zibzoo.navbar.directive',
  'zibzoo.vendors.directive',
  'zibzoo.landing',
  'zibzoo.vendorsList',
  'zibzoo.vendor'
])

.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
  $stateProvider
    .state('landing', {
      templateUrl: 'app/landing/landing.html',
      url: '/',
      controller: 'LandingController'
    })
    .state('vendors', {
      templateUrl: 'app/vendors/VendorsList/vendorsList.html',
      url: '/vendors',
      controller: 'VendorsListController',
    })
    .state('vendor', {
      templateUrl: 'app/vendors/vendor/vendor.html',
      url: '/vendor/:vendorId',
      controller: 'VendorController'
    })
    .state('vendor.menu', {
      templateUrl: 'app/vendors/vendor/menu.html',
      url: '/vendor/:vendorId/menu',
      controller: 'VendorMenuController'
    })
    .state('merchant', {
      templateUrl: 'app/merchants/merchant/merchant.html',
      url: '/merchant/:merchantId/',
      controller: 'MerchantController',
      authenticate: true
    })
    .state('merchant.menu', {
      templateUrl: 'app/merchants/merchant/menu.html',
      url: '/merchant/:merchantId/menu',
      controller: 'MerchantMenuController',
      authenticate: true
    })
    .state('merchant.orders', {
      templateUrl: 'app/merchants/merchant/orders.html',
      url: '/merchant/:merchantId/orders',
      controller: 'MerchantOrdersController',
      authenticate: true
    });

  $urlRouterProvider.otherwise('/');
})

.run(function ($rootScope, $state) {
  $rootScope.$state = $state;
});
