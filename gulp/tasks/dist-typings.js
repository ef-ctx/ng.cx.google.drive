(function () {
  'use strict';

  var gulp = require('gulp'),
    rename = require('gulp-rename');

  function distTypings(appConfig) {
    return function (cb) {
        return gulp.src(appConfig.typescript.declaration)
            .pipe(rename({
                'basename': 'index.d'
            }))
            .pipe(gulp.dest(appConfig.dist));
    };
  };

  exports.task = distTypings;
  exports.dependencies = [];
}());
