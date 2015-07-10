/**
 * @ngdoc service
 * @name ListOrders
 * @description
 * _Please update the description and dependencies._
 *
 * */
angular.module('admin')
    .service('ListOrdersService', function($http, $rootScope){
        return ({
            addList: addList,
            getListAll: getListAll
           // deleteList: deleteList
            /*showCategory: showCategory,
             editCategory: editCategory,
             updateCategory: updateCategory*/
        });

        function addList(orders_id, products_id, quantity){
            var request = $http({
                method: 'POST',
                url: 'api/list_orders',
                data: {"list_order":{"orders_id": orders_id, "product_id": products_id, "quantity" : quantity}},
                headers: {
                    'Content-Type': $rootScope.config.heders
                }
            });
            return (request.then($rootScope.handleSuccess, $rootScope.handleError))
        }
        function getListAll(){
            var request = $http.get('api/list_orders/');
            return (request.then($rootScope.handleSuccess, $rootScope.handleError));
        }



     /*   function showCategory(id) {
            var request = $http.get('api/categories/' + id);
            return (request.then($rootScope.handleSuccess, $rootScope.handleError));

        }

        function deleteCategory(id) {
            var request = $http.delete('api/categories/' + id);
            return (request.then($rootScope.handleSuccess, $rootScope.handleError));
        }

        function updateCategory(id, name, desc) {
            var request = $http({
                method: 'PUT',
                url: '/api/categories/' + id,
                data: {"category": {"name": name, "desc": desc}},
                headers: {
                    'Content-Type': $rootScope.config.heders
                }
            });
            return (request.then($rootScope.handleSuccess, $rootScope.handleError));


        }

        function editCategory(id) {
            var request = $http.get('api/categories/' + id + '/edit');
            return (request.then($rootScope.handleSuccess, $rootScope.handleError));
        }
*/


    });

