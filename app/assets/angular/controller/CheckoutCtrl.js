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
    .controller('CheckoutCtrl', function ($scope, UserService, OrdersService, ProductsService, myCart, $rootScope) {
        $scope.order = {email: null, cart: null};
        $scope.error = {message: null, danger: null};
        $scope.myCart = myCart;
        $scope.order.email = null;


        UserService.getUser()
            .then(function (data) {
                console.log(data);
                $scope.order = data.data.user;
            })
            .catch(function (data) {
                console.log(data);
            });

        $scope.Checkout = function () {

            if (whenCartUpdated()) {
                $scope.change = confirm("Цены изменились!");
                if ($scope.change == true) {
                    addOrder();
                } else {
                    $scope.error.danger = "Заказ отменён!";
                }
            } else {
                addOrder();
            }
        };


        function addOrder() {
            if ($scope.order.name == null || $scope.order.city == null || $scope.order.telephone == null || $scope.order.email == null || myCart.getTotalItems() === 0) {
                if (myCart.getTotalItems() === 0) {
                    $scope.error.danger = "Корзина пуста, вы не можете заказать пустую корзину!";

                } else {
                    $scope.error.danger = "Заполните все поля!";
                }
            }
            else {
                $scope.order.cart = myCart.getCart().items;

                // Формируем массив объектов для передачи внутреностей корзины.
                var products = [];
                angular.forEach($scope.order.cart, function (product) {
                    var temp = {
                        product_id: product.getId(),
                        quantity: product.getQuantity(),
                        price: product.getPrice()
                    };
                    console.log(temp);
                    products.push(temp);
                });


                OrdersService.addNewOrder($scope.order.name, $scope.order.city, $scope.order.telephone, $scope.order.email, "Заказ в обработке", products)
                    .then(function () {
                        $scope.error.message = "Заказ в обработке!";
                          myCart.removeCart();
                    });

                return $scope.order = {name: null, city: null, telephone: null, email: null, cart: null};
            }
        }

        ////Наверное это нужно вынести в сервайс или что-то подобное.
        // И убрать повторение с ProductCtrl
        function whenCartUpdated() {
            $scope.errors = {text: null, g: 0};
            angular.forEach(myCart.getCart().items, function (item) {
                $scope.errors.g++;
                ProductsService.showProduct(item.getId())
                    .then(function (data) {
                        if (data.product.price != item.getPrice()) {
                            if ($scope.errors.g == 1) {
                                if (item.getPrice() <= data.product.price) {
                                    $scope.errors.text = "Цены на товар стали выше!";
                                }
                                else {
                                    $scope.errors.text = "Вам повезло, цены стали меньше!";
                                }
                            }
                            else {
                                $scope.errors.text = "Внимание! Цены изменились.";
                            }
                            item.setPrice(data.product.price);
                            $rootScope.$broadcast('myCart:change', {});
                        }
                    });
            });
        }

        // Стираем любое сообщение
        $scope.CleanMessage = function () {
            $scope.error.message =  null;
            $scope.error.danger =   null;
            $scope.errors.text =    null;
        }
    });
