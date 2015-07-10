angular.module('app')
    .service('ProductsService', function ($http, $rootScope) {


        return ({
            getProductsAll:     getProductsAll,
            addNewProduct:      addNewProduct,
            showProduct:        showProduct,
            deleteProduct:      deleteProduct,
            updateProduct:      updateProduct,
            editProduct:        editProduct
        });
        function getProductsAll() {
            var request = $http.get('api/products');
            return (request.then($rootScope.handleSuccess, $rootScope.handleError));
        }

        function addNewProduct(name, price, category_id, params) {
            var request = $http({
                method: 'POST',
                url: '/api/products.json',
                data: {"product": {"name": name, "price": price, "category_id": category_id, "params": params}},
                headers: {
                    'Content-Type': $rootScope.config.heders
                }
            });
            return (request.then($rootScope.handleSuccess, $rootScope.handleError));
        }

        function showProduct(id) {
            var request = $http.get('api/products/' + id);
            return (request.then($rootScope.handleSuccess, $rootScope.handleError));
        }

        function deleteProduct(id) {
            var request = $http.delete('api/products/' + id);
            return (request.then($rootScope.handleSuccess, $rootScope.handleError));
        }

        function updateProduct(id, name, price, category_id, params) {
            var request = $http({
                method: 'PUT',
                url: '/api/products/' + id,
                data: {"product": {"name": name, "price": price, "category_id": category_id, "params": params}},
                headers: {
                    'Content-Type':  $rootScope.config.heders
                }
            });
            return (request.then($rootScope.handleSuccess, $rootScope.handleError));
        }

        function editProduct(id) {
            var request = $http.get('api/products/' + id + '/edit');
            return (request.then($rootScope.handleSuccess, $rootScope.handleError));
        }

    });