(function () {
    'use strict';

    var gulp = require('gulp');

    function example(appConfig) {
        return function () {
            gulp.start('example-typescript');
            gulp.start('copy-system-config');
        };
    };

    exports.task = example;
    exports.dependencies = [];
}());