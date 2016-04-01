(function () {
	'use strict';

	var gulp = require('gulp'),
		jeditor = require('gulp-json-editor');

	function distPackageJson(appConfig) {
		return function() {
			return gulp.src('./package.json')
                .pipe(jeditor(function(json) {
                    json.typings = 'index.d.ts';
                    return json;
                }))
                .pipe(gulp.dest(appConfig.dist));
		};
	}

	exports.task = distPackageJson;
}());
