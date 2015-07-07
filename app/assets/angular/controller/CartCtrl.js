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
            angular.forEach($scope.Carts, function(item){
                angular.forEach(myproducts, function (product) {
                    if (product.id+"" == item._id) {
                        item.name = product.name;
                    }
                })
            });


        }



    }]);
