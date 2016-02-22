(function () {
	'use strict';

	var gulp = require('gulp'),
	  concat = require('gulp-concat'),
    Builder = require('systemjs-builder');

	function distBundles(appConfig) {
		return function (cb) {
			var builder = new Builder('./src', {
          'transpiler': 'typescript',
          'paths': {
            'cx/*': 'cx/*.ts',
            'google/*': 'google/*.ts'
          },
          'map': {
            'typescript': './node_modules/typescript/lib/typescript.js'
          }
        }),
				inputPath = appConfig.typescript.inputPath,
				outputFile = appConfig.dist + '/bundles/ng.cx.google.drive.js';

				builder.bundle(inputPath, outputFile,  { format: 'register', minify: true, sourceMaps: true })
					.then(function () {
						cb();
					})
					.catch(function (ex) {
						console.log(ex);
						new Error(ex);
					});
		};
	};

	exports.task = distBundles;
}());