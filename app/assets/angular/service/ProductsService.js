angular.module('app')
    .service('ProductsService', function ($http, $auth, ConfigANDRouts, Upload) {

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

        function addNewProduct(name, price, category_id, params, file) {
            var request = Upload.upload({
                method: 'POST',
                url: apiUrl,
                fields: {
                    'product[name]': name,
                    'product[price]': price,
                    'product[category_id]': category_id,
                    'product[params]':params
                },
                file: file,
                fileFormDataName: 'product[image]',

                headers: $auth.retrieveData('auth_headers')
            });
            return (request.then(ConfigANDRouts.handleSuccess, ConfigANDRouts.handleError));
        }

        function updateProduct(id, name, price, category_id, params, file) {
            var request = Upload.upload({
                method: 'PUT',
                url: apiUrl+ '/' + id,
                fields: {
                    'product[name]': name,
                    'product[price]': price,
                    'product[category_id]': category_id,
                    'product[params]':params
                },
                file: file,
                fileFormDataName: 'product[image]',

                headers: $auth.retrieveData('auth_headers')
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

        function editProduct(id) {
            var request = $http({
                method: 'GET',
                url: apiUrl+ '/' + id + '/edit',
                headers: $auth.retrieveData('auth_headers')
            });
            return (request.then(ConfigANDRouts.handleSuccess, ConfigANDRouts.handleError));
        }

    });