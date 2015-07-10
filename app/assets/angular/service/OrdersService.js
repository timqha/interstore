angular.module('app')
    .service('OrdersService', function ($http, $rootScope) {
        return ({
            getOrdersAll:    getOrdersAll,
            addNewOrder:     addNewOrder,
            showOrder:       showOrder,
            deleteOrder:     deleteOrder,
            updateOrder:     updateOrder,
            editOrder:       editOrder
        });
        function getOrdersAll() {
            var request = $http.get('api/orders');
            return (request.then($rootScope.handleSuccess, $rootScope.handleError));
        }


        function addNewOrder(name, city, telephone, email, cart, status) {
            var request = $http({
                method: 'POST',
                url: '/api/orders.json',
                data: {"order": {"name": name, "city": city, "telephone": telephone, "email": email, "cart": cart, "status": status}},
                headers: {
                    'Content-Type': $rootScope.config.heders
                }
            });
            return (request.then($rootScope.handleSuccess, $rootScope.handleError));
        }


        function showOrder(id) {
            var request = $http.get('api/orders/' + id);
            return (request.then($rootScope.handleSuccess, $rootScope.handleError));
        }

        function deleteOrder(id) {
            var request = $http.delete('api/orders/' + id);
            return (request.then($rootScope.handleSuccess, $rootScope.handleError));
        }

        function updateOrder(id, name, city, telephone, email, cart, status) {
            var request = $http({
                method: 'PUT',
                url: '/api/orders/' + id,
                data: {"order": {"name": name, "city": city, "telephone": telephone, "email": email, "cart": cart, "status": status}},
                headers: {
                    'Content-Type': $rootScope.config.heders
                }
            });
            return (request.then($rootScope.handleSuccess, $rootScope.handleError));
        }

        function editOrder(id) {
            var request = $http.get('api/orders/' + id + '/edit');
            return (request.then($rootScope.handleSuccess, $rootScope.handleError));
        }

    });