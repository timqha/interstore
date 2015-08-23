angular.module('app')
    .controller('ProfileUserCtrl', function($scope, $state, $auth, UserService, Flash){

        $scope.updateAccountForm = {name: null, city: null, telephone: null, email:null, age: null, sex:null};

        UserService.getUser()
            .then(function(data){
                $scope.updateAccountForm = data.data.user;
            })
            .catch(function(data){
                console.log(data);
            });

        $scope.handleUpdateAccountBtnClick = function() {
            $auth.updateAccount($scope.updateAccountForm)
                .then(function(resp) {
                    // handle success response
                })
                .catch(function(resp) {
                    // handle error response
                });
        };
        $scope.$on('auth:account-update-success', function(ev) {
               $state.go('home');
               var message = "Your account has been successfully updated!";
               Flash.create('success', message, 'custom-class');
        });
        $scope.$on('auth:account-update-error', function(ev, reason) {
                var message = "Registration failed: " + reason.errors[0];
                Flash.create('danger', message, 'custom-class');
        });
    })
    .controller('MyAuthRegCtrl', function($scope, $auth, Flash) {
        $scope.$on('auth:registration-email-error', function(ev, reason) {
            var message = "Registration failed: " + reason.errors.full_messages[0];
            Flash.create('danger', message, 'custom-class');
           /* console.log(reason, ev);
            alert("Registration failed: " + reason.errors.full_messages[0]);*/
        });

        $scope.handleRegBtnClick = function () {
            //Перед регистрацией выходим из пользователя.
            $auth.signOut();
            //Регистрация пользователя
            $auth.submitRegistration($scope.registrationForm)
                .then(function (resp) {
                })
                .catch(function (resp) {
                });
        };
    })
    .controller('MyAuthLoginCtrl', function($scope, $auth) {
        $scope.handleLoginBtnClick = function() {
            $auth.submitLogin($scope.loginForm)
                .then(function (resp) {

                })
                .catch(function (resp) {

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
    .controller('MyAuthResetCtrl', function($scope, $auth, Flash){
        $scope.$on('auth:password-reset-request-success', function(ev, data) {
            var message = "Password reset instructions were sent to " + data.email;
            Flash.create('success', message, 'custom-class');
        });
        $scope.$on('auth:password-reset-request-error', function(ev, resp) {
            var message = "Password reset request failed: " + resp.errors[0];
            Flash.create('danger', message, 'custom-class');
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

    .controller('MyAuthDestroyCtrl', function($scope, $auth, Flash){
        $scope.$on('auth:account-destroy-success', function(ev) {
            var message = "Your account has been successfully destroyed!";
            Flash.create('success', message, 'custom-class');
        });

        $scope.$on('auth:account-destroy-error', function(ev, reason) {
            var message = "Account deletion failed: " + reason.errors[0];
            Flash.create('danger', message, 'custom-class');
        });

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
