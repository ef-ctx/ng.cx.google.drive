/// <reference path="../../typings/tsd.d.ts" />
System.register(['google/google'], function(exports_1) {
    var google_1;
    var GoogleDrive;
    return {
        setters:[
            function (google_1_1) {
                google_1 = google_1_1;
            }],
        execute: function() {
            GoogleDrive = (function () {
                function GoogleDrive() {
                }
                GoogleDrive.bootstrap = function () {
                    google_1.API.bootstrap();
                    angular.module('ng.cx.google.drive', [])
                        .service('api', [
                        function () {
                            return google_1.API;
                        }
                    ])
                        .factory('Auth', [
                        function () {
                            return google_1.Auth;
                        }
                    ])
                        .service('drive', [
                        function () {
                            return google_1.Drive;
                        }
                    ]);
                };
                return GoogleDrive;
            })();
            exports_1("GoogleDrive", GoogleDrive);
        }
    }
});
