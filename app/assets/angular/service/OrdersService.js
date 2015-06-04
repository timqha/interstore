angular.module('app')
.service('OrdersService', function($http){
        return ({
            getOrdersAll:  getOrdersAll,
            addNewOrder:   addNewOrder,
            showOrder:     showOrder,
            deleteOrder:   deleteOrder,
            updateOrder:   updateOrder,
            editOrder:     editOrder
        });
        function getOrdersAll(){
            var request = $http.get('api/orders');
            return (request.then(handleSuccess, handleError));
        }



        function addNewOrder(name, city, telephone, email, cart){
                var request = $http({
                    method: 'POST',
                    url: '/api/orders.json',
                    data: {"order": {"name": name, "city": city, "telephone": telephone, "email": email, "cart": cart}},
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8'
                    },
                    timeout: 3000, // Задержка на работу запроса
                    cashe: false // TODO надо посмотреть зачем
                });
                return ( request.then(handleSuccess, handleError) );
        }


        function showOrder(id){
            var request = $http.get('api/orders/'+id);
            return (request.then(handleSuccess, handleError));
        }
        function deleteOrder(id){
            var request = $http.delete('api/orders/'+id);
            return (request.then(handleSuccess, handleError));
        }
        function updateOrder(id, name, city, telephone, email, cart){
            var request = $http({
                method: 'PUT',
                url: '/api/products/'+id,
                data: {"product": {"name": name, "city": city, "telephone": telephone, "email": email, "cart": cart}},
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                },
                timeout: 3000, // Задержка на работу запроса
                cashe: false // TODO надо посмотреть зачем
            });
            return ( request.then(handleSuccess, handleError) );
        }
        function editOrder(id){
            var request = $http.get('api/orders/'+id+'/edit');
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