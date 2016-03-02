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
    'distTs': [
      'src/*.ts',
      'src/**/*.ts',
      '!src/**/*.spec.ts',
      '!src/example.ts',
      '!src/mocks/*.ts',
    ],
    'distTypings': [
      'src/cx/google/drive/*.d.ts'
    ],
    'exampleTs': [
      'src/*.ts',
      'src/**/*.ts',
      '!src/**/*.spec.ts',
      '!src/mocks/*.ts',
    ],
    'ts': [
      'src/*.ts',
      'src/**/*.ts',
      '!src/example.ts',
    ],
    'typings': [
      'typings/tsd.d.ts'
    ]
  },
	'typescript': {
		'inputPath': 'cx/google/drive/drive',
		'systemConfig': 'src/system.config.js',
		'tsconfig': 'src/tsconfig.json'
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