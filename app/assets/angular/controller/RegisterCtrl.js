/**
 * @ngdoc controller
 * @name RegisterCtrl
 *
 * @description
 * _Please update the description and dependencies._
 *
 * @requires $scope
 * */
angular.module('app')
    .controller('RegisterCtrl', function ($scope, $http, AuthCookie) {

        $scope.login_user = {email: null, password: null};
        $scope.login_error = {message: null, errors: {}};
        $scope.register_user = {email: null, password: null, password_confirmation: null};
        $scope.register_error = {message: null, errors: {}};

        $scope.login = function () {
            $scope.submit({
                method: 'POST',
                url: '../users/sign_in.json',
                data: {user: {email: $scope.login_user.email, password: $scope.login_user.password}},
                success_message: "You have been logged in.",
                error_entity: $scope.login_error
            });
        };

        $scope.logout = function () {
            $scope.submit({
                method: 'DELETE',
                url: '../users/sign_out.json',
                success_message: "You have been logged out.",
                error_entity: $scope.login_error
            });
        };

        $scope.password_reset = function () {
            $scope.submit({
                method: 'POST',
                url: '../users/password.json',
                data: {user: {email: $scope.login_user.email}},
                success_message: "Reset instructions have been sent to your e-mail address.",
                error_entity: $scope.login_error
            });
        };

        $scope.unlock = function () {
            $scope.submit({
                method: 'POST',
                url: '../users/unlock.json',
                data: {user: {email: $scope.login_user.email}},
                success_message: "An unlock e-mail has been sent to your e-mail address.",
                error_entity: $scope.login_error
            });
        };

        $scope.confirm = function () {
            $scope.submit({
                method: 'POST',
                url: '../users/confirmation.json',
                data: {user: {email: $scope.login_user.email}},
                success_message: "A new confirmation link has been sent to your e-mail address.",
                error_entity: $scope.login_error
            });
        };

        $scope.register = function () {
            $scope.submit({
                method: 'POST',
                url: '../users.json',
                data: {
                    user: {
                        email: $scope.register_user.email,
                        password: $scope.register_user.password,
                        password_confirmation: $scope.register_user.password_confirmation
                    }
                },
                success_message: "You have been registered and logged in.",
                error_entity: $scope.register_error
            });
        };

        $scope.change_password = function () {
            $scope.submit({
                method: 'PUT',
                url: '../users/password.json',
                data: {
                    user: {
                        email: $scope.register_user.email,
                        password: $scope.register_user.password,
                        password_confirmation: $scope.register_user.password_confirmation
                    }
                },
                success_message: "Your password has been updated.",
                error_entity: $scope.register_error
            });
        };

        $scope.submit = function (parameters) {
            $scope.reset_messages();

            $http({
                method: parameters.method,
                url: parameters.url,
                data: parameters.data
            })
                .success(function (data, status) {
                    console.log(data);
                    if (status == 201 || status == 204) {
                        parameters.error_entity.message = parameters.success_message;
                        $scope.reset_users();
                        if (status == 201) {
                            AuthCookie.SetCredentials(parameters.data.user.email, parameters.data.user.password);
                        }
                        if (status == 204) {
                            AuthCookie.ClearCredentials();
                        }


                    } else {
                        if (data.error) {
                            parameters.error_entity.message = data.error;
                        } else {
                            // note that JSON.stringify is not supported in some older browsers, we're ignoring that
                            parameters.error_entity.message = "Success, but with an unexpected success code, potentially a server error, please report via support channels as this indicates a code defect.  Server response was: " + JSON.stringify(data);
                        }
                    }
                })
                .error(function (data, status) {
                    if (status == 422) {
                        parameters.error_entity.errors = data.errors;
                    } else {
                        if (data.error) {
                            parameters.error_entity.message = data.error;
                        } else {
                            // note that JSON.stringify is not supported in some older browsers, we're ignoring that
                            parameters.error_entity.message = "Unexplained error, potentially a server error, please report via support channels as this indicates a code defect.  Server response was: " + JSON.stringify(data);
                        }
                    }
                });
        };

        $scope.reset_messages = function () {
            $scope.login_error.message = null;
            $scope.login_error.errors = {};
            $scope.register_error.message = null;
            $scope.register_error.errors = {};
        };

        $scope.reset_users = function () {
            $scope.login_user.email = null;
            $scope.login_user.password = null;
            $scope.register_user.email = null;
            $scope.register_user.password = null;
            $scope.register_user.password_confirmation = null;
        };


    });
