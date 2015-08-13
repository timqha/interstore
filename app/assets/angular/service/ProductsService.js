angular.module('app')
    .service('ProductsService', function ($http, $auth, ConfigANDRouts) {

        var apiUrl = ConfigANDRouts.apiUrlproducts;

        return ({
            getProductsAll:             getProductsAll,
            addNewProduct:              addNewProduct,
            showProduct:                showProduct,
            deleteProduct:              deleteProduct,
            updateProduct:              updateProduct,
            editProduct:                editProduct
        });
        function getProductsAll() {
            var request = $http({
                method: 'GET',
                url: apiUrl
            });
            return (request.then(ConfigANDRouts.handleSuccess, ConfigANDRouts.handleError));
        }

        function addNewProduct(name, price, category_id, params, data) {
            var request = $http({
                method: 'POST',
                url: apiUrl,
                data: {
                    "product": {
                        "name":         name,
                        "price":        price,
                        "category_id":  category_id,
                        "params":       params,
                        "data":        data

                    }
                },
                headers: {
                    'Content-Type':     ConfigANDRouts.config.heders,
                    'access-token' :    $auth.retrieveData('auth_headers')['access-token'],
                    'token-type' :      $auth.retrieveData('auth_headers')['token-type'],
                    'client' :          $auth.retrieveData('auth_headers')['client'],
                    'expiry' :          $auth.retrieveData('auth_headers')['expiry'],
                    'uid':              $auth.retrieveData('auth_headers')['uid']
                }
            });
            return (request.then(ConfigANDRouts.handleSuccess, ConfigANDRouts.handleError));
        }

        function showProduct(id) {
            var request = $http.get(apiUrl+ '/' + id);
            return (request.then(ConfigANDRouts.handleSuccess, ConfigANDRouts.handleError));
        }

        function deleteProduct(id) {
            var request = $http({
                method: 'DELETE',
                url: apiUrl+ '/' + id,
                headers: $auth.retrieveData('auth_headers')
        });
            return (request.then(ConfigANDRouts.handleSuccess, ConfigANDRouts.handleError));
        }

        function updateProduct(id, name, price, category_id, params, data) {
            var request = $http({
                method: 'PUT',
                url: apiUrl+ '/' + id,
                data: {
                    "product": {
                        "name":         name,
                        "price":        price,
                        "category_id":  category_id,
                        "params":       params,
                        "data":        data
                    }
                },
                headers: {
                     'Content-Type':     ConfigANDRouts.config.heders,
                     'access-token' :    $auth.retrieveData('auth_headers')['access-token'],
                     'token-type' :      $auth.retrieveData('auth_headers')['token-type'],
                     'client' :          $auth.retrieveData('auth_headers')['client'],
                     'expiry' :          $auth.retrieveData('auth_headers')['expiry'],
                     'uid':              $auth.retrieveData('auth_headers')['uid']
                }
            });
            return (request.then(ConfigANDRouts.handleSuccess, ConfigANDRouts.handleError));
        }

        function editProduct(id) {
            var request = $http({
                method: 'GET',
                url: apiUrl+ '/' + id + '/edit',
                headers: $auth.retrieveData('auth_headers')
            });
            return (request.then(ConfigANDRouts.handleSuccess, ConfigANDRouts.handleError));
        }

    });