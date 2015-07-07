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
    .controller('CheckoutCtrl', function ($scope, OrdersService, ProductsService, myCart) {
        $scope.order = {name: null, city: null, telephone: null, email: null, cart: null};
        $scope.error = {message: null};
        $scope.myCart = myCart;

        $scope.Checkout = function () {
            addOrder();
           /* console.log(whenCartUpdated());
            if (whenCartUpdated() != undefined) {
                $scope.change = confirm("Цены изменились!");
                if ($scope.change == true) {
                    addOrder();
                } else {
                    $scope.error.message = "Заказ отменён!";
                }
            } else {
                addOrder();
            }*/
        };

        function addOrder() {
            if ($scope.order.name == null || $scope.order.city == null || $scope.order.telephone == null || $scope.order.email == null) {
                $scope.error.message = "Заполните все поля!";
            }
            else {
                $scope.order.cart = myCart.getCart().items;
                if($scope.order.cart)
                {
                    OrdersService.addNewOrder($scope.order.name, $scope.order.city, $scope.order.telephone, $scope.order.email, JSON.stringify($scope.order.cart))
                        .then(function () {
                            $scope.error.message = "Заказ в обработке!";
                            myCart.removeCart();

                        })
                        .catch(function(data){
                            console.log('catch',data);
                        });

                    return $scope.order = {name: null, city: null, telephone: null, email: null, cart: null};
                } else {
                    $scope.error.message = "Корзина пуста, вы не можете заказать пустую корзину!";
                }

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
                        //    console.log('data', data, data.products.price, "cart", item.getPrice());
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
    });
