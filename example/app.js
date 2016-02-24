angular.module('ng.cx.google.drive', [
])

.service('google', [
  '$window',
  function ($window) {
   'use strict';

   this.Auth = $window.cx.google.Auth;
   this.client = $window.cx.google.client;
   this.drive = $window.cx.google.drive.files;
   this.DriveQuery = $window.cx.google.drive.DriveQuery;
  }
]);

angular.module('cx.google.drive.example', [
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
	'google',
	function ($scope, $sce, google) {
		'use strict';
		var _auth = new google.Auth(window.CLIENT_ID),
			parent = ['root'];

		$scope.authorized = false;
		$scope.loading = true;
		$scope.items = [];
		$scope.allowBack = parent.length > 1;

		$scope.authorize = authorize;
		$scope.back = back;
		$scope.open = open;
		$scope.openNewWindow = openNewWindow;
		$scope.revoke = revoke;
		$scope.isAudio = isAudio;
		$scope.isImage = isImage;
		$scope.isVideo = isVideo;
		$scope.isUnkown = isUnkown;
		$scope.iframeUrl = iframeUrl;
		$scope.genereatePublicLink = genereatePublicLink;

		_checkAuth();

		function authorize() {
			_auth.authorize().then(function () {
				$scope.authorized = true;
				_loadFiles();
			}, function (reason) {
				console.log('reason', reason);
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

			var _query = new google.DriveQuery();

			_query.fields(['name', 'thumbnailLink', 'permissions', 'id', 'webContentLink', 'webViewLink', 'mimeType']);
			_query.fileId(file.id);

			google.drive.get(_query).then(function (resp) {
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

		function revoke() {
			_auth.signOut().then(_checkAuth, _checkAuth);
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
			google.drive.permissions.create($scope.selectedFile.id, 'anyone', 'reader').then(function () {
				open($scope.selectedFile);
			});
		}

		function _checkAuth() {
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
					$scope.items = [];
				});
			});
		}

		function _loadFiles() {
			var _query = new google.DriveQuery();

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

			google.drive.list(_query).then(function (resp) {
				$scope.$evalAsync(function () {
					$scope.items = resp.resources;
				});
			});
		}
	}
]);