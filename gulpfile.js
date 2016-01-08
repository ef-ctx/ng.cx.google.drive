(function () {
    'use strict';

    var gulp = require('gulp'),
        fs = require('fs'),
        appConfig = require('./gulp/config');

    fs.readdirSync('./gulp/tasks')
        .filter(function (filename) {
            return filename.match(/\.js$/i);
        })
        .map(function (filename) {
            return {
                name: filename.substr(0, filename.length - 3),
                contents: require('./gulp/tasks/' + filename)
            };
        })
        .forEach(function (file) {
            gulp.task(file.name, file.contents.dependencies, file.contents.task && file.contents.task(appConfig));
        });
}())