angular.module('ng.cx.google.drive.example', [
	'ngMaterial',
	'ng.cx.google.drive',
])
.controller('MainCtrl', [
	'$scope',
	'api',
	'Auth',
	'drive',
	'DriveQuery',
	function ($scope, api, Auth, drive, DriveQuery) {
		'use strict';
		var _auth = new Auth('969216875609-3q7nveut98ff6pu0d4aq3encp3nssplm.apps.googleusercontent.com');
			parent = 'root';

		_auth.checkAuth().then(function () {
			$scope.$evalAsync(function () {
				$scope.authorized = true;
				$scope.loading = false;
			});

			_loadFiles();
		}, function (reason) {
			$scope.$evalAsync(function () {
				$scope.authorized = false;
				$scope.loading = false;
			});
		});

		$scope.authorized = false;
		$scope.loading = true;
		$scope.items = [];
		$scope.authorize = authorize;
		$scope.open = open;
		$scope.genereatePublicLink = genereatePublicLink;

		function authorize() {
			_auth.authorize().then(function () {
				$scope.authorized = true;
				_loadFiles();
			});
		}

		function open(file) {
			if (file.isFolder()) {
				parent = file.id;
				_loadFiles();

				return;
			}

			var _query = new DriveQuery();

			_query.fields(['name', 'thumbnailLink', 'permissions', 'id', 'webContentLink']);
			_query.fileId(file.id);

			drive.get(_query).then(function (resp) {
				$scope.$evalAsync(function () {
					$scope.selectedFile = resp.resource;
				});
			});
		}

		function genereatePublicLink() {
			drive.permissions.create($scope.selectedFile.id, 'anyone', 'reader').then(function () {
				get($scope.selectedFile.id);
			});
		}

		function _loadFiles() {
			var _query = new DriveQuery();

			_query.fields([
					'files/id',
					'files/name',
					'files/iconLink',
					'files/thumbnailLink',
					'files/mimeType'
				])
				.equal('parents', parent)
				.equal('owners', 'me')
				.equal('mimeType', ['application/vnd.google-apps.folder', 'audio/mpeg', 'image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'application/pdf', 'video/mp4'])
				.orderBy('folder')
				.orderBy('name');

			drive.list(_query).then(function (resp) {
				$scope.$evalAsync(function () {
					$scope.items = resp.resources;
				});
			});
		}
	}
]);