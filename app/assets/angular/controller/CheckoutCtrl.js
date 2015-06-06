/**
 * @ngdoc controller
 * @name Checkout
 *
 * @description
 * _Please update the description and dependencies._
 *
 * @requires $scope
 * */
angular.module('app')
    .controller('CheckoutCtrl', function ($scope, OrdersService, ngCart, ProductsService) {
        $scope.order = {name: null, city: null, telephone: null, email: null, cart: null};
        $scope.error = {message: null};

        $scope.Checkout = function () {
            if (whenCartUpdated() == undefined) {
                $scope.change = confirm("Цены изменились!");
                if ($scope.change == true) {
                    addOrder();
                } else {
                    $scope.error.message = "Заказ отменён!";
                }

            } else {
                addOrder();
            }
        };

        function addOrder() {
            if ($scope.order.name == null && $scope.order.city == null && $scope.order.telephone == null && $scope.order.email == null) {
                $scope.error.message = "Заполните все поля!";
            }
            else {
                $scope.order.cart = ngCart.getCart().items;
                OrdersService.addNewOrder($scope.order.name, $scope.order.city, $scope.order.telephone, $scope.order.email, $scope.order.cart)
                    .then(function () {
                        $scope.error.message = "Заказ в обработке!";
                    });
                return $scope.order = {name: null, city: null, telephone: null, email: null, cart: null};
            }
        }

        function whenCartUpdated() {
            $scope.errors = {text: null, g: 0};
            angular.forEach(ngCart.getCart().items, function (item) {
                $scope.errors.g++;
                ProductsService.showProduct(item._id)
                    .then(function (data) {
                        if (data.price != item._price) {
                            if ($scope.errors.g == 1) {
                                if (item._price <= data.price) {
                                    $scope.errors.text = "Цены на товар стали выше!";
                                }
                                else {
                                    $scope.errors.text = "Вам повезло, цены стали меньше!";
                                }
                            }
                            else {
                                $scope.errors.text = "Внимание! Цены изменились.";
                                console.log($scope.errors.g);
                            }
                            item._price = data.price;
                        }
                    });
            });
        }
    });
