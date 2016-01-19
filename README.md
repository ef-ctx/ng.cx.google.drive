# ng.cx.google.drive
[![Build Status](https://travis-ci.org/ef-ctx/ng.cx.google.drive.svg?branch=master)](https://travis-ci.org/ef-ctx/ng.cx.google.drive)

angular 1.x wrapper for google drive api written in typescript.

> ###DESCRIPTION###

Provides a wrapper around Google Drives v3 REST api, and exports it in angular 1.0 modules:


## Getting Started

Add **ng.cx.google.drive** to you project.

Via npm:

```bash
$ npm install --save ng.cx.google.drive
```

`ng.cx.google.drive` uses SystemJS as module loader. This means that we need to do a few things with our AngularJS application to get it to load in the correct order.

#### 1. Add these modules to your html `(index.html)`

```html
<script src="node_modules/systemjs/dist/system.js"></script>
<script src="node_modules/ng.cx.google.drive/dist/ng.cx.google.drive.js"></script>
```

#### 2. Prevent angular from manually bootstrap the application. Remove any `ng-app` directive from you page.

#### 3. Tell `SystemJS` that `cx` and `google` has `.js` as file extention.

```html
<script>
System.config({
	packages: {
		'cx': {defaultExtension: 'js'},
		'google': {defaultExtension: 'js'}
	}
});
</script>
```

#### 4. Manually bootstrap your application.

```html
<script>
	System.import('cx/googleDrive')
		.then(function (module) {
			// This will create the angular 1.x modules before the applcation is bootstraped.
			// it will also add the google script tags and load the driver api.
			module.GoogleDrive.bootstrap();

			// Manually bootstrap you application
			angular.element(document).ready(function() {
			    angular.bootstrap(document, ['myApp']);
			});
		});
</script>
```

### Example use of the angular 1.x `ng.cx.google.drive` module

Check if a user is authorized or not. If not logg them in.

```javascript
angular.module('myApp', [
'ng.cx.google.drive'
])

.controller('MainCtrl', [
	'Auth',
	function (Auth) {
		'use strict';
		// Read here how to create your clientId https://developers.google.com/drive/v3/web/quickstart/js
		var _auth = new Auth('YOUR_CLIENT_ID');

		_auth.checkAuth()
			.then(loggedIn)
			.catch(notLoggedIn);

		function loggedIn() {
			console.log('Logged in');
		}

		function notLoggedIn() {
			console.log('not logged in');
			// Let's authorize user.
			_auth.authorize()
				.then(loggedIn)
		}
	}
])

```

Example of listing files and get a single file

```javascript
angular.module('myApp', [
'ng.cx.google.drive'
])

.controller('MainCtrl', [
	'$scope',
	'drive',
	'DriveQuery',
	function ($scope, drive, DriveQuery) {
		'use strict';
		var _query = new DriveQuery();

		// If we don't specify fields, Google Drive REST API will by default return only `kind`, `id`, `name`, `mimeType`.
		// We want the icon and thumbnail as well so we need to define all fields.
		_query.fields([
			'files/id',
			'files/name',
			'files/iconLink',
			'files/thumbnailLink',
			'files/mimeType'
		]);

		// We only want items from the root folder of our drive
		// And this is owned be me
		// And only specified mimeTypes
		_query.equal('parents', 'root')
			.equal('owners', 'me')
			.equal('mimeType', ['application/vnd.google-apps.folder', 'audio/mpeg', 'image/jpeg', 'image/png', 'image/gif', 'application/pdf', 'video/mp4']);

		// Notice how you can chain all `_query` methods. All methods return `this` so they can easilly be chained.
		// You can also use negative equals
		_query.not.equal('name', 'Monkey.');

		// And order by folders first then name
		_query.orderBy('folder').orderBy('name');

		// Now we can perform the query
		drive.list(_query)
			.then(handleResults);

		function handleResults(result) {
			// `result` contains a `.query` and `.resources`;
			// You can use the `result.query` if you want to fetch the next set of files (pagination) 
			// `result.resources` are of type `DriveFileResource[]`

			// Lets fetch the entire file resource of the first file of our result;
			var _getFilequery = new DriveQuery();
			_getFilequery.fileId(result.resources[0].id);

			drive.get(_getFilequery)
				.then(function (result) {
					// `result` contains a `.query` and `.resource`;
					// Notice the difference between a `.get` and a `.list`.
					// Here the result is in `result.resource`.
				});
		}
	}
])

```


## Contributing

We'd love for you to contribute to our source code and to make it even better than it is today!

Make sure you read the [Contributing Guide](CONTRIBUTING.md) first.


## Developing

Clone this repository, install the dependencies and simply run `gulp`.

```
$ npm install -g gulp
$ npm install
$ gulp
```

To view example (after above commands have run)

```
$ npm start 
```

## [MIT License](LICENSE)

[Copyright (c) 2015 EF CTX](https://raw.githubusercontent.com/EFEducationFirstMobile/oss/master/LICENSE)

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.