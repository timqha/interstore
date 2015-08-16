/**
 * @ngdoc directive
 * @name fileread
 *
 * @description
 * _Please update the description and restriction._
 *
 * @restrict A
 * */
angular.module('app')
    .directive("fileread", [function () {
        return {
            scope: {
                fileread: "="
            },
            link: function (scope, element, attributes) {
                element.bind("change", function (changeEvent) {
                    var reader = new FileReader();
                    reader.onload = function (loadEvent) {
                        scope.$apply(function () {
                            scope.fileread = loadEvent.target.result;
                        });
                    };
                    reader.readAsDataURL(changeEvent.target.files[0]);
                });
            }
        }
    }])
/*

    .directive('appFilereader', function(
        $q
    ) {
        /!*
         made by elmerbulthuis@gmail.com WTFPL licensed
         *!/
        var slice = Array.prototype.slice;

        return {
            restrict: 'A',
            require: '?ngModel',
            link: function(scope, element, attrs, ngModel) {
                if (!ngModel) return;

                ngModel.$render = function() {}

                element.bind('change', function(e) {
                    var element = e.target;
                    if(!element.value) return;

                    element.disabled = true;
                    $q.all(slice.call(element.files, 0).map(readFile))
                        .then(function(values) {
                            if (element.multiple) ngModel.$setViewValue(values);
                            else ngModel.$setViewValue(values.length ? values[0] : null);
                            element.value = null;
                            element.disabled = false;
                        });

                    function readFile(file) {
                        var deferred = $q.defer();

                        var reader = new FileReader()
                        reader.onload = function(e) {
                            deferred.resolve(e.target.result);
                        }
                        reader.onerror = function(e) {
                            deferred.reject(e);
                        }
                        reader.readAsDataURL(file);

                        return deferred.promise;
                    }

                }); //change

            } //link

        }; //return

    }) //appFilereader
;*/

/*
2015/08/14/2wbbyj0o84_file*/

/*Parameters: {"utf8"=>"✓", "authenticity_token"=>"6aJ3kdoIlGzH5WDxadtKxgxCbNJZSSEpmuEoqA8M75vzBEgdp9LA6aOt0l0eUI0reu8X3SH+cCDaoz4ufdNCBw==", "photo"=>{"image"=>#<ActionDispatch::Http::UploadedFile:0xb50691a8 @tempfile=#<Tempfile:/tmp/RackMultipart20150814-7932-1yz8c5o.jpg>, @original_filename="anypics.ru-28205.jpg", @content_type="image/jpeg", @headers="Content-Disposition: form-data; name=\"photo[image]\"; filename=\"anypics.ru-28205.jpg\"\r\nContent-Type: image/jpeg\r\n">}, "commit"=>"Create Photo"}
 (0.1ms)  begin transaction
 SQL (0.4ms)  INSERT INTO "photos" ("image_name", "image_uid", "created_at", "updated_at") VALUES (?, ?, ?, ?)  [["image_name", "anypics.ru-28205.jpg"], ["image_uid", "2015/08/14/53yvxv3wuk_anypics.ru_28205.jpg"], ["created_at", "2015-08-14 11:08:40.074632"], ["updated_at", "2015-08-14 11:08:40.074632"]]
 (140.5ms)  commit transaction*/