/**
 * Created by raul on 8/13/14.
 */
var greeter = angular.module('greeter', [
   'ngAnimate',
   'greeter.directives',
   'ui.bootstrap'
]);


greeter.controller('controller', ['$rootScope', '$scope', '$interval', '$timeout', function ($rootScope, $scope, $interval, $timeout) {
   $scope.users = lightdm.users;
   $scope.alerts = [];


   $scope.passwordPromptHidden = true;
   $scope.password = "";
   $scope.message = "";
   $scope.messageIsError = false;
   $scope.currentTime = new Date();
   $scope.chosenSession = {};
   $scope.hideSessions = true;


   $scope.testFunc = function() {
      var test = lightdm.is_authenticated;
      alert('test: ' + test);
   };

   $scope.status = {
      isopen: false
   };


   function initUsers() {
      $scope.users = lightdm.users;

      _.map($scope.users, function (user) {
         var avatar = {};
         if (!_.isUndefined(lightdm.getCustomProperty)) {
            avatar.userImg = lightdm.getCustomProperty(user.name, 'userimg');
            avatar.email = lightdm.getCustomProperty(user.name, 'email');
         }
         user.avatar = avatar;
      });
      showAllUsers();
   }

   $scope.$on('focusPassword', function () {
      //For some reason, on the greeter I need to wrap the broadcast AND the actual focus in $timeout function.
      //This is not necessary in browser or even in a webkit widget on a gtk container...
      $timeout(function() {
         document.getElementById("password_entry").focus();
      });

   });


   function hideUsersExcept(name) {
      _.map($scope.users, function (user) {
         user.hidden = (user.name !== name);
      });
   }

   function showAllUsers() {
      _.map($scope.users, function (user) {
         user.hidden = false;
      });
      $scope.passwordPromptHidden = true;
   }

   function initTimer() {
      $interval(function () {
         $scope.currentTime = new Date();
      }, 1000);

   }

   $scope.clickSession = function(key, name) {
      $scope.chosenSession.key = key;
      $scope.chosenSession.name = name;
      $scope.status.isopen = false;
   };

   function initSessions() {
      $scope.sessions = lightdm.sessions;
      $scope.hideSessions = $scope.sessions.length < 2;

      if (_.isUndefined($scope.chosenSession || _.isNull($scope.chosenSession))) {
         $scope.chosenSession = {};
      }

      $scope.chosenSession.key = $scope.sessions[0].key;
      $scope.chosenSession.name = $scope.sessions[0]. name;

   }

   $scope.provideSecret = function () {
      $scope.show_message("Logging in...");
      $timeout(function () {
         lightdm.provide_secret($scope.password);
      });
   };


   $scope.show_message = function (text, error) {
      if ($scope.alerts.length > 0) {
         $scope.alerts.pop();
      }
      if (text === '') {
         return;
      }


      var message = {};
      message.text = text;
      if (error) {
         message.type = 'danger';
      } else {
         message.type = 'success';
      }

      $scope.alerts.push(message);
   };

   $scope.showError = function (text) {
      $scope.show_message(text, true);
   };


   //This function shows the password prompt.
   $scope.show_prompt = function (text) {
      if ($scope.passwordPromptHidden) {
         $scope.passwordPromptHidden = false;
      }
      $scope.password = "";

      //For some reason, on the greeter I need to wrap the broadcast AND the actual focus in $timeout function.
      //This is not necessary in browser or even in a webkit widget on a gtk container...
      $timeout(function () {
         $rootScope.$broadcast('focusPassword');
      });

   };

   $scope.authenticationComplete = function () {
      if (lightdm.is_authenticated) {
         if (_.isUndefined($scope.chosenSession.key) || _.isNull($scope.chosenSession.key)) {
            $scope.chosenSession.key = lightdm.default_session;
         }
         lightdm.login(lightdm.authentication_user, $scope.chosenSession.key);
      } else {
         $scope.showError("Authentication Failed");
         $scope.startAuthentication($scope.selectedUser);


         $timeout(function () {
            $scope.show_message("");
         }, 1000);
      }
   };

   $scope.startAuthentication = function (username) {
      lightdm.cancel_timed_login();
      $scope.selectedUser = username;
      lightdm.start_authentication(username);
   };

   $scope.clickUser = function (username) {
      if (!_.isNull($scope.selectedUser) && !_.isUndefined($scope.selectedUser)) {
         $scope.selectedUser = undefined;
         lightdm.cancel_authentication();
         showAllUsers();
      } else {
         hideUsersExcept(username);
         $scope.startAuthentication(username);
      }


      $scope.show_message("");
//        $rootScope.$broadcast('focusPassword');

   };

   function initialize() {
      initUsers();
      initTimer();
      initSessions();
   }


   initialize();

}]);