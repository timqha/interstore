angular.module('app')
.service('UserService', function($auth, $http,$rootScope){
        return ({
           getUser: getUser
        });

        function getUser(){
            var request = $http({
                method: 'GET',
                url: 'api/v1/profile',
             //   headers: $auth.retrieveData('auth_headers')
                headers: {
                    'access-token' :    $auth.retrieveData('auth_headers')['access-token'],
                    'token-type' :      $auth.retrieveData('auth_headers')['token-type'],
                    'client' :          $auth.retrieveData('auth_headers')['client'],
                    'expiry' :          $auth.retrieveData('auth_headers')['expiry'],
                    'uid':              $auth.retrieveData('auth_headers')['uid']
                }
            });
            return (request.then($rootScope.handleSuccess, $rootScope.handleError));

        }

    });