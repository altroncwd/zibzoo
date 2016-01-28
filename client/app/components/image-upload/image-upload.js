angular.module('zibzoo.image-uploader.directive', [])
  .directive('fileupload', ['$parse', function ($parse) {
    return {
      restrict: 'A',
      // templateUrl: 'app/components/image-upload/image-upload.html',
      link: function (scope, element, attrs) {
        var model = $parse(attrs.fileModel);
        var modelSetter = model.assign;

        element.bind('change', function () {
          scope.$apply(function () {
            modelSetter(scope, element.files[0]);
          });
        });
      }
    };
  }]);
