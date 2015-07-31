angular.module('app')
    .factory('ConfigANDRouts', function(){

        var RouteUrl = {};
        // Настройка роутинга в сервисах
        RouteUrl.apiUrlcategories = 'api/v1/categories';
        RouteUrl.apiUrlorders =     'api/v1/orders';
        RouteUrl.apiUrlproducts =   'api/v1/products';
        RouteUrl.apiUrlusers =      'api/v1/profile';

        //Headers
        RouteUrl.config = {heders: 'application/json; charset=UTF-8'};

        //Обработка удачного ответа.
        RouteUrl.handleSuccess = function(response){
            return ( response.data);
        };
        //Обработка неудачногоответа. $q defer problem
        RouteUrl.handleError = function(response, $q) {
            var deferred = $q.defer();
            if (!angular.isObject(response.data) || !response.data.message) {
                return ( deferred.reject("An unknown error occurred.") );
            }
            return ( deferred.reject(response.data.message) );
        };

        return RouteUrl;
    });