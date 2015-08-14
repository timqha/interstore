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
    .controller('Product', function ($rootScope, $scope, ProductsService) {

        // Goods index
         ProductsService.getProductsAll().
            then(function (data) {
                $scope.products = data.products;


                 angular.forEach($scope.products, function(product){
                     angular.forEach(data.categories, function(category){
                /*         product.data = JSON.parse(product.data);*/
                         if(product.category_id == category[1]){
                             product.category_name = category[0];
                         }
                     })
                 });
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
    .controller('ProductNew', function ($scope, Upload, $auth, ProductsService, CategoryService, $state) {
        $scope.error = {message: null};

        // GetCategory for SELECTED
        // Можно в HTML использовать другой контроллер не ProductNew, a Category
        CategoryService.getCategoryAll().
            then(function (data, status) {
                $scope.categories = data;
            });

        $scope.$watch('files', function () {
            $scope.upload($scope.files);
        });
        $scope.$watch('file', function () {
            if ($scope.file != null) {
                $scope.upload([$scope.file]);
            }
        });
        $scope.log = '';



        // goods NEW forms
        $scope.product = {name: null, price: null, category_id: null, image:null};
        $scope.addProduct = function () {
            console.log($scope.product.data);

            $scope.upload = function (file) {
                Upload.upload({
                    url: 'api/v1/products',
                    file: file,
                    headers: $auth.retrieveData('auth_headers')
                }).progress(function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                }).success(function (data, status, headers, config) {
                    console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
                }).error(function (data, status, headers, config) {
                    console.log('error status: ' + status);
                })
            };

            ProductsService.addNewProduct($scope.product.name, $scope.product.price, $scope.product.category_id, $scope.product.params)
                .then(function () {
                    $scope.error.message = "Сохранено";
                });
            $state.go('admin');
        };
    })
    .controller('ProductShow', function ($scope, ProductsService, $stateParams) {

        // Goods show
        ProductsService.showProduct($stateParams.productId)
            .then(function (data, status) {
                $scope.product = data.product;
                $scope.product.data = JSON.parse(data.product.data);
            });
    })
    .controller('ProductEdit', function ($scope, ProductsService, CategoryService, $stateParams) {
        $scope.error = {message: null};

        // Goods show
        ProductsService.editProduct($stateParams.productId)
            .then(function (data, status) {
                $scope.product = data.product;
            });

        CategoryService.getCategoryAll().
            then(function (data) {
                $scope.categories = data;
            });
        $scope.updateProduct = function () {
            ProductsService.updateProduct($scope.product.id, $scope.product.name, $scope.product.price, $scope.product.category_id, $scope.product.params)
                .then(function () {
                    $scope.error.message = "Сохранено";
                });
        }
    });
