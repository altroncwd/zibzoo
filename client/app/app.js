angular.module('zibzoo', [
  'ui.router',
  'mm.foundation',
  'zibzoo.vendors.factory',
  'zibzoo.navbar.directive',
  'zibzoo.vendors.directive',
  'zibzoo.landing',
  'zibzoo.vendorsList',
  'zibzoo.vendor',
  'zibzoo.merchant',
  'zibzoo.merchant.menu',
  'zibzoo.merchant.menu.service',
  'zibzoo.menuform.directive'
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
    });

  $stateProvider
    .state('merchant', {
      templateUrl: 'app/merchants/profile/profile.html',
      url: '/merchant/:merchantId',
      controller: 'MerchantProfileController',
      authenticate: true
    })
    .state('menu', {
      templateUrl: 'app/merchants/menu/menu.html',
      url: '/merchant/:merchantId/menu',
      controller: 'MerchantMenuController',
      authenticate: true
    })
    .state('orders', {
      templateUrl: 'app/merchants/orders/orders.html',
      url: '/merchant/:merchantId/orders',
      controller: 'MerchantOrdersController',
      authenticate: true
    });

  $urlRouterProvider.otherwise('/');
})

.run(function ($rootScope, $state) {
  $rootScope.$state = $state;
});
