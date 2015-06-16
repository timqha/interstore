angular.module("app")
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'home.html',
                controller: 'Category'
            })
            .when('/cart', {
                templateUrl: 'cart.html',
                controller: 'Product'
            })
            .when('/login', {
                templateUrl: 'devise/login.html',
                controller: 'RegisterCtrl'
            })
            .when('/register', {
                templateUrl: 'devise/register.html',
                controller: 'RegisterCtrl'
            })
            .when('/category/:categoryId', {
                templateUrl: 'category/show.html',
                controller: 'CategoryShowCtrl'
            })
            .when('/checkout', {
                templateUrl: 'checkout.html',
                controller: 'CheckoutCtrl'
            })

            .otherwise({
                redirectTo: '/'
            });
        $locationProvider.html5Mode(true);
    });
angular.module("admin")
    .config(function ($routeProvider, $locationProvider, $httpProvider) {
        $routeProvider
            .when('/admin', {
                templateUrl: "admin/admin.html",
                secure: false
            })
            .when('/admin/product/new', {
                templateUrl: 'admin/goods/new.html',
                controller: 'ProductNew'
            })
            .when('/admin/products/index', {
                templateUrl: 'admin/goods/index.html',
                controller: 'Product'
            })
            .when('/admin/product/:productId/show', {
                templateUrl: 'admin/goods/show.html',
                controller: 'ProductShow'
            })
            .when('/admin/product/:productId/edit', {
                templateUrl: 'admin/goods/edit.html',
                controller: 'ProductEdit'
            })
            .when('/admin/product/:productId/delete', {
                templateUrl: 'admin/goods/index.html',
                controller: 'Product'
            })

            .when('/admin/categories/index', {
                templateUrl: 'admin/category/index.html',
                controller: 'Category'
            })
            .when('/admin/category/new', {
                templateUrl: 'admin/category/new.html',
                controller: 'NewCategoryController'
            })
            .when('/admin/category/:categoryId/show', {
                templateUrl: 'admin/category/show.html',
                controller: 'CategoryShowCtrl'
            })
            .when('/admin/category/:categoryId/edit', {
                templateUrl: 'admin/category/edit.html',
                controller: 'CategoryEdit'
            })
            .when('/admin/category/:categoryId/delete', {
                templateUrl: 'admin/category/index.html',
                controller: 'Category'
            })
            .otherwise({
                redirectTo: '/'
            });
        $locationProvider.html5Mode(true);
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/json; charset=UTF-8';
    });
