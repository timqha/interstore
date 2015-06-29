angular.module('app')
    .service('CategoryService', function ($http, $q) {
        return ({
            showCategory: showCategory,
            getCategoryAll: getCategoryAll,
            addNewCategory: addNewCategory,
            deleteCategory: deleteCategory,
            editCategory: editCategory,
            updateCategory: updateCategory

        });
        function showCategory(id) {
            var request = $http.get('api/categories/' + id);
            return (request.then(handleSuccess, handleError));

        }

        function addNewCategory(name, desc) {

            var request = $http({
                method: 'POST', // support GET, POST, PUT, DELETE
                url: '/api/categories.json',
                data: {"category": {"name": name, "desc": desc}},
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                }
            });
            return ( request.then(handleSuccess, handleError));

        }

        function getCategoryAll() {
            var request = $http.get('api/categories');
            return (request.then(handleSuccess, handleError));
        }

        function deleteCategory(id) {
            var request = $http.delete('api/categories/' + id);
            return (request.then(handleSuccess, handleError));
        }

        function updateCategory(id, name, desc) {
            var request = $http({
                method: 'PUT',
                url: '/api/categories/' + id,
                data: {"category": {"name": name, "desc": desc}},
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                }
            });
            return ( request.then(handleSuccess, handleError) );


        }

        function editCategory(id) {
            var request = $http.get('api/categories/' + id + '/edit');
            return (request.then(handleSuccess, handleError));
        }

        function handleError(response) {
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