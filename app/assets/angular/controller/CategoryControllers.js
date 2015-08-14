'use strict';
angular.module('app')
    .controller("CategoryShowCtrl", function ($scope, CategoryService, $stateParams, ConfigANDRouts) {
        $scope.category = [];
        $scope.products = [];
        $scope.colors = {};
        $scope.priceFilter = {min: 1, max: 900000000};
        CategoryService.showCategory($stateParams.categoryId)
            .then(function (data) {
                $scope.category = data.category;
                $scope.products = data.products;
                $scope.maxprice = data.maxprice;

                angular.forEach($scope.products, function(product){
                    if(product.image_uid)
                        product.image_uid = ConfigANDRouts.baseImage+product.image_uid;
                });

                $scope.priceFilter = {min: 1, max: $scope.maxprice};

                $scope.ncolors = data.colors;
                for (var i = 0; i < $scope.ncolors.length; i++) {
                    $scope.ncolors[i].check = false;
                }

                $scope.filtred = angular.copy($scope.ncolors);
                $scope.Filtr = [];
                $scope.checking = function (color) {
                    if (color.check == true) {
                        $scope.Filtr.push(color);
                    }
                    else if (color.check == false) {
                        for (var i = 0; i < $scope.Filtr.length; i++)
                            if ($scope.Filtr[i].params == color.params) $scope.Filtr.splice(i, 1);
                    }

                };
            });

    });
angular.module("admin")
    .controller("Category", function ($scope, CategoryService) {


        // for category/index
        $scope.priceFilter = {min: 1, max: 1000000};

        $scope.categories = CategoryService.getCategoryAll().
            then(function (data, status) {
                $scope.categories = data;
                $scope.priceFilter = {min: 1, max: data[0].max};
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
                })
            ;

            return $scope.new_category = {
                name: null
            };
        };
    });