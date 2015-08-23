/**
 * @ngdoc controller
 * @name Cart
 *
 * @description
 * _Please update the description and dependencies._
 *
 * @requires $scope
 * */
angular.module('app')
    .controller('CartCtrl', ['$scope', 'myCart', 'myproducts', '$rootScope', 'ProductsService', function ($scope, myCart, myproducts, $rootScope, ProductsService) {
        $scope.myCart = myCart;
        /*  Проверяем не пустая ли корзина, если она пуста, не каких действий не производим.
         *   Если она не пустая, Получаем все записи в корзине.
         *   Функции: removeItems удаления записи.
         *
         * */
        if (myCart.getTotalItems() === 0) {
            console.log('Cart empty');
        } else {
            $scope.Carts = myCart.getItems();
            $scope.removeItems = function (id) {
                if (id) {
                    myCart.removeItemById(id);
                }
            };
            angular.forEach($scope.Carts, function (item) {
                angular.forEach(myproducts, function (product) {
                    if (product.id + "" == item._id) {
                        item.name = product.name;
                    }
                })
            });
        }

        // check update basket
        //Наверное это нужно вынести в сервайс или что-то подобное.
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
    }]);
