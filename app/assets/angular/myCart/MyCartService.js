/**
 * @ngdoc service
 * @name MyCart
 * @description
 * _Please update the description and dependencies._
 *
 * */
angular.module('myCart')

    .config([function () {

    }])

    .provider('$myCart', function () {
        this.$get = function () {
        };
    })

    .run(['$rootScope', 'localstorage', 'myCart', 'myCartItem', '$window', function ($rootScope, localstorage, myCart, myCartItem, $window) {


        $rootScope.$on('myCart:change', function () {
            myCart.$save();
        });

        if (angular.isObject(localstorage.get('mcart'))) {
            myCart.$restore(localstorage.get('mcart'));

        } else {
            myCart.init();
        }

    }])
    .service('myCart', ['$rootScope', 'localstorage', 'myCartItem', function ($rootScope, localstorage, myCartItem) {

        this.init = function () {
            this.$cart = {
                items: []
            }
        };

        this.addToCart = function (id, price, quantity, data) {


            // Находим есть ли в корзине товар с таким же id. Если есть заменяем количество, если нет добавляем.
            var carthav = this.getItemById(id);

            if (typeof carthav === "object") {
                carthav.setQuantity(quantity, false);
            } else {
                var newItem = new myCartItem(id, price, quantity, data);
                this.$cart.items.push(newItem);
                $rootScope.$broadcast('myCart:itemAdd', newItem);
            }
            $rootScope.$broadcast('myCart:change', {});
        };
        this.removeCart = function () {
            localstorage.remove('mcart');
            this.init();
            //$rootScope.$broadcast('myCart:change', {});

        };
        this.removeItem = function (index) {
            this.$cart.items.splice(index, 1);
            $rootScope.$broadcast('myCart:itemRemoved', {});
            $rootScope.$broadcast('myCart:change', {});
        };

        this.removeItemById = function (id) {
            var cart = this.getCart();
            angular.forEach(cart.items, function (item, index) {
                if (item.getId() === id) {
                    cart.items.splice(index, 1);
                }
            });
            this.setCart(cart);
            $rootScope.$broadcast('myCart:itemRemoved', {});
            $rootScope.$broadcast('myCart:change', {});
        };
        this.getCart = function () {
            return this.$cart;
        };
        this.setCart = function (cart) {
            this.$cart = cart;
            return this.getCart();
        };
        this.getItems = function () {
            return this.$cart.items;
        };

        this.getItemById = function (id) {
            var items = this.getItems();
            var temp = false;
            angular.forEach(items, function (item) {
                if (item.getId() === id) {
                    temp = item;
                }
            });
            return temp;
        };
        this.getTotalSumm = function () {
            var totalPrice = 0;
            var items = this.getItems();
            angular.forEach(items, function (item) {
                totalPrice += item.getTotal();
            });
            return +parseFloat(totalPrice).toFixed(2);
        };

        this.getTotalItems = function () {
            var count = 0;
            var items = this.getItems();
            angular.forEach(items, function (item) {
                count += item.getQuantity();
            });
            return count;
        };

        this.$restore = function (storedCart) {
            var _self = this;
            _self.init();

            angular.forEach(storedCart.items, function (item) {
                _self.$cart.items.push(new myCartItem(item._id, item._price, item._quantity, item._data));
            });
            this.$save();
        };

        this.$save = function () {
            return localstorage.set('mcart', JSON.stringify(this.getCart()));
        }

    }])
    .service('localstorage', function ($window) {
        return {
            get: function (key) {
                if ($window.localStorage[key]) {
                    var cart = angular.fromJson($window.localStorage [key]);
                    return JSON.parse(cart);

                }
                return false;
            },
            set: function (key, val) {
                if (val === undefined) {

                    $window.localStorage.removeItem(key);
                } else {

                    $window.localStorage[key] = angular.toJson(val);
                }

                return $window.localStorage[key];
            },
            remove: function (key) {
                $window.localStorage.removeItem(key);
            }
        }
    })

    .factory('myCartItem', ['$rootScope', '$log', function ($rootScope, $log) {

        var item = function (id, price, quantity, data) {
            this.setId(id);
            this.setPrice(price);
            this.setQuantity(quantity);
            this.setData(data);
        };


        item.prototype.setId = function (id) {
            if (id)  this._id = id;
            else {
                $log.error('An ID must be provided');
            }
        };

        item.prototype.getId = function () {
            return this._id;
        };


        item.prototype.setPrice = function (price) {
            var priceFloat = parseFloat(price);
            if (priceFloat) {
                if (priceFloat <= 0) {
                    $log.error('A price must be over 0');
                } else {
                    this._price = (priceFloat);
                }
            } else {
                $log.error('A price must be provided');
            }
        };
        item.prototype.getPrice = function () {
            // console.log('getPrice',this._price);

            return this._price;
        };


        item.prototype.setQuantity = function (quantity, relative) {


            var quantityInt = parseInt(quantity);
            if (quantityInt % 1 === 0) {
                if (relative === true) {
                    this._quantity += quantityInt;
                } else {
                    this._quantity = quantityInt;
                }
                if (this._quantity < 1) this._quantity = 1;

            } else {
                this._quantity = 1;
                $log.info('Quantity must be an integer and was defaulted to 1');
            }
            //  $rootScope.$broadcast('myCart:change', {});

        };

        item.prototype.getQuantity = function () {
            return this._quantity;
        };

        item.prototype.setData = function (data) {
            if (data) this._data = data;
        };

        item.prototype.getData = function () {
            if (this._data) return this._data;
            else $log.info('This item has no data');
        };


        item.prototype.getTotal = function () {
            return +parseFloat(this.getQuantity() * this.getPrice()).toFixed(2);
        };

        return item;

    }])

    .controller('CartController', ['$scope', 'myCart', function ($scope, $myCart) {
        $scope.myCart = $myCart;

    }])
    .directive('mycartTotal', function () {
        return {
            restrict: 'E',
            controller: 'CartController',
            scope: {},
            transclude: true,
            templateUrl: 'myCart/_total.html'

        };
    })
    .directive('mycartAddtocart', ['myCart', function (myCart) {
        return {
            restrict: 'E',
            controller: 'CartController',
            scope: {
                id: '@',
                quantity: '@',
                quantityMax: '@',
                price: '@',
                data: '='
            },
            transclude: true,
            templateUrl: 'myCart/_addtocart.html',
            link: function (scope, element, attrs) {
                scope.attrs = attrs;
                scope.carthav = function () {
                    return myCart.getItemById(attrs.id);
                };

                if (scope.carthav()) {
                    scope.q = myCart.getItemById(attrs.id).getQuantity();
                } else {
                    scope.q = parseInt(scope.quantity);
                }

                scope.qtyOpt = [];
                for (var i = 1; i <= scope.quantityMax; i++) {
                    scope.qtyOpt.push(i);
                }

            }

        };
    }])
    .directive('mycartContr', ['$compile', function ($compile) {
        return {
            restict: 'EC',
            controller: 'CartController',
            scope: {},
            transclude: true,
            templateUrl: 'myCart/_cart.html',
            link: function (scope, element, attrs) {

            }

        };
    }])
;

