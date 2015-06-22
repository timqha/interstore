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
    .controller('Product', function ($scope, ProductsService, ngCart) {

        //set price for tax and shipping
        ngCart.setTaxRate(0);
        ngCart.setShipping(0);

        // Goods index
        $scope.products = ProductsService.getProductsAll().
            then(function (data) {
                $scope.products = data.products;
                $scope.productslast = data.productslast;
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
        angular.forEach(ngCart.getCart().items, function (item) {
            $scope.errors.g++;
            ProductsService.showProduct(item._id)
                .then(function (data) {
                    if (data.price != item._price) {
                        if ($scope.errors.g == 1) {
                            if (item._price <= data.price) {
                                $scope.errors.text = "Цены на товар стали выше!";
                            }
                            else {
                                $scope.errors.text = "Вам повезло, цены стали меньше!";
                            }
                        }
                        else {
                            $scope.errors.text = "Внимание! Цены изменились.";
                        }
                        item._price = data.price;
                    }
                });
        });
    })
    .controller('ProductNew', function ($scope, ProductsService, CategoryService) {
        $scope.error = {message: null};

        // GetCategory for SELECTED
        // Можно в HTML использовать другой контроллер не ProductNew, a Category
        $scope.categories = CategoryService.getCategoryAll().
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
        $scope.product = ProductsService.showProduct($stateParams.productId)
            .then(function (data, status) {
                $scope.product = data;
            });
    })
    .controller('ProductEdit', function ($scope, ProductsService, CategoryService, $stateParams) {
        $scope.error = {message: null};

        // Goods show
        $scope.product = ProductsService.editProduct($stateParams.productId)
            .then(function (data, status) {
                $scope.product = data;
            });

        $scope.categories = CategoryService.getCategoryAll().
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
