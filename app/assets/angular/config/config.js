angular.module("app")
    .config(function (stateHelperProvider, $urlRouterProvider, $httpProvider, $authProvider) {
        $authProvider.configure({
            apiUrl: '/api',
            storage: 'localStorage'
        });
        $urlRouterProvider.otherwise("/home");

        stateHelperProvider
            .state({
                name: 'admin',
                url: '/admin',
                templateUrl: "admin/admin.html"
            })
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
            .state({
                name: 'orders',
                url: '/admin/orders',
                templateUrl: '_layouts.html',
                children: [
                    {
                        name: 'index',
                        url: '/index',
                        templateUrl: 'admin/orders/index.html',
                        controller: 'AdminProfileIndexContr'
                    },
                    {
                        name: 'delete',
                        url: '/:orderId/delete',
                        templateUrl: 'admin/orders/index.html',
                        controller: 'AdminProfileIndexContr'
                    },
                    {
                        name: 'edit',
                        url: '/:orderId/edit',
                        templateUrl: 'admin/orders/edit.html',
                        controller: 'AdminProfileEditContr'
                    }
                ]
            })
            /*start Users rout*/
            .state({
                name: 'home',
                url: "/home",
                templateUrl: "category/home.html",
                controller: 'Category'
            })
            .state({
                name: 'categories',
                url: '/categories',
                templateUrl: '_layouts.html',
                children: [
                    {
                        name: 'show',
                        url: "/:categoryId/show",
                        templateUrl: 'category/show.html',
                        controller: 'CategoryShowCtrl'
                    }]
            })
            .state({
                name: 'goods',
                url: '/goods',
                templateUrl: '_layouts.html',
                children: [
                    {
                        name: 'show',
                        url: "/:productId/show",
                        templateUrl: 'products/show.html',
                        controller: 'ProductShow'
                    }]
            })
            .state({
                name: 'cart',
                url: "/cart",
                templateUrl: 'cart.html',
                controller: 'CartCtrl',
                resolve: {

                    myproducts: function (ProductsService) {
                        return ProductsService.getProductsAll().then(function (response) {
                            return response.products;
                        });
                    },

                    auth: ['$auth', function ($auth) {
                        if ($auth.validateUser().$$state.status == 2) {
                            console.log('not welcome');
                            alert("register or login");

                        } else {
                            console.log('welcome');

                        }
                        return $auth.validateUser();

                    }]

                }
                //  controller: 'Product'
            })
            .state({
                name: 'account',
                url: '/account',
                templateUrl: '_layouts.html',
                children: [
                    {
                        name: 'reset-password',
                        url: "/reset-password",
                        templateUrl: 'devise/_resetPassUpdate.html',
                        controller: 'MyAuthResetSaveCtrl'
                    },
                    {
                        name: 'destaccount',
                        url: '/destroy-account',
                        templateUrl: 'devise/_destroyAccount.html',
                        controller: 'MyAuthDestroyCtrl'
                    },
                    {
                        name: 'login',
                        url: "/login",
                        templateUrl: 'devise/_loginform.html',
                        controller: 'MyAuthLoginCtrl'
                    },
                    {
                        name: 'register',
                        url: "/register",
                        templateUrl: 'devise/_regform.html',
                        controller: 'MyAuthRegCtrl'
                    },
                    {
                        name: 'resetpass',
                        url: '/reset_password',
                        templateUrl: 'devise/_resetpass.html',
                        controller: 'MyAuthResetCtrl'
                    }
                ]
            })

            .state({
                name: 'checkout',
                url: "/checkout",
                templateUrl: 'checkout.html',
                controller: 'CheckoutCtrl'
            })
            .state({
                name: 'profile',
                url: "/profile",
                templateUrl: 'users/_profile.html',
                children: [
                    {
                        name: 'orders',
                        url: '/orders',
                        templateUrl: 'users/orders.html',
                        controller: 'ProfileOrdersCtrl'
                    },
                    {
                        name: 'index',
                        url: '/index',
                        templateUrl: 'devise/_updateform.html',
                        controller: 'ProfileUserCtrl'
                    }
                ]
            });


        $httpProvider.defaults.headers.post['Content-Type'] = 'application/json; charset=UTF-8';
    });
