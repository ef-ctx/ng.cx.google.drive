(function () {
	'use strict';

	var gulp = require('gulp'),
		rimraf = require('gulp-rimraf');

	function clean(appConfig) {
		return function() {
			return gulp.src([appConfig.output], {
					read: false
				})
				.pipe(rimraf({ force: true }));
		};
	}

	exports.task = clean;
}());