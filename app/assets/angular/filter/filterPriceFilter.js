/**
 * @ngdoc service
 * @name filterPrice
 * @description
 * _Please update the description and dependencies._
 *
 * */
angular.module('app')
    .filter('filterPrice', function(){
        return function(input, params) {

            var filtered = [];
            if(params.max && params.min) {
                angular.forEach(input, function (item) {
                    if (parseFloat(item.price) > params.min && parseFloat(item.price) <= params.max) {
                        filtered.push(item);
                    }
                });
            } else {
                filtered = input;
            }

            return filtered;
        };
});

