angular.module('app')
.controller('MyController', function($scope, $http){
        $scope.name = "work MyController";
        $scope.categories = [];
        $scope.colors = {};
        $http.get('api/categories').success(function (data) {
            $scope.categories = data;
        //    console.log(data);
        }).
            error(function (data) {
                console.log(data);
            });
    });
