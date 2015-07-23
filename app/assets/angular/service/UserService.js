angular.module('app')
.service('UserService', function($auth, $http){
        return ({
           getUser: getUser
        });

        function getUser(){
            return $http({
                method: 'GET',
                url: '/get_user',
                headers: $auth.retrieveData('auth_headers')
            })
        }

    });