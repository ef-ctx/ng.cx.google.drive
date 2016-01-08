(function () {
	'use strict';

	var gulp = require('gulp');

	function watch(appConfig) {
		return function () {
			gulp.watch(appConfig.src.ts, ['karma']);
		};
	}

	exports.task = watch;
	exports.dependencies = [
		'default'
	];
}());
