angular.module('app')
    .service('CategoryService', function ($http, $rootScope, $auth) {
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
            return (request.then($rootScope.handleSuccess, $rootScope.handleError));

        }

        function addNewCategory(name) {

            var request = $http({
                method: 'POST',
                url: '/api/categories.json',
                data: {"category": {"name": name}},
              //  headers: $auth.retrieveData('auth_headers')
                headers: {
                    'Content-Type': $rootScope.config.heders,
                    'access-token' :    $auth.retrieveData('auth_headers')['access-token'],
                    'token-type' :      $auth.retrieveData('auth_headers')['token-type'],
                    'client' :          $auth.retrieveData('auth_headers')['client'],
                    'expiry' :          $auth.retrieveData('auth_headers')['expiry'],
                    'uid':              $auth.retrieveData('auth_headers')['uid']
                }
            /*    headers: {
                    'Content-Type': $rootScope.config.heders

                }*/
            });
            return (request.then($rootScope.handleSuccess, $rootScope.handleError));

        }

        function getCategoryAll() {
            var request = $http.get('api/categories');
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


    });