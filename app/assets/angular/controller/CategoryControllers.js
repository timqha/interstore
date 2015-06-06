'use strict';
angular.module('app')
    .controller("CategoryShowCtrl", function ($scope, CategoryService, $routeParams) {
        $scope.category = [];
        $scope.products = [];
        $scope.colors = {};

        CategoryService.showCategory($routeParams.categoryId)
            .then(function (data) {
                $scope.category = data.category;
                //  $scope.colors = JSON.parse(data.category.desc);
                $scope.products = data.products;

                $scope.ncolors = data.colors;
                for (var i = 0; i < $scope.ncolors.length; i++) {
                    $scope.ncolors[i].check = true;
                }
                $scope.filtred = angular.copy($scope.ncolors);

                $scope.checking = function (color) {
                    var Filtred = $scope.filtred;
                    if (color.check == true) {
                        Filtred.push(color);
                    }
                    else if (color.check == false) {
                        for (var i = 0; i < Filtred.length; i++)
                            if (Filtred[i].params == color.params) Filtred.splice(i, 1);
                    }
                    console.log("return", Filtred);
                };
            });
        $scope.priceFilter = {min: 0, max: 100000};
    });
angular.module("admin")
    .controller("Category", function ($scope, CategoryService) {
        // for category/index
        $scope.categories = CategoryService.getCategoryAll().
            then(function (data, status) {
                $scope.categories = data;
            });
        $scope.priceFilter = {min: 0, max: 100000};
        $scope.error = {message: null};
        $scope.deleteCategory = function (id) {
            CategoryService.deleteCategory(id)
                .then(function () {
                    $scope.error.message = "Категория удалена";
                });
        }
    })
    .controller("CategoryEdit", function ($scope, CategoryService, $routeParams) {
        $scope.category = CategoryService.editCategory($routeParams.categoryId)
            .then(function (data) {
                $scope.category = data;
            });

        $scope.error = {message: null};
        $scope.updateCategory = function () {
            CategoryService.updateCategory($scope.category.id, $scope.category.name, $scope.category.desc)
                .then(function () {
                    $scope.error.message = "Сохранено";
                });

        }
    })
    .controller('NewCategoryController', function ($http, $scope, CategoryService) {
        $scope.new_category = {name: null, desc: 'Полее оставленно на будущее, {"white":false,"black":false}'};
        $scope.error = {message: null};

        $scope.addNewCategory = function () {
            CategoryService.addNewCategory($scope.new_category.name, $scope.new_category.desc)
                .then(function () {
                    return $scope.error.message = "Сохранено";
                });

            return $scope.new_category = {
                name: null,
                desc: '{"Полее оставленно на будущее, {white":false,"black":false}'
            };
        };
    });