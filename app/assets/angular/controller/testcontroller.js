angular.module('app')
    .controller('MyController', function($scope){
       $scope.name ='Alexander';
    })
    .controller('StepOneController', function($scope, ngCart){

       /* $scope.categories = [
            {name: 'one', display: 'Category one'},
            {name: 'two', display: 'Category two'},
            {name: 'three', display: 'Category three'},
            {name: 'four', display: 'Category four'},
            {name: 'five', display: 'Category five'}
        ];
        $scope.currentCategory = null;

        $scope.setCurrentCategory = function(category){
          $scope.currentCategory = category;
        };
        $scope.isSetcurrent = function(category){
          $scope.currentCategory === category;
        };
  */

        ngCart.setTaxRate(7.5);
        ngCart.setShipping(2.99);
    });