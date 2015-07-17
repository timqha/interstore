angular.module('app')
    .controller('ProfileUserCtrl', function($scope, $auth){
        $scope.handleUpdateAccountBtnClick = function() {
            $auth.updateAccount($scope.updateAccountForm)
                .then(function(resp) {
                    console.log(resp);
                    // handle success response
                })
                .catch(function(resp) {
                    // handle error response
                    console.log(resp);
                });
        };
    })

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


    })
    .controller('MyAuthResetCtrl', function($scope, $auth){
        $scope.$on('auth:password-reset-request-success', function(ev, data) {
            alert("Password reset instructions were sent to " + data.email);
        });
        $scope.$on('auth:password-reset-request-error', function(ev, resp) {
            alert("Password reset request failed: " + resp.errors[0]);
        });
        $scope.handlePwdResetBtnClick = function() {
            $auth.requestPasswordReset($scope.pwdResetForm)
                .then(function(resp) {
                    // handle success response
                })
                .catch(function(resp) {
                    // handle error response
                });
        };
    })

    .controller('MyAuthResetSaveCtrl', function($scope, $auth){
        // Создается пустая форма для ввода нового пароля, после ввода -> сохраняем пароль.
            $scope.handleUpdatePasswordBtnClick = function() {
                $auth.updatePassword($scope.updatePasswordForm)
                    .then(function(resp) {
                        // handle success response
                    })
                    .catch(function(resp) {
                        // handle error response
                    });
            };
    })

    .controller('MyAuthDestroyCtrl', function($scope, $auth){
        $scope.$on('auth:account-destroy-success', function(ev) {
            alert("Your account has been successfully destroyed!");
        });

        $scope.$on('auth:account-destroy-error', function(ev, reason) {
            alert("Account deletion failed: " + reason.errors[0]);
        });

        console.log("destoy account!");
        $scope.handleDestroyAccountBtnClick = function() {
            $auth.destroyAccount()
                .then(function(resp) {
                    // handle success response
                })
                .catch(function(resp) {
                    // handle error response
                });
        };
    })


;
