'use strict';
angular.module('app')
    .controller("CategoryShowCtrl", function ($scope, CategoryService, $stateParams, ConfigANDRouts,$state) {


        $scope.category = [];
        $scope.products = [];
        $scope.colors = {};
        $scope.priceFilter = {min: 1, max: 900000000};

        /*pagination*/

        if($stateParams.page == 0){
            $scope.currentPage = 1;
        } else {
            $scope.currentPage = $stateParams.page;
        }
        if($stateParams.pagesize){
            console.log($stateParams.pagesize);
            $scope.pageSize = parseInt($stateParams.pagesize);
        } else {
            $scope.pageSize = 3;
        }

        $scope.$watch('currentPage', function () {
            $state.go('.', {page: $scope.currentPage}, { notify: false });
        });
        $scope.$watch('pageSize', function () {
            console.log($scope.pageSize);
            $state.go('.', {pagesize: $scope.pageSize}, { notify: false });
        });

        /*end pagination */

        $scope.$watch('priceFilter.max', function () {
            $state.go('.', {max: $scope.priceFilter.max}, { notify: false });
        });
        $scope.$watch('priceFilter.min', function () {
            $state.go('.', {min: $scope.priceFilter.min}, { notify: false });
        });


        CategoryService.showCategory($stateParams.categoryId)
            .then(function (data) {
                $scope.category = data.category;
                $scope.products = data.products;
                $scope.maxprice = data.maxprice;

                angular.forEach($scope.products, function(product){
                    if(product.image_uid)
                        product.image_uid = ConfigANDRouts.baseImage+product.image_uid;
                });

                /*pagination*/
                if($stateParams.min){
                    $scope.priceFilter.min = parseInt($stateParams.min);
                } else {
                    $scope.priceFilter.min = 1;
                }
                if($stateParams.max){
                    $scope.priceFilter.max =  $stateParams.max;
                } else {
                    $scope.priceFilter.max =  $scope.maxprice;
                }
                /*end pagination*/

                $scope.Filtr = [];
                $scope.ncolors = data.colors;
                /*Зачекаем всёв false*/
                for (var i = 0; i < $scope.ncolors.length; i++) {
                    $scope.ncolors[i].check = false;
                }
                /* Зачекаем в true */
                if($stateParams.color){
                    $scope.filtrs = $stateParams.color;
                    for(var item = 0 ; item < $scope.filtrs.length; item++){
                        for (var i = 0; i < $scope.ncolors.length; i++) {
                            if($scope.ncolors[i].params == $scope.filtrs[item])
                                $scope.ncolors[i].check = true;
                            $scope.Filtr.push($scope.ncolors[i]);
                        }
                    }
                }   else {
                    $scope.filtrs = [];
                }

                $scope.checking = function (color) {
                    if (color.check == true) {
                        $scope.Filtr.push(color);
                        $scope.filtrs.push(color.params);
                    }
                    else if (color.check == false) {
                        for (var i = 0; i < $scope.Filtr.length; i++)
                            if ($scope.Filtr[i].params == color.params) $scope.Filtr.splice(i, 1);
                        for (var j = 0; j < $scope.filtrs.length; j++)
                            if ($scope.filtrs[j] == color.params) $scope.filtrs.splice(j, 1);
                    }
                    $state.go('.', {color: $scope.filtrs}, { notify: false });
                    console.log($scope.filtrs);
                };
            });
    });
angular.module("admin")
    .controller("Category", function ($scope, CategoryService, $stateParams, $state) {

        // for category/index
        $scope.priceFilter = {min: 1, max: 1000000};
        /*pagination*/
        $scope.$watch('priceFilter.max', function () {
            $state.go('.', {max: $scope.priceFilter.max}, { notify: false });
        });
        $scope.$watch('priceFilter.min', function () {
            $state.go('.', {min: $scope.priceFilter.min}, { notify: false });
        });
        /*end pagination*/

        $scope.categories = CategoryService.getCategoryAll().
            then(function (data, status) {
                $scope.categories = data;
                /*pagination*/
                if($stateParams.min){
                    $scope.priceFilter.min = parseInt($stateParams.min);
                } else {
                    $scope.priceFilter.min = 1;
                }
                if($stateParams.max){
                    $scope.priceFilter.max =  $stateParams.max;
                } else {
                    $scope.priceFilter.max =  data[0].max;
                }
                /*end pagination*/
            });

        $scope.error = {message: null};
        $scope.deleteCategory = function (id) {
            CategoryService.deleteCategory(id)
                .then(function () {
                    $scope.error.message = "Категория удалена";
                });
        }
    })
    .controller("CategoryEdit", function ($scope, CategoryService, $stateParams) {
        $scope.category = CategoryService.editCategory($stateParams.categoryId)
            .then(function (data) {
                $scope.category = data.category;
            });

        $scope.error = {message: null};
        $scope.updateCategory = function () {
            CategoryService.updateCategory($scope.category.id, $scope.category.name)
                .then(function () {
                    $scope.error.message = "Сохранено";
                });
        }
    })
    .controller('NewCategoryController', function ($http, $scope, CategoryService) {
        $scope.new_category = {name: null};
        $scope.error = {message: null};

        $scope.addNewCategory = function () {
            CategoryService.addNewCategory($scope.new_category.name)
                .then(function () {
                    return $scope.error.message = "Сохранено";
                })
                .catch(function (data) {
                    console.log('errors', data);
                });
            return $scope.new_category = {
                name: null
            };
        };
    });