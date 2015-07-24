angular.module('app')
    .service('CategoryService', function ($http, $rootScope, $auth) {
        var apiUrlcategory = 'api/categories/';
        var apiUrlcategories = 'api/categories';
        return ({
            showCategory: showCategory,
            getCategoryAll: getCategoryAll,
            addNewCategory: addNewCategory,
            deleteCategory: deleteCategory,
            editCategory: editCategory,
            updateCategory: updateCategory

        });
        function showCategory(id) {
            var request = $http.get(apiUrlcategory + id);
            return (request.then($rootScope.handleSuccess, $rootScope.handleError));

        }

        function addNewCategory(name) {

            var request = $http({
                method: 'POST',
                url: apiUrlcategories,
                data: {"category": {"name": name}},

                // После подобного все остается работать, если просто $auth.retrieveData('auth_headers') все в небытие
                headers: {
                    'Content-Type': $rootScope.config.heders,
                    'access-token' :    $auth.retrieveData('auth_headers')['access-token'],
                    'token-type' :      $auth.retrieveData('auth_headers')['token-type'],
                    'client' :          $auth.retrieveData('auth_headers')['client'],
                    'expiry' :          $auth.retrieveData('auth_headers')['expiry'],
                    'uid':              $auth.retrieveData('auth_headers')['uid']
                }

            });
            return (request.then($rootScope.handleSuccess, $rootScope.handleError));

        }

        function getCategoryAll() {
            var request = $http.get(apiUrlcategories);
            return (request.then($rootScope.handleSuccess, $rootScope.handleError));
        }

        function deleteCategory(id) {

            var request = $http({
                method: 'delete',
                url: apiUrlcategory + id,
                headers: $auth.retrieveData('auth_headers')
            });
            return (request.then($rootScope.handleSuccess, $rootScope.handleError));
        }

        function updateCategory(id, name, desc) {
            var request = $http({
                method: 'PUT',
                url: apiUrlcategory + id,
                data: {"category": {"name": name, "desc": desc}},
                headers: {
                    'Content-Type': $rootScope.config.heders
                }
            });
            return (request.then($rootScope.handleSuccess, $rootScope.handleError));


        }

        function editCategory(id) {
            var request = $http.get(apiUrlcategory + id + '/edit');
            return (request.then($rootScope.handleSuccess, $rootScope.handleError));
        }


    });