angular.module('app')
.service('UserService', function($auth, $http, ConfigANDRouts){
        return ({
           getUser: getUser
        });

        function getUser(){
            var request = $http({
                method: 'GET',
                url: ConfigANDRouts.apiUrlusers,
             //   headers: $auth.retrieveData('auth_headers')
                headers: {
                    'access-token' :    $auth.retrieveData('auth_headers')['access-token'],
                    'token-type' :      $auth.retrieveData('auth_headers')['token-type'],
                    'client' :          $auth.retrieveData('auth_headers')['client'],
                    'expiry' :          $auth.retrieveData('auth_headers')['expiry'],
                    'uid':              $auth.retrieveData('auth_headers')['uid']
                }
            });
            return (request.then(ConfigANDRouts.handleSuccess, ConfigANDRouts.handleError));

        }

    });