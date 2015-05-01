angular.module('app')
    .controller('MyController', function($scope){
       $scope.name ='Alexander';
    })
    .controller('StepOneController', function($scope, ngCart){
        ngCart.setTaxRate(7.5);
        ngCart.setShipping(2.99);
    });