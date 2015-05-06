angular.module("app")
.filter('filterColor', function() {
    return function( items, colors) {
        var filtered = [];
        console.log(items);
        angular.forEach(items, function(item) {
            console.log(item.params);
            if(colors.black == false && colors.white == false) {
                filtered.push(item);
            }
            else if(colors.black == true && colors.white == false && item.params == 'black'){
                filtered.push(item);
            }
            else if(colors.white == true && colors.black == false && item.params == 'white'){
                filtered.push(item);
            }
            else if(colors.white == true && colors.black == true){
                filtered.push(item);
            }
        });
        //console.log("foil",filtered);
        return filtered;
    };
});