angular.module('app')
    .service('OrdersService', function ($http, $auth, ConfigANDRouts) {
        var apiUrlorders = ConfigANDRouts.apiUrlorders;

        return ({
            getOrdersAll:               getOrdersAll,
            addNewOrder:                addNewOrder,
            showOrder:                  showOrder,
            deleteOrder:                deleteOrder,
            updateOrder:                updateOrder,
            editOrder:                  editOrder
        });
        function getOrdersAll() {
            var request = $http.get(apiUrlorders);
            return (request.then(ConfigANDRouts.handleSuccess, ConfigANDRouts.handleError));
        }

        function addNewOrder(name, city, telephone, email, status, products) {
            var request = $http({
                method: 'POST',
                url: apiUrlorders,
                data: {
                    "order": {
                        "name":         name,
                        "city":         city,
                        "telephone":    telephone,
                        "email":        email,
                        "status":       status,
                        "products":     products
                    }
                },
                headers: $auth.retrieveData('auth_headers')
            });
            return (request.then(ConfigANDRouts.handleSuccess, ConfigANDRouts.handleError));
        }

        function showOrder(id) {
            var request = $http.get(apiUrlorders + '/' + id);
            return (request.then(ConfigANDRouts.handleSuccess, ConfigANDRouts.handleError));
        }

        function deleteOrder(id) {
            var request = $http({
                method: 'DELETE',
                url: apiUrlorders + '/' + id,
                headers: $auth.retrieveData('auth_headers')
            });
            return (request.then(ConfigANDRouts.handleSuccess, ConfigANDRouts.handleError));
        }

        function updateOrder(id, name, city, telephone, email, status) {
            var request = $http({
                method: 'PUT',
                url: apiUrlorders + '/' + id,
                data: {
                    "order": {
                        "name":         name,
                        "city":         city,
                        "telephone":    telephone,
                        "email":        email,
                        "status":       status
                    }
                },
                headers: $auth.retrieveData('auth_headers')

            });
            return (request.then(ConfigANDRouts.handleSuccess, ConfigANDRouts.handleError));
        }

        function editOrder(id) {
            var request = $http({
                method: 'GET',
                url: apiUrlorders + '/' + id + '/edit',
                headers: $auth.retrieveData('auth_headers')
            });
            return (request.then(ConfigANDRouts.handleSuccess, ConfigANDRouts.handleError));
        }

    });