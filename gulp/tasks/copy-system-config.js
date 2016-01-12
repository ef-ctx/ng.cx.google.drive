(function () {
	'use strict';

	var gulp = require('gulp');

	function copySystemConfig(appConfig) {
		return function() {
			return gulp.src(appConfig.typescript.systemConfig, {
					base: './src'
				})
				.pipe(gulp.dest(appConfig.example));
		};
	}

	exports.task = copySystemConfig;
}());