(function () {
  'use strict';

  var gulp = require('gulp'),
   ts = require('gulp-typescript');

  function exampleTypescript(appConfig) {
    return function () {
      var tsProject = ts.createProject(appConfig.typescript.tsconfig),
        files = appConfig.src.exampleTs.concat(appConfig.src.typings),
        result = gulp.src(files).pipe(ts(tsProject.options));

      return result.js.pipe(gulp.dest(appConfig.example));
    }
  };

  exports.task = exampleTypescript;
  exports.dependencies = [
    'clean'
  ];
}());