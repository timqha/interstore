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

    .controller('ProfileOrdersCtrl', function ($q, $scope, OrdersService, $rootScope, ProductsService, UserService) {
        $scope.currentUser = null;

        $scope.orders = [];
        OrdersService.getOrdersAll()
            .then(function (data) {
                UserService.getUser()
                    .then(function (respont) {
                        // Получили текущего пользователя
                        $scope.currentUser = respont.data.user.email;
                        angular.forEach(data.order, function (order) {
                            if (order.email == $scope.currentUser) {
                                angular.forEach(order.products, function (product) {
                                    ProductsService.showProduct(product.product_id)
                                        .then(function (data) {
                                            product.name = data.product.name;
                                            product.params = data.product.params;
                                        });
                                });
                                $scope.orders.push(order);
                            }
                        });
                    });
                console.log($scope.orders);
            });
    })
    .controller('AdminProfileIndexContr', function ($scope, OrdersService, ProductsService) {
        $scope.orders = [];
        OrdersService.getOrdersAll()
            .then(function (data) {
                $scope.orders = data.order;
                angular.forEach(data.order, function (order) {
                    angular.forEach(order.products, function (product) {
                        ProductsService.showProduct(product.product_id)
                            .then(function (data) {
                                product.name = data.product.name;
                                product.params = data.product.params;
                            });
                    });
                    //order.products = ["a","s"];
                });
            });
        $scope.deleteOrder = function (id) {
            $scope.error = {message: null};
            OrdersService.deleteOrder(id)
                .then(function () {
                    $scope.error.message = "Удалено";
                });
        };
    })
    .controller('AdminProfileEditContr', function ($scope, OrdersService, $stateParams) {
        $scope.order = [];
        $scope.error = {message: null};
        OrdersService.editOrder($stateParams.orderId)
            .then(function (data) {
                $scope.order = data.order;
            });
        $scope.updateOrder = function () {
            OrdersService.updateOrder($scope.order.id, $scope.order.name, $scope.order.city, $scope.order.telephone, $scope.order.email, $scope.order.status)
                .then(function () {
                    $scope.error.message = "Сохранено";
                });
        }
    });
