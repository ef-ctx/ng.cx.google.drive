(function () {
  'use strict';

  var gulp = require('gulp'),
   ts = require('gulp-typescript'),
  sourcemaps = require('gulp-sourcemaps');

  function exampleTypescript(appConfig) {
    return function () {
      var tsProject = ts.createProject(appConfig.typescript.tsconfig),
        files = appConfig.src.exampleTs.concat(appConfig.src.typings),
        result = gulp.src(files)
          .pipe(sourcemaps.init())
          .pipe(ts(tsProject.options));

      return result.js
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(appConfig.example));
    }
  };

  exports.task = exampleTypescript;
  exports.dependencies = [
    'clean'
  ];
}());