angular.module("app")
    .config(function (stateHelperProvider, $urlRouterProvider, $httpProvider) {
        $urlRouterProvider.otherwise("/home");

        stateHelperProvider
        .state({
            name: 'admin',
            url: '/admin',
            templateUrl: "admin/admin.html"})
        .state({
                name: 'products',
                url: '/admin/products',
                templateUrl: '_layouts.html',
                children: [
                    {
                        name: 'new',
                        url: '/new',
                        templateUrl: 'admin/goods/new.html',
                        controller: 'ProductNew'
                    },
                    {
                        name: 'index',
                        url: '/index',
                        templateUrl: 'admin/goods/index.html',
                        controller: 'Product'
                    },
                    {
                        name: 'show',
                        url: '/:productId/show',
                        templateUrl: 'admin/goods/show.html',
                        controller: 'ProductShow'
                    },
                    {
                        name: 'edit',
                        url: '/:productId/edit',
                        templateUrl: 'admin/goods/edit.html',
                        controller: 'ProductEdit'
                    },
                    {
                        name: 'delete',
                        url: '/:productId/delete',
                        templateUrl: 'admin/goods/index.html',
                        controller: 'Product'
                    }
                ]
        })
        .state({
            name: 'category',
            url: '/admin/categories',
            templateUrl: '_layouts.html',
            children: [
                {
                    name: 'new',
                    url: '/new',
                    templateUrl: 'admin/category/new.html',
                    controller: 'NewCategoryController'
                },
                {
                    name: 'index',
                    url: '/index',
                    templateUrl: 'admin/category/index.html',
                    controller: 'Category'
                },
                {
                    name: 'show',
                    url: '/:categoryId/show',
                    templateUrl: 'admin/category/show.html',
                    controller: 'CategoryShowCtrl'
                },
                {
                    name: 'edit',
                    url: '/:categoryId/edit',
                    templateUrl: 'admin/category/edit.html',
                    controller: 'CategoryEdit'
                },
                {
                    name: 'delete',
                    url: '/:categoryId/delete',
                    templateUrl: 'admin/category/index.html',
                    controller: 'Category'
                }
            ]
        })
            /*start Users rout*/
        .state({
            name:'home',
            url: "/home",
            templateUrl: "category/home.html",
            controller: 'Category'
        })
        .state({
            name: 'categories',
            url: '/categories',
            templateUrl: '_layouts.html',
            children:[
                {
                name: 'show',
                url: "/:categoryId/show",
                templateUrl: 'category/show.html',
                controller: 'CategoryShowCtrl'
            }]
        })
        .state({
            name:'cart',
            url: "/cart",
            templateUrl: 'cart.html',
            controller: 'Product'
        })
        .state({
            name: 'login',
            url: "/login",
            templateUrl: 'devise/login.html',
            controller: 'RegisterCtrl'
        })
        .state({
            name:'register',
            url: "/register",
            templateUrl: 'devise/register.html',
            controller: 'RegisterCtrl'
        })
        .state({
            name:'checkout',
            url: "/checkout",
            templateUrl: 'checkout.html',
            controller: 'CheckoutCtrl'
        });

        $httpProvider.defaults.headers.post['Content-Type'] = 'application/json; charset=UTF-8';
    });
