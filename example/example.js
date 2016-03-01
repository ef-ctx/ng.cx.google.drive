/// <reference path="../typings/tsd.d.ts" />
System.register(['cx/google/core', 'cx/google/drive/files', 'cx/google/drive/permissions', 'cx/google/drive/query'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var core_1, files_1, permissions_1, query_1;
    var ExampleConfig, CxGoogleDriveExampleCtrl;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (files_1_1) {
                files_1 = files_1_1;
            },
            function (permissions_1_1) {
                permissions_1 = permissions_1_1;
            },
            function (query_1_1) {
                query_1 = query_1_1;
            }],
        execute: function() {
            ExampleConfig = (function () {
                function ExampleConfig($sceProvider) {
                    $sceProvider.enabled(false);
                }
                ExampleConfig.$inject = ['$sceProvider'];
                return ExampleConfig;
            }());
            CxGoogleDriveExampleCtrl = (function () {
                function CxGoogleDriveExampleCtrl($scope, $sce) {
                    this.auth = new core_1.Auth(CLIENT_ID);
                    this.parent = ['root'];
                    this.$scope = $scope;
                    this.authorized = false;
                    this.loading = true;
                    this.items = [];
                    this.allowBack = this.parent.length > 1;
                    this.checkAuth();
                }
                CxGoogleDriveExampleCtrl.prototype.authorize = function () {
                    var _this = this;
                    this.auth.authorize().then(function () {
                        _this.authorized = true;
                        System.import('cx/google/drive/drive')
                            .then(function () { return _this.loadFiles(); });
                    }, function (reason) {
                        console.error('reason', reason);
                    });
                };
                CxGoogleDriveExampleCtrl.prototype.back = function () {
                    this.parent.pop();
                    this.loadFiles();
                };
                CxGoogleDriveExampleCtrl.prototype.iframeUrl = function (file) {
                    return file.webContentLink.replace(/\&.+$/, '');
                };
                CxGoogleDriveExampleCtrl.prototype.isAudio = function (file) {
                    return /^audio/.test(file.mimeType);
                };
                CxGoogleDriveExampleCtrl.prototype.isImage = function (file) {
                    return /^image/.test(file.mimeType);
                };
                CxGoogleDriveExampleCtrl.prototype.isVideo = function (file) {
                    return /^video/.test(file.mimeType);
                };
                CxGoogleDriveExampleCtrl.prototype.isUnkown = function (file) {
                    return !(/^image/.test(file.mimeType) || /^audio/.test(file.mimeType) || /^video/.test(file.mimeType));
                };
                CxGoogleDriveExampleCtrl.prototype.genereatePublicLink = function (file) {
                    var _this = this;
                    permissions_1.DrivePermissions.create(file.id, 'anyone', 'reader').then(function () {
                        _this.open(file);
                    });
                };
                CxGoogleDriveExampleCtrl.prototype.open = function (file) {
                    if (file.isFolder()) {
                        this.parent.push(file.id);
                        this.loadFiles();
                    }
                    else {
                        this.openFile(file);
                    }
                };
                CxGoogleDriveExampleCtrl.prototype.openNewWindow = function (file) {
                    var _newWindow = window.open(file.webViewLink, file.name, 'resizable,scrollbars,status');
                };
                CxGoogleDriveExampleCtrl.prototype.revoke = function () {
                    var _this = this;
                    this.auth.signOut()
                        .then(function () {
                        _this.checkAuth();
                    })
                        .catch(function () {
                        _this.checkAuth();
                    });
                };
                CxGoogleDriveExampleCtrl.prototype.checkAuth = function () {
                    var $scope = this.$scope, self = this;
                    this.auth.checkAuth()
                        .then(_authorized)
                        .catch(_unauthorized);
                    function _authorized() {
                        $scope.$evalAsync(function () {
                            self.authorized = true;
                            self.loading = false;
                        });
                        System.import('cx/google/drive/drive')
                            .then(function () { return self.loadFiles(); });
                    }
                    function _unauthorized() {
                        $scope.$evalAsync(function () {
                            self.authorized = false;
                            self.loading = false;
                            self.items = [];
                        });
                    }
                };
                CxGoogleDriveExampleCtrl.prototype.loadFiles = function () {
                    var self = this, $scope = this.$scope, query = new query_1.DriveQuery();
                    this.allowBack = this.parent.length > 1;
                    this.items = [];
                    query.fields([
                        'files/id',
                        'files/name',
                        'files/iconLink',
                        'files/thumbnailLink',
                        'files/mimeType'
                    ])
                        .equal('parents', this.parent[this.parent.length - 1])
                        .equal('owners', 'me')
                        .equal('mimeType', ['application/vnd.google-apps.folder', 'audio/mpeg', 'image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'application/pdf', 'video/mp4'])
                        .orderBy('folder')
                        .orderBy('name');
                    files_1.Files.list(query).then(_showFiles);
                    function _showFiles(resp) {
                        $scope.$evalAsync(function () {
                            self.items = resp.resources;
                        });
                    }
                };
                CxGoogleDriveExampleCtrl.prototype.openFile = function (file) {
                    var self = this, $scope = this.$scope, query = new query_1.DriveQuery();
                    query.fields(['name', 'thumbnailLink', 'permissions', 'id', 'webContentLink', 'webViewLink', 'mimeType']);
                    query.fileId(file.id);
                    files_1.Files.get(query).then(_showFile);
                    function _showFile(resp) {
                        $scope.$evalAsync(function () {
                            self.selectedFile = resp.resource;
                        });
                    }
                };
                CxGoogleDriveExampleCtrl.$inject = ['$scope', '$sce'];
                return CxGoogleDriveExampleCtrl;
            }());
            exports_1("default",angular.module('cx.google.drive.example', [
                'ngMaterial',
            ])
                .config(ExampleConfig)
                .controller('cxGoogleDriveExampleCtrl', CxGoogleDriveExampleCtrl)
                .directive('cxGoogleDriveExample', [
                function () {
                    return {
                        'restrict': 'A',
                        'controller': 'cxGoogleDriveExampleCtrl as ctrl'
                    };
                }
            ]));
        }
    }
});
