
'use strict';
angular.module("myCart",[
    'app'
]);

angular.module("admin", [
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
    $rootScope.config = {heders: 'application/json; charset=UTF-8'};

        $rootScope.handleSuccess = function(response){
            return ( response.data);
        };
        $rootScope.handleError = function(response, $q) {
            if (
                !angular.isObject(response.data) || !response.data.message
            ) {
                return ( $q.reject("An unknown error occurred.") );
            }
            return ( $q.reject(response.data.message) );
        }

});

