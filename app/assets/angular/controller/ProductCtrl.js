/**
 * @ngdoc controller
 * @name Product
 *
 * @description
 * _Please update the description and dependencies._
 *
 * @requires $scope
 * */
angular.module('admin')
    .controller('Product', function ($rootScope, $scope, ProductsService, ConfigANDRouts, $stateParams, $state) {

        /* pagination template */
        ConfigANDRouts.templateCache();

        $scope.initpagination = function(){
            /* текущая страница */
            $scope.currentPage = 4;//parseInt($stateParams.page);
            console.log("page in satat = "+$stateParams.page);
            /* сколько показывать на страничке кнопок*/
            $scope.maxSize = 9;
            /* сколько продуктов отображать*/
            $scope.viewby = 3;
            $scope.itemsPerPage = $scope.viewby;
        };

        $scope.initpagination();
        /* переход по страницам*/
        $scope.setPage = function (pageNo) {
            $scope.currentPage = pageNo;
        };
        $scope.changeInvalidProductPage = function(page) {
            $scope.currentPage = page;
            console.log('current invalid product page: ', $scope.currentPage);
        };
        $scope.setPage($stateParams.page);
        /*Сбросить на страницу 1*/
        $scope.setItemsPerPage = function(num){
            $scope.itemsPerPage = num;
            $scope.currentPage = 1; //reset to first page
        };

        $scope.$watch('currentPage', function () {
            $state.go('.', {page: $scope.currentPage}, { notify: false });
            //$state.transitionTo('home', {page: $scope.currentPage}, { notify: false });
        });


        // Goods index
         ProductsService.getProductsAll().
            then(function (data) {
                $scope.products = data.products;

                 angular.forEach($scope.products, function(product){
                     if(product.image_uid)
                         product.image_uid = ConfigANDRouts.baseImage+product.image_uid;
                     angular.forEach(data.categories, function(category){
                         if(product.category_id == category[1]){
                             product.category_name = category[0];
                         }
                     })
                 });

                 /*Pagination*/
                 /* Сколько всего объектов в массиве*/
                 $scope.totalItems = $scope.products.length;

             });
        // Goods delete
        $scope.deleteProduc = function (id) {
            $scope.error = {message: null};
            ProductsService.deleteProduct(id)
                .then(function () {
                    $scope.error.message = "Удалено";
                });
        };

        /* for admin sort*/
        $scope.predicate = 'color';
        $scope.reverse = true;
        $scope.order = function(predicate) {
            $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
            $scope.predicate = predicate;
        };
        /*end admin sort*/

    })
    .controller('ProductNew', function ($scope,  ProductsService, CategoryService, $state, Flash) {
        $scope.error = {message: null};

        // GetCategory for SELECTED
        // Можно в HTML использовать другой контроллер не ProductNew, a Category
        CategoryService.getCategoryAll().
            then(function (data, status) {
                $scope.categories = data;
            });

        $scope.$watch('file', function () {
            if ($scope.file != null) {
                $scope.upload([$scope.file]);
            }
        });
        $scope.log = '';

        // goods NEW forms
        $scope.product = {name: null, price: null, category_id: null, file:null};
        $scope.addProduct = function () {
            console.log($scope.product.data);
            ProductsService.addNewProduct($scope.product.name, $scope.product.price, $scope.product.category_id, $scope.product.params, $scope.product.file)
                .then(function () {
                    var message = "Сохранено!";
                    Flash.create('success', message, 'custom-class');
                    $state.go('admin');
                });
        };
    })
    .controller('ProductShow', function ($scope, ProductsService, $stateParams, ConfigANDRouts) {

        // Goods show
        ProductsService.showProduct($stateParams.productId)
            .then(function (data, status) {
                $scope.product = data.product;
                if(data.product.image_uid){
                    $scope.product.image_uid = ConfigANDRouts.baseImage+data.product.image_uid;
                }

            });
    })
    .controller('ProductEdit', function ($scope, ProductsService, CategoryService, $stateParams, ConfigANDRouts) {
        $scope.error = {message: null};

        $scope.product = {name: null, price: null, category_id: null, file:null};
        $scope.$watch('file', function () {
            if ($scope.file != null) {
                $scope.upload([$scope.file]);
            }
        });

        // Goods show
        ProductsService.editProduct($stateParams.productId)
            .then(function (data, status) {
                $scope.product = data.product;
                if(data.product.image_uid)
                    $scope.product.image_uid = ConfigANDRouts.baseImage+data.product.image_uid;
            });

        CategoryService.getCategoryAll().
            then(function (data) {
                $scope.categories = data;
            });
        $scope.updateProduct = function () {
            console.log($scope.product);
            ProductsService.updateProduct($scope.product.id, $scope.product.name, $scope.product.price, $scope.product.category_id, $scope.product.params, $scope.product.file)
                .then(function () {
                    $scope.error.message = "Сохранено";
                });
        }
    });
