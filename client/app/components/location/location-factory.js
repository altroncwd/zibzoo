angular.module('zibzoo.location.factory', [])
  .factory('location', ['$rootScope', function ($rootScope) {
    var location = {};

    location.data = {
      latitude: '0',
      longitude: '0',
      address: '',
      accuracy: '0',
      error: null
    };

    location.setCurrentLocation = function (position) {
      location.data.latitude = position.coords.latitude;
      location.data.longitude = position.coords.longitude;
      location.data.accuracy = position.coords.accuracy;

      location.setAddress(position.coords.latitude, position.coords.longitude, function (address) {
        location.data.address = address;
        $rootScope.$apply();
      });
    };

    location.setLocation = function (latlng, callback) {
      var coords = latlng.split(',');

      location.data.latitude = coords[0];
      location.data.longitude = coords[1];

      location.setAddress(coords[0], coords[1], function (address) {
        location.data.address = address;
        callback(location.data);
        $rootScope.$apply();
      });
    };

    location.setAddress = function (latitude, longitude, callback) {
      var latlng = new google.maps.LatLng(latitude, longitude);
      var geocoder = geocoder = new google.maps.Geocoder();

      geocoder.geocode({ 'latLng': latlng }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          if (results[1]) {
            var address = results[1].formatted_address;

            location.data.address = address;
            callback(address);
          }
        }
      });
    };

    location.getCurrentLocation = function () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(location.setCurrentLocation, location.setError);
      } else {
        location.data.error = 'Geolocation is not supported by this browser.';
        $rootScope.$apply();
      }
    };

    location.setError = function (error) {
      location.data.error = error;
      $rootScope.$apply();
    };

    return location;
  }]);
