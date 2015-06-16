
'use strict';

angular.module("admin", [
    "ngRoute",
    "templates"
]);
angular.module('app', [
    'ngCart',
    'ngRoute',
    'templates',
    'ngCookies',
    'ui.slider',
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

