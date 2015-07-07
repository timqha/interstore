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
    .controller('Product', function ($rootScope, $scope, ProductsService, myCart, CategoryService) {


        // Goods index
         ProductsService.getProductsAll().
            then(function (data) {
                $scope.products = data.products;
                 console.log(data);

            });
        // Goods delete
        $scope.deleteProduc = function (id) {
            $scope.error = {message: null};
            ProductsService.deleteProduct(id)
                .then(function () {
                    $scope.error.message = "Удалено";
                });
        };

        // check update basket
        //Наверное это нужно вынести в сервайс или что-то подобное.
        $scope.errors = {text: null, g: 0};
        angular.forEach(myCart.getCart().items, function (item) {
            $scope.errors.g++;
            ProductsService.showProduct(item.getId())
                .then(function (data) {
                //    console.log('data', data, data.products.price, "cart", item.getPrice());
                    if (data.product.price != item.getPrice()) {
                        if ($scope.errors.g == 1) {
                            if (item.getPrice() <= data.product.price) {
                                $scope.errors.text = "Цены на товар стали выше!";
                            }
                            else {
                                $scope.errors.text = "Вам повезло, цены стали меньше!";
                            }
                        }
                        else {
                            $scope.errors.text = "Внимание! Цены изменились.";
                        }
                        item.setPrice(data.product.price);
                        $rootScope.$broadcast('myCart:change', {});
                    }
                });
        });


        CategoryService.getCategoryAll().
            then(function (data, status) {
                $scope.categories = data;
            });
        /* for admin sort*/

        $scope.predicate = 'color';
        $scope.reverse = true;
        $scope.order = function(predicate) {
            $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
            $scope.predicate = predicate;
        };
        /*end admin sort*/


    })
    .controller('ProductNew', function ($scope, ProductsService, CategoryService) {
        $scope.error = {message: null};

        // GetCategory for SELECTED
        // Можно в HTML использовать другой контроллер не ProductNew, a Category
        CategoryService.getCategoryAll().
            then(function (data, status) {
                $scope.categories = data;
            });

        // goods NEW forms
        $scope.product = {name: null, price: null, category_id: null};
        $scope.addProduct = function () {
            ProductsService.addNewProduct($scope.product.name, $scope.product.price, $scope.product.category_id, $scope.product.params)
                .then(function () {
                    $scope.error.message = "Сохранено";
                });
            return $scope.product = {name: null, price: null, category_id: null};
        };
    })
    .controller('ProductShow', function ($scope, ProductsService, $stateParams) {

        // Goods show
        ProductsService.showProduct($stateParams.productId)
            .then(function (data, status) {
                $scope.product = data.product;
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
