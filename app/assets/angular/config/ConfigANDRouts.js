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
                "<ul class=\"pagination\">" +
                " <li ng-if=\"::boundaryLinks\" ng-class=\"{disabled: noPrevious()||ngDisabled}\" class=\"pagination-first\"><a href ng-click=\"selectPage(1, $event)\">{{::getText('first')}}</a></li>" +
                "<li ng-if=\"::directionLinks\" ng-class=\"{disabled: noPrevious()||ngDisabled}\" class=\"pagination-prev\"><a href ng-click=\"selectPage(page - 1, $event)\">{{::getText('previous')}}</a></li>" +
                "<li ng-repeat=\"page in pages track by $index\" ng-class=\"{active: page.active,disabled: ngDisabled&&!page.active}\" class=\"pagination-page\"><a href ng-click=\"selectPage(page.number, $event)\">{{page.text}}</a></li>" +
                "<li ng-if=\"::directionLinks\" ng-class=\"{disabled: noNext()||ngDisabled}\" class=\"pagination-next\"><a href ng-click=\"selectPage(page + 1, $event)\">{{::getText('next')}}</a></li>" +
                "<li ng-if=\"::boundaryLinks\" ng-class=\"{disabled: noNext()||ngDisabled}\" class=\"pagination-last\"><a href ng-click=\"selectPage(totalPages, $event)\">{{::getText('last')}}</a></li>" +
                "</ul>");
            };

        return RouteUrl;
    });