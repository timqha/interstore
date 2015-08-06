
'use strict';
angular.module("myCart",[
   // 'app'
]);
angular.module("admin", [
    "templates",
    'ui.router'
]);
angular.module('app', [
    'ui.router',
    'ui.router.stateHelper',
    'templates',
    'ng-token-auth',
    'ngSanitize',
    'myCart',
    'admin'

])

    .run(function($rootScope, $state, $timeout) {

        $rootScope.$on('auth:password-reset-confirm-success', function() {
            $state.go('account.reset-password');
           // $state.go('home');
        });

        $rootScope.$on('auth:password-reset-confirm-error', function(ev, reason) {
            alert("Unable to verify your account. Please try again.");
        });

        $rootScope.$on('auth:password-change-success', function(ev) {
            alert("Your password has been successfully updated!");
            $state.go('home');
        });

        $rootScope.$on('auth:email-confirmation-success', function(ev, user) {
            alert("Welcome, "+user.email+". Your account has been verified.");
            $state.go('home');
        });

        $rootScope.$on('auth:registration-email-success', function(ev, message) {
            alert("A registration email was sent to " + message.email);
            $state.go('home');
        });

        $rootScope.$on('auth:logout-error', function(ev, reason) {
            alert('logout failed because ' + reason.errors[0]);
        });
        $rootScope.$on('auth:logout-success', function(ev) {
            alert('goodbye');
            $state.go('home');
        });

        $rootScope.$on('auth:oauth-registration', function(ev, user) {
            alert('new user registered through oauth:' + user.email);
        });

        $rootScope.$on('auth:login-error', function(ev, reason) {
            alert('auth failed because: '+reason.errors[0]);
            console.log(reason);
        });

        $rootScope.$on('auth:login-success', function(ev, user) {

            $timeout(function() {

                alert('Welcome, '+user.email+' !');
                $state.go('home');
            });
            //$timeout(function(){$state.go('home')},0);
        });

        $rootScope.$on('auth:session-expired', function(ev) {
            alert('Session has expired');
        });



    });
    /*
.run(function ($rootScope, $location, $cookieStore, $http) {
    // keep user logged in after page refresh
    $rootScope.globals = $cookieStore.get('globals') || {};
    if ($rootScope.globals.currentUser) {
        $http.defaults.headers.common['app'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
    }

    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        var nextRoute = $location.path();
        if (nextRoute.secure && !$rootScope.globals.currentUser) {
            $location.path('/login');
        }
    });


});*/

