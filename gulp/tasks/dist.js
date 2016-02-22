(function () {
  'use strict';

  var gulp = require('gulp'),
    merge = require('merge2'),
    ts = require('gulp-typescript');

  function dist(appConfig) {

    return function () {
      var tsProject = ts.createProject(appConfig.typescript.tsconfigDist),
        result = tsProject.src().pipe(ts(tsProject));

      return merge([
        result.dts.pipe(gulp.dest(appConfig.dist)),
        result.js.pipe(gulp.dest(appConfig.dist))
      ]);
    };
  };

  exports.task = dist;
  exports.dependencies = [
    'karma',
    'dist-bundles'
  ];
}());