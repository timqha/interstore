//angular.module('AnCart', []);
angular.module('app', [
    'ngCart',
    'ngRoute',
    'templates'
   // 'ui.route'
   // 'mgcrea.ngStrap' // for modal window
]).config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'home.html',
            controller: 'MyController'
        })
        .when('/cart', {
            templateUrl: 'devise/cart.html',
            controller: 'StepOneController'
        })
        .when('/login',{
            templateUrl: 'login.html',
            controller: 'LoginCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
    $locationProvider.html5Mode(true);

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


