angular.module('zibzoo', [
  'ui.router',
  'mm.foundation',
  'zibzoo.navbar.directive',
  'zibzoo.vendors.directive',
  'zibzoo.filterbox.directive',
  'zibzoo.cart',
  'zibzoo.auth',
  'zibzoo.auth.factory',
  'zibzoo.user.factory',
  'zibzoo.landing',
  'zibzoo.vendors.list',
  'zibzoo.vendors.factory',
  'zibzoo.vendors.directive',
  'zibzoo.vendor',
  'zibzoo.vendor.factory',
  'zibzoo.order',
  'zibzoo.merchant',
  'zibzoo.merchant.menu',
  'zibzoo.merchant.menu.factory',
  'zibzoo.menuform.directive',
  'zibzoo.merchant.order.factory',
  'zibzoo.merchant.order'
])

.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
  $stateProvider
    .state('landing', {
      templateUrl: 'app/landing/landing.html',
      url: '/',
      controller: 'VendorsListController'
    })
    .state('vendors', {
      templateUrl: 'app/vendors/vendors-list.html',
      url: '/vendors',
      controller: 'VendorsListController',
    })
    .state('vendor', {
      templateUrl: 'app/vendor/vendor.html',
      url: '/vendor/:vendorId',
      controller: 'VendorController'
    });

  $stateProvider
    .state('signup', {
      templateUrl: 'app/auth/signup.html',
      url: '/signup',
      controller: 'AuthController'
    })
    .state('signin', {
      templateUrl: 'app/auth/signin.html',
      url: '/signin',
      controller: 'AuthController'
    })
    .state('cart', {
      templateUrl: 'app/user/cart/cart.html',
      url: '/cart',
      controller: 'CartController'
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
