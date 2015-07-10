/**
 * @ngdoc controller
 * @name profile
 *
 * @description
 * _Please update the description and dependencies._
 *
 * @requires $scope
 * */
angular.module('app')
    .controller('ProfileCtrl', function($scope, OrdersService, $rootScope){
        $scope.currentUser = $rootScope.globals.currentUser.username;
        $scope.orders = [];
        OrdersService.getOrdersAll()
            .then(function(data){
                angular.forEach(data, function(order){
                    if(order.email == $scope.currentUser){
                        $scope.orders.push(order);
                    }
                });
            })
            .catch(function(data){
                console.log(data);
            });

    })
    .controller('AdminProfileIndexContr', function($scope, OrdersService){
        $scope.orders = [];
        OrdersService.getOrdersAll()
            .then(function(data){
                $scope.orders = data;
            });
        $scope.deleteOrder = function (id) {
            $scope.error = {message: null};
            OrdersService.deleteOrder(id)
                .then(function () {
                    $scope.error.message = "Удалено";
                });
        };

    })
    .controller('AdminProfileEditContr', function($scope, OrdersService, $stateParams){
        $scope.order = [];
        $scope.error = {message: null};
        OrdersService.editOrder($stateParams.orderId)
            .then(function (data){
                $scope.order = data.order;
            });
        $scope.updateOrder = function(){
            OrdersService.updateOrder($scope.order.id, $scope.order.name, $scope.order.city, $scope.order.telephone, $scope.order.email, $scope.order.cart, $scope.order.status)
                .then(function () {
                    $scope.error.message = "Сохранено";
                });
        }

    });
