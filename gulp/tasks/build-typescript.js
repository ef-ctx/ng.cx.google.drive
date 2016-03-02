(function () {
  'use strict';

  var gulp = require('gulp'),
   ts = require('gulp-typescript');

  function buildTypescript(appConfig) {
    return function () {
      var tsProject = ts.createProject(appConfig.typescript.tsconfig),
        files = appConfig.src.ts.concat(appConfig.src.typings),
        result = gulp.src(files).pipe(ts(tsProject.options));

      return result.js.pipe(gulp.dest(appConfig.output));
    }
  };

  exports.task = buildTypescript;
  exports.dependencies = [
    'clean'
  ];
}());