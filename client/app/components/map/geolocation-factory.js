angular.module('zibzoo.geolocation.factory', [])
  .factory('geolocation', ['$rootScope', function ($rootScope) {
    var geolocation = {};

    geolocation.data = {
      latitude: '0',
      longitude: '0',
      address: '',
      accuracy: '0',
      error: null
    };

    geolocation.setLocation = function (position) {
      geolocation.data.latitude = position.coords.latitude;
      geolocation.data.longitude = position.coords.longitude;
      geolocation.data.accuracy = position.coords.accuracy;

      var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      var geocoder = geocoder = new google.maps.Geocoder();

      geocoder.geocode({ 'latLng': latlng }, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          if (results[1]) {
            geolocation.data.address = results[1].address_components[0].long_name;
            $rootScope.$apply();
          }
        }
      });
    };

    geolocation.getLocation = function () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(geolocation.setLocation, geolocation.setError);
      } else {
        geolocation.data.error = 'Geolocation is not supported by this browser.';
        $rootScope.$apply();
      }
    };

    geolocation.setError = function (error) {
      switch (error.code) {
      case error.PERMISSION_DENIED:
        geolocation.data.error = 'User denied the request for Geolocation.';
        break;
      case error.POSITION_UNAVAILABLE:
        geolocation.data.error = 'Location information is unavailable.';
        break;
      case error.TIMEOUT:
        geolocation.data.error = 'The request to get user location timed out.';
        break;
      case error.UNKNOWN_ERROR:
        geolocation.data.error = 'An unknown error occurred.';
        break;
      }

      $rootScope.$apply();
    };

    return geolocation;
  }]);
