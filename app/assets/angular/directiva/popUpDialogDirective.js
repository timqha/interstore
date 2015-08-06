/**
 * @ngdoc directive
 * @name PopupDialog
 *
 * @description
 * _Please update the description and restriction._
 *
 * @restrict A
 * */
angular.module('app')
    .directive('popUpDialog', function () {
        return {
            restrict: 'E',
            scope: false,
            templateUrl: 'directive/popUpDialog.html',
            controller: function($scope){
                $scope.showPopUpDialog = false;
                $scope.closePopUpDialog = function(){
                    $scope.showPopUpDialog = false;
                }

            }
        };
})
    .directive('popUpDialogTwo', function () {
        return {
            restrict: 'E',
            scope: false,
            templateUrl: 'directive/popUpDialogTwo.html',
            controller: function($scope){
                $scope.showPopUpDialogTwo = false;
                $scope.closePopUpDialogTwo = function(){
                    $scope.showPopUpDialogTwo = false;
                };
                $scope.popUpDialogYes = function(){
                    // Обращения к скопу в контроллере что использует директиву
                    $scope[$scope.popUpDialogCallback]();
                    $scope.showPopUpDialogTwo = false;
                }

            }
        };
    });
