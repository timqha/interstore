angular.module('app')
.service('ProductsService', function($http){
        return ({
            getProductsAll:  getProductsAll,
            addNewProduct:   addNewProduct,
            showProduct:     showProduct,
            deleteProduct:   deleteProduct,
            updateProduct:   updateProduct,
            editProduct:     editProduct
        });
        function getProductsAll(){
            var request = $http.get('api/products');
            return (request.then(handleSuccess, handleError));
        }
        function addNewProduct(name, price, category_id, params){
                var request = $http({
                    method: 'POST',
                    url: '/api/products.json',
                    data: {"product": {"name": name, "price": price, "category_id": category_id, "params": params}},
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8'
                    },
                    timeout: 3000, // Задержка на работу запроса
                    cashe: false // TODO надо посмотреть зачем
                });
                return ( request.then(handleSuccess, handleError) );
        }

//{"category" : {"name":"Ноутбуки","desc": '{"white":false,"black":false}' }}
        function showProduct(id){
            var request = $http.get('api/products/'+id);
            return (request.then(handleSuccess, handleError));
        }
        function deleteProduct(id){
            var request = $http.delete('api/products/'+id);
            return (request.then(handleSuccess, handleError));
        }
        function updateProduct(id, name, price, category_id, params){
            var request = $http({
                method: 'PUT',
                url: '/api/products/'+id,
                data: {"product": {"name": name, "price": price, "category_id": category_id, "params": params}},
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                },
                timeout: 3000, // Задержка на работу запроса
                cashe: false // TODO надо посмотреть зачем
            });
            return ( request.then(handleSuccess, handleError) );
        }
        function editProduct(id){
            var request = $http.get('api/products/'+id+'/edit');
            return (request.then(handleSuccess, handleError));
        }

        /* private methods */
        function handleError(response,$q) {
            if (
                !angular.isObject(response.data) || !response.data.message
            ) {
                return ( $q.reject("An unknown error occurred.") );
            }
            return ( $q.reject(response.data.message) );
        }
        function handleSuccess(response) {
            return ( response.data );
        }

    });