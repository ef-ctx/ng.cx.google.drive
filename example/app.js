angular.module('ng.cx.google.drive.example', [
	'ngMaterial',
	'ng.cx.google.drive',
])

.config([
	'$sceProvider',
	function($sceProvider) {
  	$sceProvider.enabled(false);
	}
])

.controller('MainCtrl', [
	'$scope',
	'$sce',
	'api',
	'Auth',
	'drive',
	'DriveQuery',
	function ($scope, $sce, api, Auth, drive, DriveQuery) {
		'use strict';
		var _auth = new Auth('969216875609-3q7nveut98ff6pu0d4aq3encp3nssplm.apps.googleusercontent.com'),
			parent = ['root'];

		$scope.authorized = false;
		$scope.loading = true;
		$scope.items = [];
		$scope.allowBack = parent.length > 1;

		$scope.authorize = authorize;
		$scope.back = back;
		$scope.open = open;
		$scope.openNewWindow = openNewWindow;
		$scope.isAudio = isAudio;
		$scope.isImage = isImage;
		$scope.isVideo = isVideo;
		$scope.isUnkown = isUnkown;
		$scope.iframeUrl = iframeUrl;
		$scope.genereatePublicLink = genereatePublicLink;

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

		function authorize() {
			_auth.authorize().then(function () {
				$scope.authorized = true;
				_loadFiles();
			});
		}

		function back() {
			parent.pop();

			_loadFiles();
		}

		function open(file) {
			if (file.isFolder()) {
				parent.push(file.id);

				_loadFiles();

				return;
			}

			var _query = new DriveQuery();

			_query.fields(['name', 'thumbnailLink', 'permissions', 'id', 'webContentLink', 'webViewLink', 'mimeType']);
			_query.fileId(file.id);

			drive.get(_query).then(function (resp) {
				$scope.$evalAsync(function () {
					$scope.selectedFile = resp.resource;
				});
			});
		}

		function openNewWindow(file) {
			var _newWindow = window.open(
				file.webViewLink,
				file.name,
    		'resizable,scrollbars,status'
  		);
		}

		function isAudio(file) {
			return /^audio/.test(file.mimeType);
		}

		function isImage(file) {
			return /^image/.test(file.mimeType);
		}

		function isVideo(file) {
			return /^video/.test(file.mimeType);
		}

		function isUnkown(file) {
			return !(/^image/.test(file.mimeType) || /^audio/.test(file.mimeType) || /^video/.test(file.mimeType));
		}

		function iframeUrl(file) {
			return file.webContentLink.replace(/\&.+$/, '');
		}

		function genereatePublicLink() {
			drive.permissions.create($scope.selectedFile.id, 'anyone', 'reader').then(function () {
				open($scope.selectedFile);
			});
		}

		function _loadFiles() {
			var _query = new DriveQuery();

			$scope.allowBack = parent.length > 1;
			$scope.items = [];

			_query.fields([
					'files/id',
					'files/name',
					'files/iconLink',
					'files/thumbnailLink',
					'files/mimeType'
				])
				.equal('parents', parent[parent.length - 1])
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