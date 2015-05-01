angular.module("app")
.controller('LoginCtrl', function LoginController($scope, $http){
        $scope.login_user = {email: null, password: null};

       // console.log('it work');
        $scope.login = function() {
            $http.post('../users/sign_in.jsonuser: {email: $scope.login_user.email, password: $scope.login_user.password}');
        };

        $scope.logout = function() {
            $http({method: 'DELETE', url: '../users/sign_out.json', data: {}});
        };
    });

