(function () {
	'use strict';

	var gulp = require('gulp'),
	 ts = require('gulp-typescript');

	function buildTypescript(appConfig) {

		return function () {
			var tsProject = ts.createProject(appConfig.typescript.tsconfig),
        result = tsProject.src().pipe(ts(tsProject));

			return result.js.pipe(gulp.dest(appConfig.output))
		};
	};

	exports.task = buildTypescript;
	exports.dependencies = [
		'clean'
	];
}());