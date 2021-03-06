angular.module("app")
    .config(function (stateHelperProvider, $urlRouterProvider, $httpProvider, $authProvider) {


        $authProvider.configure({
            apiUrl: '/api/v1'
          // storage: 'localStorage'
        });

        $urlRouterProvider.otherwise("/home");
        stateHelperProvider
            .state({
                name: 'admin',
                url: '/admin',
                data: {
                    admin: true
                },
                templateUrl: "admin/admin.html"
            })
            .state({
                name: 'products',
                url: '/admin/products',
                templateUrl: '_layouts.html',
                data: {
                    admin: true
                },
                children: [
                    {
                        name: 'new',
                        url: '/new',
                        templateUrl: 'admin/goods/new.html',
                        controller: 'ProductNew'
                    },
                    {
                        name: 'index',
                        url: '/index?page&sort&reverse&pagesize',
                        templateUrl: 'admin/goods/index.html',
                        controller: 'Product',
                        params: {
                            page: {
                                value: '0',
                                squash: true
                            },
                            sort: {
                                value: '',
                                squash: true
                            },
                            pagesize: {
                                value: '3',
                                squash: true
                            },
                            reverse: {

                                squash: true
                            }
                        }
                    },
                    {
                        name: 'show',
                        url: '/:productId/show',
                        templateUrl: 'products/show.html',
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
                data: {
                    admin: true
                },
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
                data: {
                    admin: true
                },
                templateUrl: '_layouts.html',
                children: [
                    {
                        name: 'index',
                        url: '/index?page&pagesize',
                        templateUrl: 'admin/orders/index.html',
                        controller: 'AdminProfileIndexContr',
                        params: {
                            page: {
                                value: '0',
                                squash: true
                            },
                            pagesize: {
                                value: '3',
                                squash: true
                            }
                        }
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
                url: "/home?page&sort&pagesize&min&max",
                data: {
                    admin: false
                },
                templateUrl: "category/home.html",
                controller: 'Category',
                params: {
                        page: {
                            value: '0',
                            squash: true
                        },
                        sort: {
                            value: '',
                            squash: true
                        },
                        pagesize: {
                            squash: true
                        },
                        min: {
                            value: '1',
                            squash: true
                        },
                        max: {
                            squash: true
                        }

                   /* sort: {
                    &sort
                        value: 'upvotes'
                        //squash: true
                    }*/
                }
            })
            .state({
                name: 'categories',
                url: '/categories',
                data: {
                    admin: false
                },
                templateUrl: '_layouts.html',
                children: [
                    {
                        name: 'show',
                        url: "/:categoryId/show?page&color&min&max&pagesize",
                        templateUrl: 'category/show.html',
                        controller: 'CategoryShowCtrl',
                        params: {
                            page: {
                                value: '0',
                                squash: true
                            },
                            color: {
                                array : true
                            },
                            pagesize: {
                                squash: true
                            },
                            min: {
                                value: '1',
                                squash: true
                            },
                            max: {
                                squash: true
                            }
                        }
                    }]
            })
            .state({
                name: 'goods',
                url: '/goods',
                data: {
                    admin: false
                },
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
                data: {
                    admin: false
                },
                templateUrl: 'cart.html',
                controller: 'CartCtrl',
                resolve: {
                    myproducts: function (ProductsService) {
                        return ProductsService.getProductsAll().then(function (response) {
                            return response.products;
                        });
                    },
                    auth: ['$auth', function ($auth, $rootScope, Flash) {
                        if ($auth.validateUser().$$state.status == 2) {
                            alert('You must login or register!');
                            $rootScope.$broadcast('auth:redirect to login', {});
                            //http://stackoverflow.com/questions/29080128/angular-ui-router-state-go-is-not-redirecting-inside-resolve
                        } else {
                            console.log('welcome');
                        }
                        return $auth.validateUser();

                    }]
                }
            })
            .state({
                name: 'account',
                url: '/account',
                data: {
                    admin: false
                },
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
                data: {
                    admin: false
                },
                templateUrl: 'checkout.html',
                controller: 'CheckoutCtrl'
            })
            .state({
                name: 'profile',
                url: "/profile",
                data: {
                    admin: false
                },
                templateUrl: 'users/_profile.html',
                children: [
                    {
                        name: 'orders',
                        url: '/orders?page&pagesize',
                        templateUrl: 'users/orders.html',
                        controller: 'ProfileOrdersCtrl',
                        params: {
                            page: {
                                value: '0',
                                squash: true
                            },
                            pagesize: {
                                value: '3',
                                squash: true
                            }
                        }
                    },
                    {
                        name: 'index',
                        url: '/index',// При изменении поправить CheckoutCtrl dialogInfo()
                        templateUrl: 'devise/_updateform.html',
                        controller: 'ProfileUserCtrl'
                    }
                ]
            });

        $httpProvider.defaults.headers.post['Content-Type'] = 'application/json; charset=UTF-8';
    });
