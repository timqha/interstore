
'use strict';
angular.module("myCart",[
    'app'
]);

angular.module("admin", [
    "ngRoute",
    "templates",
    'ui.router'

]);
angular.module('app', [
    'ui.router',
    'ui.router.stateHelper',
    'templates',
    'ngCookies',
    'myCart',
    'admin'
])
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
});

