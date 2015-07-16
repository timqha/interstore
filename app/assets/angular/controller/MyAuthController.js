angular.module('app')
    .controller('MyAuthRegCtrl', function($scope, $auth) {
        $scope.$on('auth:registration-email-error', function(ev, reason) {
            //$scope.error = reason.errors.full_messages[0];
            console.log(reason, ev);
            alert("Registration failed: " + reason.errors.full_messages[0]);
        });

        $scope.handleRegBtnClick = function () {

            //Перед регистрацией выходим из пользователя.
            $auth.signOut();

            //Регистрация пользователя
            $auth.submitRegistration($scope.registrationForm)
                .then(function (resp) {
                    console.log(resp);
                })
                .catch(function (resp) {
                    console.log(resp);
                });
        };
    })
    .controller('MyAuthLoginCtrl', function($scope, $auth) {
        $scope.handleLoginBtnClick = function() {
            console.log("dsd");
            $auth.submitLogin($scope.loginForm)
                .then(function (resp) {
                    console.log(resp);
                })
                .catch(function (resp) {
                    console.log(resp);
                });
        };


            $scope.handleSignOutBtnClick = function() {
                $auth.signOut()
                    .then(function(resp) {
                        // handle success response
                    })
                    .catch(function(resp) {
                        // handle error response
                    });
            };


    });
