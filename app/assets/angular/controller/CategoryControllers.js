'use strict';
angular.module('app')
    .controller("CategoryShowCtrl", function($scope,CategoryService, $routeParams, $http){
        $scope.category = [];
        $scope.products = [];
        $scope.colors = {};

        CategoryService.showCategory($routeParams.categoryId).then(function(data){
            $scope.category = data.category;
            $scope.colors = JSON.parse(data.category.desc);
            $scope.products = data.products;

            $scope.ncolors = data.colors;
                for(var i=0; i<$scope.ncolors.length;i++){
                    $scope.ncolors[i].check = true;
                }
            console.log($scope.ncolors);
          /*  $scope.ncolors = [
                {params:'red',          check:true},
                {params:'white',        check:true},
                {params:'black',        check:true},
                {params:'green',        check:true},
                {params:'gray',         check:true},
                {params:'lightgray',    check:true},
                {params:'borow',        check:true},
                {params:'yellow',       check:true},
                {params:'blue',         check:true}];
*/
            $scope.filtred = angular.copy($scope.ncolors);

            $scope.checking = function(color){
                var Filtred = $scope.filtred;
                var flag = 10;
                if(color.check==true)
                {
                    Filtred.push(color);
                }
                else if(color.check==false){
                    for (var i = 0; i < Filtred.length; i++) {
                        if(Filtred[i].params == color.params) {
                            flag = 10;
                            Filtred.splice(i,1)
                        }

                    }
                }
                console.log("return",Filtred, flag);
            };

        });

        $scope.priceFilter = {min:0, max:100000};
    });
angular.module("admin")
    .controller("Category", function($scope, CategoryService){
        // for category/index
        $scope.categories = CategoryService.getCategoryAll().
            then(function(data,status) {
                $scope.categories = data;
                //  console.log(status);
            });
        $scope.priceFilter = {min:0, max:100000};
        $scope.deleteCategory = function(id){
            CategoryService.deleteCategory(id)
                .then(function(data,status){
            //        console.log(status);
                    if(status == 204) {
                        console.log('category delete');
                    }
                });
        }
    })
    .controller("CategoryEdit", function($scope,CategoryService, $routeParams){
        $scope.category = CategoryService.editCategory($routeParams.categoryId)
            .then(function(data){
                $scope.category = data;
            //    console.log(data);
            });

        $scope.updateCategory = function(){
            CategoryService.updateCategory($scope.category.id,$scope.category.name,$scope.category.desc);

        }
    })
    .controller("CategoryShow", function($scope, $routeParams,$http, CategoryService){
        $scope.category = CategoryService.showCategory($routeParams.categoryId)
            .then(function(data){
              //  console.log(data);
                $scope.category = data.category;
            });
    })
    .controller('NewCategoryController', function ($http, $scope, CategoryService) {
        $scope.new_category = {name: null, desc: '{"white":false,"black":false}'};
        $scope.addNewCategory = function(){
            CategoryService.addNewCategory($scope.new_category.name,$scope.new_category.desc)
                .then(function(data){
                  //  console.log(data);

                });

            return $scope.new_category = {name: null, desc: '{"white":false,"black":false}'};
        };
    });