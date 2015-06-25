'use strict';
angular.module('app')
    .controller("CategoryShowCtrl", function ($scope, CategoryService, $stateParams, $rootScope) {
        $scope.category = [];
        $scope.products = [];
        $scope.colors = {};
        CategoryService.showCategory($stateParams.categoryId)
            .then(function (data) {
                console.log(data);
                $scope.category = data.category;
                $scope.products = data.products;

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
    .controller("CategoryEdit", function ($scope, CategoryService, $stateParams) {
        $scope.category = CategoryService.editCategory($stateParams.categoryId)
            .then(function (data) {
                $scope.category = data.category;
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
        $scope.new_category = {name: null, desc: 'Поле оставленно на будущее, {"white":false,"black":false}'};
        $scope.error = {message: null};

        $scope.addNewCategory = function () {
            CategoryService.addNewCategory($scope.new_category.name, $scope.new_category.desc)
                .then(function () {
                    return $scope.error.message = "Сохранено";
                });

            return $scope.new_category = {
                name: null,
                desc: '{"Поле оставленно на будущее, {white":false,"black":false}'
            };
        };
    });