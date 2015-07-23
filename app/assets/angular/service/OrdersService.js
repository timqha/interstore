angular.module('app')
    .service('OrdersService', function ($http, $rootScope,$auth) {
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


        function addNewOrder(name, city, telephone, email, status, products) {
            var request = $http({
                method: 'POST',
                url: '/api/orders.json',
                data: {"order": {"name": name, "city": city, "telephone": telephone, "email": email, "status": status, "products": products}},

                headers: $auth.retrieveData('auth_headers')
                /*headers: {
                    'Content-Type': $rootScope.config.heders,
                    'access-token' :    $auth.retrieveData('auth_headers')['access-token'],
                    'token-type' :      $auth.retrieveData('auth_headers')['token-type'],
                    'client' :          $auth.retrieveData('auth_headers')['client'],
                    'expiry' :          $auth.retrieveData('auth_headers')['expiry'],
                    'uid':              $auth.retrieveData('auth_headers')['uid']
                }*/
            });
            return (request.then($rootScope.handleSuccess, $rootScope.handleError));
        }


        function showOrder(id) {
            var request = $http.get('api/orders/' + id);
            return (request.then($rootScope.handleSuccess, $rootScope.handleError));
        }

        function deleteOrder(id) {
            var request = $http({
                method: 'DELETE',
                url: 'api/orders/' + id,
                headers: $auth.retrieveData('auth_headers')
                /*headers: {
                    'access-token' :    $auth.retrieveData('auth_headers')['access-token'],
                    'token-type' :      $auth.retrieveData('auth_headers')['token-type'],
                    'client' :          $auth.retrieveData('auth_headers')['client'],
                    'expiry' :          $auth.retrieveData('auth_headers')['expiry'],
                    'uid':              $auth.retrieveData('auth_headers')['uid']
                }*/

            });

            return (request.then($rootScope.handleSuccess, $rootScope.handleError));


        }


        function updateOrder(id, name, city, telephone, email, status) {
            var request = $http({
                method: 'PUT',
                url: '/api/orders/' + id,
                data: {"order": {"name": name, "city": city, "telephone": telephone, "email": email, "status": status}},
                headers: $auth.retrieveData('auth_headers')
                /*headers: {
                    'Content-Type': $rootScope.config.heders,
                    'access-token' :    $auth.retrieveData('auth_headers')['access-token'],
                    'token-type' :      $auth.retrieveData('auth_headers')['token-type'],
                    'client' :          $auth.retrieveData('auth_headers')['client'],
                    'expiry' :          $auth.retrieveData('auth_headers')['expiry'],
                    'uid':              $auth.retrieveData('auth_headers')['uid']
                }*/
            });
            return (request.then($rootScope.handleSuccess, $rootScope.handleError));
        }

        function editOrder(id) {
            var request = $http.get('api/orders/' + id + '/edit');
            return (request.then($rootScope.handleSuccess, $rootScope.handleError));
        }

    });