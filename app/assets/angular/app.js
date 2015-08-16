
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
    'flash',
    'ngFileUpload',
    'myCart',
    'admin'

])

    .run(function($rootScope, $state, $timeout, Flash, UserService) {
        $rootScope.$on('$stateChangeStart',function(event, toState,  toParams, fromState, fromParams){
           console.log( event.currentScope.user.admin, toState);
            var authorization = toState.data.admin;

            UserService.getUser()
                .then(function (data) {
                    console.log(data.data.user.admin);
                    $rootScope.globaluser = data.data.user;
                    if(!data.data.user.admin && authorization != false){
                        console.log('ADMIN!!!');
                        event.preventDefault();
                        $state.go('account.login');
                    }
                })
                .catch(function (data) {
                    console.log(data);
                });
console.log("se",$rootScope.globaluser);
            var user =  event.currentScope.user.admin;


           /* var authorization = toState.data.authorization;

            if(!Security.isAuthenticated() && authorization != false)
                $location.path('/login');*/
        });

        $rootScope.$on('auth:redirect to login', function() {
            $state.go('account.login');
        });

        $rootScope.$on('auth:password-reset-confirm-success', function() {
            $state.go('account.reset-password');
           // $state.go('home');
        });

        $rootScope.$on('auth:password-reset-confirm-error', function(ev, reason) {
            var message = "Unable to verify your account. Please try again.";
            Flash.create('success', message, 'custom-class');
        });

        $rootScope.$on('auth:password-change-success', function(ev) {
            $state.go('home');
            var message = "Your password has been successfully updated!";
            Flash.create('success', message, 'custom-class');
        });

        $rootScope.$on('auth:email-confirmation-success', function(ev, user) {
            $state.go('home');
            var message = "Welcome, "+user.email+". Your account has been verified.";
            Flash.create('success', message, 'custom-class');
        });

        $rootScope.$on('auth:registration-email-success', function(ev, message) {
            var message = "A registration email was sent to " + message.email;
            Flash.create('success', message, 'custom-class');
        });

        $rootScope.$on('auth:oauth-registration', function(ev, user) {
            var message = 'new user registered through oauth:' + user.email;
            Flash.create('danger', message, 'custom-class');
        });


        $rootScope.$on('auth:logout-error', function(ev, reason) {
            $state.go('home');
            var message = 'logout failed because ' + reason.errors[0];
            Flash.create('danger', message, 'custom-class');

        });
        $rootScope.$on('auth:logout-success', function(ev) {
            $state.go('home');
            var message = 'goodbye';
            Flash.create('success', message, 'custom-class');
        });



        $rootScope.$on('auth:login-error', function(ev, reason) {
            var message = 'auth failed because: '+reason.errors[0];
            Flash.create('danger', message, 'custom-class');
        });

        $rootScope.$on('auth:login-success', function(ev, user) {
            $timeout(function() {
                $state.go('home');
            });
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

