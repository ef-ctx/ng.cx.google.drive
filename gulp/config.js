var config = {
	'output': 'build/',
	'vendor': {
		'js': [
			'node_modules/systemjs/dist/system-polyfills.src.js',
			'node_modules/systemjs/dist/system.src.js',
			'node_modules/es6-promise/dist/es6-promise.js'
		]
	},
	'src': {
		'ts': [
			'src/*.ts',
			'src/**/*.ts'
		]
	},
	'typescript': {
		'tsconfig': 'src/tsconfig.json'
	},
	'test': {
		'js': [
			{
				pattern: 'build/**/*.js',
				included: false,
				watched: false
			}
		]
	}
};

module.exports = config;