(function () {
	'use strict';

	var gulp = require('gulp'),
		ts = require('gulp-typescript');

	function exampleTypescript(appConfig) {

		return function () {
			var tsProject = ts.createProject(appConfig.typescript.tsconfigExample),
				result = tsProject.src().pipe(ts(tsProject));

			return result.js.pipe(gulp.dest(appConfig.example));
		};
	};

	exports.task = exampleTypescript;
}());