
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
   // 'ui.route'
   // 'mgcrea.ngStrap' // for modal window
])
    .run(function ($rootScope, $location, $cookieStore, $http) {
    // keep user logged in after page refresh
    $rootScope.globals = $cookieStore.get('globals') || {};
    if ($rootScope.globals.currentUser) {
        $http.defaults.headers.common['app'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
    }

    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        // redirect to login page if not logged in
       //   if ($location.path() !== '/' && !$rootScope.globals.currentUser) {
       //  $location.path('/login');
      //   }

        var nextRoute = $location.path();
        if (nextRoute.secure && !$rootScope.globals.currentUser) {
            $location.path('/login');
        }
    });
});
    /*
.run(function ($rootScope, anCart, ngCartItem, store) {

    $rootScope.$on('anCart:change', function(){
        anCart.$save();
    });

    if (angular.isObject(store.get('cart'))) {
        ngCart.$restore(store.get('cart'));

    } else {
        ngCart.init();
    }

});*/


