angular.module("app")
/*http://stackoverflow.com/questions/16144017/update-pagination-in-angularjs-after-filtering*/
    .filter('StartPaginstion', function () {
        return function (input, start) {
            if (input) {
                start = parseInt(start); //parse to int
                return input.slice(start);
            }
            return [];
        };
    });