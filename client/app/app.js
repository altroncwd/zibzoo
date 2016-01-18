angular.module('zibzoo', [
  'mm.foundation'
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
      .state('anon.landing', {
        templateUrl: '',
        url: '/',
        controller: 'LandingController'
      })
      .state('anon.vendors', {
        templateUrl: '',
        url: '/vendors',
        controller: 'VendorsController',
      })
      .state('anon.vendors.menu', {
        templateUrl: '',
        url: '/:vendorname',
        controller: 'MenuController'
      })

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
      })

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
      })
})
