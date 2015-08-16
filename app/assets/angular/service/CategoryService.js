angular.module('app')
    .service('CategoryService', function ($http, $auth, ConfigANDRouts) {
        var apiUrlcategories = ConfigANDRouts.apiUrlcategories;

        return ({
            showCategory:               showCategory,
            getCategoryAll:             getCategoryAll,
            addNewCategory:             addNewCategory,
            deleteCategory:             deleteCategory,
            editCategory:               editCategory,
            updateCategory:             updateCategory
        });
        function showCategory(id) {
            var request = $http.get(apiUrlcategories + '/' + id);
            return (request.then(ConfigANDRouts.handleSuccess, ConfigANDRouts.handleError));
        }

        function addNewCategory(name) {
            var request = $http({
                method: 'POST',
                url: apiUrlcategories,
                data: {"category": {"name": name}},
                headers: $auth.retrieveData('auth_headers')
            });
            return (request.then(ConfigANDRouts.handleSuccess, ConfigANDRouts.handleError));
        }

        function getCategoryAll() {
            var request = $http.get(apiUrlcategories);
            return (request.then(ConfigANDRouts.handleSuccess, ConfigANDRouts.handleError));
        }

        function deleteCategory(id) {
            var request = $http({
                method: 'delete',
                url: apiUrlcategories + '/' + id,
                headers: $auth.retrieveData('auth_headers')
            });
            return (request.then(ConfigANDRouts.handleSuccess, ConfigANDRouts.handleError));
        }

        function updateCategory(id, name, desc) {
            var request = $http({
                method: 'PUT',
                url: apiUrlcategories + '/' + id,
                data: {"category": {"name": name, "desc": desc}},
                headers: $auth.retrieveData('auth_headers')
            });
            return (request.then(ConfigANDRouts.handleSuccess, ConfigANDRouts.handleError));
        }

        function editCategory(id) {
            var request = $http.get(apiUrlcategories + '/' + id + '/edit');
            return (request.then(ConfigANDRouts.handleSuccess, ConfigANDRouts.handleError));
        }

    });