var config = {
	'dist': 'dist/',
	'output': 'build/',
	'example': 'example/',
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
		'inputPath': 'cx/googleDrive',
		'systemConfig': 'src/system.config.js',
		'tsconfig': 'src/tsconfig.json',
		'tsconfigDist': 'src/tsconfig.dist.json',
    'tsconfigExample': 'src/tsconfig.example.json'
	},
	'test': {
    'mocks': [
      'mocks/*.ts'
    ],
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