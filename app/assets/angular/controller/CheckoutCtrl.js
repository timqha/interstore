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
    .controller('CheckoutCtrl', function($scope, OrdersService){
        $scope.order = {name: null, city: null, telephone: null, email:null, cart: null };
        $scope.Checkout = function(){
            OrdersService.addNewOrder($scope.order.name,$scope.order.city,$scope.order.telephone, $scope.order.email, $scope.order.cart);
            return  $scope.order = {name: null, city: null, telephone: null, email:null, cart: null };
        };



});
