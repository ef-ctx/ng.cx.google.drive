(function () {
	'use strict';

	var karmaServer = require('karma').Server;

	function karma(appConfig) {
		return function(done) {
			var server = new karmaServer({
				configFile: __dirname + '/../../karma.conf.js',
				files: appConfig.vendor.js
					.concat(['./test-init.js'])
					.concat(appConfig.test.js),
				singleRun: true
			}, done);

			server.start();
		};
	}

	exports.task = karma;
	exports.dependencies = [
		'build-typescript'
	];
}());