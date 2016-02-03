angular.module('zibzoo', [
  'ui.router',
  'mm.foundation',
  'uiGmapgoogle-maps',
  'zibzoo.navbar.directive',
  'zibzoo.vendors.directive',
  'zibzoo.filtermenu.directive',
  'zibzoo.image-uploader.directive',
  'zibzoo.places.directive',
  'zibzoo.cart',
  'zibzoo.auth',
  'zibzoo.auth.factory',
  'zibzoo.user.factory',
  'zibzoo.landing',
  'zibzoo.vendors',
  'zibzoo.vendor',
  'zibzoo.vendor.factory',
  'zibzoo.order',
  'zibzoo.merchant',
  'zibzoo.merchant.menu',
  'zibzoo.merchant.menu.factory',
  'zibzoo.merchant.order.factory',
  'zibzoo.merchant.order',
  'zibzoo.socketFactory',
  'zibzoo.location.factory'
])

.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
  $stateProvider
    .state('landing', {
      templateUrl: 'app/landing/landing.html',
      url: '/',
      controller: 'LandingController'
    })
    .state('vendors', {
      templateUrl: 'app/vendors/vendors.html',
      url: '/vendors/:latlng',
      controller: 'VendorsController'
    })
    .state('vendor', {
      templateUrl: 'app/vendor/vendor.html',
      url: '/vendor/:vendorId',
      controller: 'VendorController'
    });

    url: '/merchant/:merchantId',

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

.factory('AttachTokens', function ($window) {
  var attach = {
    request: function (object) {
      var jwt = $window.localStorage.getItem('com.zibzoo');

      if (jwt) {
        object.headers['x-access-token'] = jwt;
      }

      object.headers['Allow-Control-Allow-Origin'] = '*';
      return object;
    }
  };

  return attach;
})

.run(function ($rootScope, $state, Auth, Socket) {
  $rootScope.$state = $state;

  $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
    if (toState && toState.authenticate && !Auth.isAuth()) {
      event.preventDefault();
      $state.go('landing');
    }
  });
});
