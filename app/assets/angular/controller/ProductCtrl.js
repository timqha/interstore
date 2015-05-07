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
    .controller('Product', function($scope, CategoryService, ProductsService, ngCart){

        //set price for tax and shipping
        ngCart.setTaxRate(0);
        ngCart.setShipping(0);

        // goods NEW forms
        $scope.product = {name: null, price: null, category_id: null};
        $scope.addProduct = function(){
            ProductsService.addNewProduct($scope.product.name,$scope.product.price,$scope.product.category_id, $scope.product.params);
            return $scope.product = {name: null, price: null, category_id: null};
        };
        // GetCategory for SELECTED
        $scope.categories = CategoryService.getCategoryAll().
            then(function(data,status) {
                $scope.categories = data;
              //  console.log(status);
            });


        // Goods index
          $scope.products = ProductsService.getProductsAll().
              then(function(data){
                  $scope.products = data.products;
                  $scope.productslast = data.productslast;
            //      console.log(data);
              });

        //********************************************************
        // Goods edit
        //********************************************************




        // Goods delete
        $scope.deleteProduc = function(id){
            ProductsService.deleteProduct(id)
                .then(function(data,status){
                //    console.log(status);
                });
        };
    })
    .controller('ProductShow', function($scope,ProductsService, $routeParams){

        // Goods show
        $scope.product = ProductsService.showProduct($routeParams.productId)
            .then(function(data, status){
                $scope.product = data;
            });


    })
    .controller('ProductEdit', function($scope,ProductsService,CategoryService, $routeParams){

        // Goods show
        $scope.product = ProductsService.editProduct($routeParams.productId)
            .then(function(data, status){
                $scope.product = data;
           //     console.log(data);
            });

        $scope.categories = CategoryService.getCategoryAll().
            then(function(data,status) {
                $scope.categories = data;
                //  console.log(status);
            });

        $scope.updateProduct = function(){
            ProductsService.updateProduct($scope.product.id,$scope.product.name,$scope.product.price,$scope.product.category_id, $scope.product.params);
        }
    });
