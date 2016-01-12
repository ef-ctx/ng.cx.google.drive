/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="google.d.ts" />
System.register(['./auth', './api', './drive'], function(exports_1) {
    return {
        setters:[
            function (auth_1_1) {
                exports_1({
                    "Auth": auth_1_1["Auth"]
                });
            },
            function (api_1_1) {
                exports_1({
                    "API": api_1_1["API"]
                });
            },
            function (drive_1_1) {
                exports_1({
                    "Drive": drive_1_1["Drive"]
                });
            }],
        execute: function() {
        }
    }
});
