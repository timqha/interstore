/**
 * @ngdoc service
 * @name AuthCookie
 * @description
 * _Please update the description and dependencies._
 *
 * */
angular.module('admin')
    .service('AuthCookie', function(Base64, $cookieStore, $rootScope,$http){

            return({
                SetCredentials:   SetCredentials,
                ClearCredentials: ClearCredentials

            });
        function SetCredentials(username, password) {
            var authdata = Base64.encode(username + ':' + password);

            $rootScope.globals = {
                currentUser: {
                    username: username,
                    authdata: authdata
                }
            };

            $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata; // jshint ignore:line
            $cookieStore.put('globals', $rootScope.globals);
        }

        function ClearCredentials() {
            $rootScope.globals = {};
            $cookieStore.remove('globals');
            $http.defaults.headers.common.Authorization = 'Basic ';
        }

});

