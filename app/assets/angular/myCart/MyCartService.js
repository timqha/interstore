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

    .run(['$rootScope', 'localstorage', 'myCart', function ($rootScope, localstorage, myCart) {

        $rootScope.$on('myCart:change', function () {
            console.log('сохраним');
            myCart.$save();
        });

        if (localstorage.get('mcart')) {
            // Здесь должно бы быть обновления.
            //  myCart.$restore(localstorage.get('mcart'));

            console.log(localstorage.get('mcart'));
            myCart.cleerCart();
            console.log("cleen",localstorage.get('mcart'));
        } else {
            //Если корзинки нет, тогда мы забабахаем свою корзинку)
            myCart.init();
            console.log(localstorage.get('mcart'));
        }

    }])
    .service('myCart', function ($rootScope, localstorage, ngCartItem) {

        this.init = function () {
            this.$cart = {
                items: []
            }
        };
        this.cleerCart = function () {
            $rootScope.$broadcast('ngCart:change', {});
            this.init();
            localstorage.removeItem('mcart');
        };

        this.getCart = function () {
            return this.$cart;
        };
        this.setCart = function(cart){
             this.$cart=cart;
            return this.getCart();
        };

        this.addToCart = function (id, price, quantity, data) {

            var newItem = new ngCartItem(id, price, quantity, data);
            // Находим есть ли в корзине товар с таким же id. Если есть заменяем количество, если нет добавляем.
            var carthav = this.getItemById(id);

           // console.log(carthav);
            if (typeof carthav === "object") {
                carthav.setQuantity(quantity, false);
                console.log('Я вижу что есть объект');
            } else {
                this.$cart.items.push(newItem);
                $rootScope.$broadcast('myCart:itemAdd', newItem);
            }
            $rootScope.$broadcast('myCart:change', {});
        };
        this.removeItem = function(index){
            // Сделать удаление кода)
            this.$cart.items.splice(index, 1);
            $rootScope.$broadcast('myCart:itemRemoved', {});
            $rootScope.$broadcast('myCart:change', {});
        };

        this.removeItemById = function(id){
            var cart = this.getCart();
            angular.forEach(cart.items, function (item, index) {
                if  (item.getId() === id) {
                    cart.items.splice(index, 1);
                }
            });
            this.setCart(cart);
            $rootScope.$broadcast('ngCart:itemRemoved', {});
            $rootScope.$broadcast('ngCart:change', {});
        };

        this.getItemById = function (id) {
            var items = this.getCart().items;
            var temp = false;
            angular.forEach(items, function (item) {
                if (item.getId() == id) {
                    temp = item;
                }
            });
            return temp;
        };
        this.getTotalSumm = function(characters){
            if (characters === undefined) {
                characters = 2;
            }
            var items = this.getCart().items;
            totalPrice = 0;
            angular.forEach(items, function(item){
                totalPrice += item.getTotal();
            });
            return +parseFloat(totalPrice.toFixed(characters));
        };
        this.$save = function () {
            return localstorage.set('mcart', JSON.stringify(this.getCart()));
        }

    })
    .service('localstorage', function ($window) {
        return {
            get: function (key) {
                console.log('Корзинка отправлена');
                if ($window.localStorage[key]) {
                    return JSON.parse(angular.toJson($window.localStorage[key]));
                }
                return false;
            },
            set: function (key, val) {
                if (val === undefined) {
                    console.log('Нужно удалить это!');
                } else {
                    console.log('Корзинка добавлена');
                    $window.localStorage[key] = angular.toJson(val);
                }
            },
            removeItem: function (key) {
                $window.localStorage.removeItem(key);
            }
        }
    })

    .factory('ngCartItem', ['$rootScope', '$log', function ($rootScope, $log) {

        var item = function (id,price, quantity, data) {
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
            $rootScope.$broadcast('myCart:change', {});

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

        item.prototype.toObject = function () {
            return {
                id: this.getId(),
                price: this.getPrice(),
                quantity: this.getQuantity(),
                data: this.getData(),
                total: this.getTotal()
            }
        };

        return item;

    }])

    .controller('CartController', ['$scope', 'myCart', function ($scope, myCart) {
        $scope.myCart = myCart;

    }])
    .directive('mycartTotal', function(){
        return {
            restrict: 'E',
            controller: 'CartController',
            scope: {},
            transclude: true,
            templateUrl:'myCart/_total.html'

        };
    })
    .directive('mycartAddtocart', ['myCart', function(myCart){
        return {
            restrict : 'E',
            controller : 'CartController',
            scope: {
                id:'@',
                quantity:'@',
                quantityMax:'@',
                price:'@',
                data:'='
            },
            transclude: true,
            templateUrl: 'myCart/_addtocart.html',
            link:function(scope, element, attrs){
                scope.attrs = attrs;
                scope.carthav = function(){
                    return  myCart.getItemById(attrs.id);
                };

                if (scope.carthav()){
                    scope.q = ngCart.getItemById(attrs.id).getQuantity();
                } else {
                    scope.q = parseInt(scope.quantity);
                }

                scope.qtyOpt =  [];
                for (var i = 1; i <= scope.quantityMax; i++) {
                    scope.qtyOpt.push(i);
                }

            }

        };
    }])
;

