angular.module('app')
    .service('ProductsService', function ($http, $rootScope, $auth) {

        var apiUrl = 'api/products';
        var apiUrla = 'api/products/';

        return ({
            getProductsAll:     getProductsAll,
            addNewProduct:      addNewProduct,
            showProduct:        showProduct,
            deleteProduct:      deleteProduct,
            updateProduct:      updateProduct,
            editProduct:        editProduct
        });
        function getProductsAll() {
            var request = $http({
                method: 'GET',
                url: apiUrl
            });
            return (request.then($rootScope.handleSuccess, $rootScope.handleError));
        }

        function addNewProduct(name, price, category_id, params) {
            var request = $http({
                method: 'POST',
                url: apiUrl,
                data: {"product": {"name": name, "price": price, "category_id": category_id, "params": params}},
                //headers: $auth.retrieveData('auth_headers')
                headers: {
                    'Content-Type':     $rootScope.config.heders,
                    'access-token' :    $auth.retrieveData('auth_headers')['access-token'],
                    'token-type' :      $auth.retrieveData('auth_headers')['token-type'],
                    'client' :          $auth.retrieveData('auth_headers')['client'],
                    'expiry' :          $auth.retrieveData('auth_headers')['expiry'],
                    'uid':              $auth.retrieveData('auth_headers')['uid']
                }
            });
            return (request.then($rootScope.handleSuccess, $rootScope.handleError));
        }

        function showProduct(id) {
            var request = $http.get(apiUrla + id);
            return (request.then($rootScope.handleSuccess, $rootScope.handleError));
        }

        function deleteProduct(id) {
            var request = $http({
                method: 'DELETE',
                url: apiUrla + id,
                headers: $auth.retrieveData('auth_headers')
        });
            return (request.then($rootScope.handleSuccess, $rootScope.handleError));
        }

        function updateProduct(id, name, price, category_id, params) {
            var request = $http({
                method: 'PUT',
                url: apiUrla + id,
                data: {"product": {"name": name, "price": price, "category_id": category_id, "params": params}},
            //    headers: $auth.retrieveData('auth_headers')
                headers: {
                     'Content-Type':     $rootScope.config.heders,
                     'access-token' :    $auth.retrieveData('auth_headers')['access-token'],
                     'token-type' :      $auth.retrieveData('auth_headers')['token-type'],
                     'client' :          $auth.retrieveData('auth_headers')['client'],
                     'expiry' :          $auth.retrieveData('auth_headers')['expiry'],
                     'uid':              $auth.retrieveData('auth_headers')['uid']
                }



            });
            return (request.then($rootScope.handleSuccess, $rootScope.handleError));
        }

        function editProduct(id) {
            var request = $http({
                method: 'GET',
                url: apiUrla + id + '/edit',
                headers: $auth.retrieveData('auth_headers')
            });
            return (request.then($rootScope.handleSuccess, $rootScope.handleError));
        }

    });