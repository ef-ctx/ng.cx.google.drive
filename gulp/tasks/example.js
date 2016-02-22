(function () {
    'use strict';

    var gulp = require('gulp');

    function example(appConfig) {
        return function () {
            gulp.start('example-typescript');
        };
    };

    exports.task = example;
    exports.dependencies = [];
}());