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
    .controller('CartCtrl', ['$scope', 'myCart','myproducts', function ($scope, myCart, myproducts) {
        $scope.myCart = myCart;
        /*  Проверяем не пустая ли корзина, если она пуста, не какихдействий не производим.
        *   Если она не пустая, Получаем все записи в корзине.
        *   Функции: удаления записи.
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

            // DELETE то что не верно. 100% а как хз. Еще и вывод цены б сделать.
            $scope.getName = function (id) {
                angular.forEach(myproducts, function (product) {
                    if (product.id+"" == id) {
                        console.log(product.name);
                        return product.name;

                    }
                })
            };

        }



    }]);
