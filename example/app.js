angular.module('ng.cx.google.drive.example', [
	'ng.cx.google.drive'
])
.controller('MainCtrl', [
	'$scope',
	'api',
	'Auth',
	'drive',
	function ($scope, api, Auth, drive) {
		'use strict';
		var _auth = new Auth('969216875609-3q7nveut98ff6pu0d4aq3encp3nssplm.apps.googleusercontent.com');

		_auth.checkAuth().then(function () {
			console.log('logged in!');

			// api.load('drive', 'v3').then(function () {
			drive.list().then(function (items) {
				console.log(items);
				$scope.$evalAsync(function () {
					$scope.items = $scope.items.concat(items);
				});
			});
			// });

		}, function (reason) {
			console.log('NOT logged in :(', reason);
		});

		$scope.items = [];
		$scope.msg = 'Hello, earth!';
		$scope.authorize = authorize;
		$scope.get = get;

		function authorize() {
			_auth.authorize().then(function () {
				$scope.msg = 'Hello, earth!!!';
			});
		}

		function get(fileId) {
			drive.get(fileId);
		}
	}
]);