angular.module('zibzoo.places.directive', [])
  .directive('places', function () {
    return {  
      scope: {
        place: "="
      },
      link : function ($scope, element, attrs) {
        var options = { types : [] };
        var autocomplete = new google.maps.places.Autocomplete(element[0], options);

        google.maps.event.addListener(autocomplete, 'place_changed', function() {
          var place = autocomplete.getPlace();

          $scope.$apply(function () {
            $scope.place = place;
          });
        });

        element.bind('focus', function(e) {
          element.val('');
        });
      }
    };
  });


