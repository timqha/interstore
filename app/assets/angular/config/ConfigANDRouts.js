angular.module('app')
    .factory('ConfigANDRouts', function($q, $templateCache){

        var RouteUrl = {};
        // Настройка роутинга в сервисах
        RouteUrl.apiUrlcategories = 'api/v1/categories';
        RouteUrl.apiUrlorders =     'api/v1/orders';
        RouteUrl.apiUrlproducts =   'api/v1/products';
        RouteUrl.apiUrlusers =      'api/v1/profile';
        RouteUrl.baseImage =         'system/dragonfly/development/';

        //Headers
        RouteUrl.config = {heders: 'application/json; charset=UTF-8'};

        //Обработка удачного ответа.
        RouteUrl.handleSuccess = function(response){
            return ( response.data);
        };
        //Обработка неудачногоответа. $q defer problem
        RouteUrl.handleError = function(response) {
          //  var deferred = $q.defer();
            if (!angular.isObject(response.data) || !response.data.message) {
                return ( $q.reject("An unknown error occurred.") );
            }
            return ( $q.reject(response.data.message) );
        };

        RouteUrl.templateCache = function(){
            $templateCache.put('template/pagination/pagination.html',
                "<ul class=\"pagination\">\n" +
                "  <li ng-if=\"boundaryLinks\" ng-class=\"{disabled: noPrevious()}\"><a href ng-click=\"selectPage(1)\"><span class=\"glyphicon glyphicon-fast-backward\"></span></a></li>\n" +
                "  <li ng-if=\"directionLinks\" ng-class=\"{disabled: noPrevious()}\"><a href ng-click=\"selectPage(page - 1)\"><span class=\"glyphicon glyphicon-triangle-left\"></span></a></li>\n" +
                "  <li ng-repeat=\"page in pages track by $index\" ng-class=\"{active: page.active}\"><a href ng-click=\"selectPage(page.number)\">{{page.text}}</a></li>\n" +
                "  <li ng-if=\"directionLinks\" ng-class=\"{disabled: noNext()}\"><a href ng-click=\"selectPage(page + 1)\"><span class=\"glyphicon glyphicon-triangle-right\"></span></a></li>\n" +
                "  <li ng-if=\"boundaryLinks\" ng-class=\"{disabled: noNext()}\"><a href ng-click=\"selectPage(totalPages)\"><span class=\"glyphicon glyphicon-fast-forward\"></span></a></li>\n" +
                "</ul>");
        };


        return RouteUrl;
    });