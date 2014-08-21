/**
 * Created by raul on 8/13/14.
 */
var greeterDirectives = angular.module('greeter.directives', ['md5']);

greeterDirectives.directive('gravatar', ['$log', '$compile', 'md5', function ($log, $compile, md5) {
   function link(scope, element, attrs) {
      var hash;
      var avatar;

      function updateHash() {
         var src = '#';

         //If we have a user image, this should take precedence...

         if (avatar) {
            if (!_.isUndefined(avatar.userImg) && !_.isNull(avatar.userImg)) {
               src = avatar.userImg;
            } else if (_.isUndefined(avatar.email) || _.isNull(avatar.email)) {
               //If we no image and no email, default to local default image.
               src = 'img/avatar.svg';
            } else {
               //If we have an email, lets use gravatar, with default of mystery man.
               src = '"https://secure.gravatar.com/avatar/' + hash + '?size=100&amp;default=mm"'
            }
            var html = '<img class="img-responsive" hashed="' + hash + '" src=' + src + '>';
            var e = $compile(html)(scope);
            element.replaceWith(e);
         }

      }

      scope.$watch(attrs.avatar, function (value) {
         avatar = value;

         if (value && (_.isUndefined(value.userImg) || _.isNull(value.userImg))) {
            var email = (value.email) ? value.email : 'mm';
            hash = md5(email);
         }
         updateHash();
      });


   }


   return {
      restrict: 'A',
      link: link
   }
}])

;




