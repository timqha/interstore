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
    .controller('CartCtrl', ['$scope','myCart','ProductsService',function($scope, myCart, ProductsService){
        $scope.myCart = myCart;
        $scope.products = [];
        if (myCart.getTotalItems() === 0)
        {
            console.log('Cart empty');

        } else {
            console.log('rock dock',myCart.getItems());
        }

        $scope.Carts = myCart.getItems();
        angular.forEach($scope.Carts, function(cart){
           // $scope.items.push(JSON.stringify(getProduct(cart.getId())));
         //  console.log(getProduct(cart.getId()));
            console.log(cart.getId());

        });

        $scope.removeItems = function(id){
            if(id){
                myCart.removeItemById(id);
            }
        };

        $scope.products = [];
        ProductsService.getProductsAll().
            then(function (data) {
                $scope.products = data.products;
                console.log( $scope.products);
                // $scope.productslast = data.productslast;
            });

        $scope.getName = function(id){
            angular.forEach($scope.products, function(product){
                if(product.id === id){
                    return product.name;
                }
            })
        };



}]);
