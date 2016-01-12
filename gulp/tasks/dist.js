(function () {
	'use strict';

	var gulp = require('gulp'),
	Builder = require('systemjs-builder');

	function dist(appConfig) {
		return function (cb) {
			var builder = new Builder(appConfig.output, appConfig.typescript.systemConfig),
				inputPath = appConfig.typescript.inputPath,
				outputFile = appConfig.dist + 'ng.cx.google.drive.js';;

				builder.bundle(inputPath, outputFile,  { minify: true, sourceMaps: true })
					.then(function () {
						cb();
					})
					.catch(function (ex) {
						console.log(ex);
						new Error(ex);
					});
		};
	};

	exports.task = dist;
	exports.dependencies = [
		'karma'
	];
}());