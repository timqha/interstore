angular.module('app')
.service('UserService', function($auth, $http, ConfigANDRouts){
        return ({
           getUser: getUser
        });

        function getUser(){
            var request = $http({
                method: 'GET',
                url: ConfigANDRouts.apiUrlusers,
                headers: $auth.retrieveData('auth_headers')
            });
            return (request.then(ConfigANDRouts.handleSuccess, ConfigANDRouts.handleError));

        }

    });