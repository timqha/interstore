angular.module("app")
    .filter('filterColor', function () {
        return function (items, ncolors) {

            var filtered = [];

            angular.forEach(items, function (item) {
                if (ncolors.length < 1) {
                    filtered.push(item);
                }
                else {
                    for (var i = 0; i < ncolors.length; i++) {
                        if (ncolors[i].params == item.params) {
                            filtered.push(item);
                            break;
                        }
                    }
                }
            });

            return filtered;

        };
    });