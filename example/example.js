/// <reference path="../typings/browser.d.ts" />
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

//# sourceMappingURL=data:application/json;base64,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QUFDLENBQUM7Z0JBMkpoRCwrQkFBQztZQUFELENBdEtBLEFBc0tDLElBQUE7WUFFRCxvQkFBZSxPQUFPLENBQUMsTUFBTSxDQUFDLHlCQUF5QixFQUFFO2dCQUN2RCxZQUFZO2FBQ2IsQ0FBQztpQkFDQyxNQUFNLENBQUMsYUFBYSxDQUFDO2lCQUNyQixVQUFVLENBQUMsMEJBQTBCLEVBQUUsd0JBQXdCLENBQUM7aUJBQ2hFLFNBQVMsQ0FBQyxzQkFBc0IsRUFBRTtnQkFDakM7b0JBQ0UsTUFBTSxDQUFDO3dCQUNMLFVBQVUsRUFBRSxHQUFHO3dCQUNmLFlBQVksRUFBRSxrQ0FBa0M7cUJBQ2pELENBQUM7Z0JBQ0osQ0FBQzthQUNGLENBQUMsRUFBQyIsImZpbGUiOiJleGFtcGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL3R5cGluZ3MvYnJvd3Nlci5kLnRzXCIgLz5cblxuZGVjbGFyZSB2YXIgYW5ndWxhcjogYW55O1xuZGVjbGFyZSB2YXIgQ0xJRU5UX0lEOiBhbnk7XG5kZWNsYXJlIHZhciBTeXN0ZW06IGFueTtcblxuaW1wb3J0IHtBdXRofSBmcm9tICdjeC9nb29nbGUvY29yZSc7XG5pbXBvcnQge0RyaXZlRmlsZVJlc291cmNlfSBmcm9tICdjeC9nb29nbGUvZHJpdmUvZmlsZSc7XG5pbXBvcnQge0ZpbGVzfSBmcm9tICdjeC9nb29nbGUvZHJpdmUvZmlsZXMnO1xuaW1wb3J0IHtEcml2ZVBlcm1pc3Npb25zfSBmcm9tICdjeC9nb29nbGUvZHJpdmUvcGVybWlzc2lvbnMnXG5pbXBvcnQge0RyaXZlUXVlcnl9IGZyb20gJ2N4L2dvb2dsZS9kcml2ZS9xdWVyeSc7XG5cbmNsYXNzIEV4YW1wbGVDb25maWcge1xuICBzdGF0aWMgJGluamVjdDogc3RyaW5nW10gPSBbJyRzY2VQcm92aWRlciddO1xuICBjb25zdHJ1Y3Rvcigkc2NlUHJvdmlkZXIpIHtcbiAgICAkc2NlUHJvdmlkZXIuZW5hYmxlZChmYWxzZSk7XG4gIH1cbn1cblxuY2xhc3MgQ3hHb29nbGVEcml2ZUV4YW1wbGVDdHJsIHtcbiAgcHJpdmF0ZSBhdXRoOiBBdXRoO1xuICBwcml2YXRlIHBhcmVudDogc3RyaW5nW107XG4gIHByaXZhdGUgJHNjb3BlOiBhbnk7XG5cbiAgYWxsb3dCYWNrOiBib29sZWFuO1xuICBhdXRob3JpemVkOiBib29sZWFuO1xuICBpdGVtczogRHJpdmVGaWxlUmVzb3VyY2VbXTtcbiAgbG9hZGluZzogYm9vbGVhbjtcbiAgc2VsZWN0ZWRGaWxlOiBEcml2ZUZpbGVSZXNvdXJjZTtcblxuICBzdGF0aWMgJGluamVjdDogc3RyaW5nW10gPSBbJyRzY29wZScsICckc2NlJ107XG4gIGNvbnN0cnVjdG9yKCRzY29wZSwgJHNjZSkge1xuICAgIHRoaXMuYXV0aCA9IG5ldyBBdXRoKENMSUVOVF9JRCk7XG4gICAgdGhpcy5wYXJlbnQgPSBbJ3Jvb3QnXTtcbiAgICB0aGlzLiRzY29wZSA9ICRzY29wZTtcblxuICAgIHRoaXMuYXV0aG9yaXplZCA9IGZhbHNlO1xuICAgIHRoaXMubG9hZGluZyA9IHRydWU7XG4gICAgdGhpcy5pdGVtcyA9IFtdO1xuICAgIHRoaXMuYWxsb3dCYWNrID0gdGhpcy5wYXJlbnQubGVuZ3RoID4gMTtcblxuICAgIHRoaXMuY2hlY2tBdXRoKCk7XG4gIH1cblxuICBhdXRob3JpemUoKTp2b2lkIHtcbiAgICB0aGlzLmF1dGguYXV0aG9yaXplKCkudGhlbigoKSA9PiB7XG4gICAgICB0aGlzLmF1dGhvcml6ZWQgPSB0cnVlO1xuICAgICAgU3lzdGVtLmltcG9ydCgnY3gvZ29vZ2xlL2RyaXZlL2RyaXZlJylcbiAgICAgICAgLnRoZW4oKCkgPT4gdGhpcy5sb2FkRmlsZXMoKSk7XG4gICAgfSwgZnVuY3Rpb24ocmVhc29uKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdyZWFzb24nLCByZWFzb24pO1xuICAgIH0pO1xuICB9XG5cbiAgYmFjaygpOnZvaWQge1xuICAgIHRoaXMucGFyZW50LnBvcCgpO1xuICAgIHRoaXMubG9hZEZpbGVzKCk7XG4gIH1cblxuICBpZnJhbWVVcmwoZmlsZTogRHJpdmVGaWxlUmVzb3VyY2UpOiBzdHJpbmcge1xuICAgIHJldHVybiBmaWxlLndlYkNvbnRlbnRMaW5rLnJlcGxhY2UoL1xcJi4rJC8sICcnKTtcbiAgfVxuXG4gIGlzQXVkaW8oZmlsZTpEcml2ZUZpbGVSZXNvdXJjZSk6Ym9vbGVhbiB7XG4gICAgcmV0dXJuIC9eYXVkaW8vLnRlc3QoZmlsZS5taW1lVHlwZSk7XG4gIH1cblxuICBpc0ltYWdlKGZpbGU6RHJpdmVGaWxlUmVzb3VyY2UpOmJvb2xlYW4ge1xuICAgIHJldHVybiAvXmltYWdlLy50ZXN0KGZpbGUubWltZVR5cGUpO1xuICB9XG5cbiAgaXNWaWRlbyhmaWxlOkRyaXZlRmlsZVJlc291cmNlKTpib29sZWFuIHtcbiAgICByZXR1cm4gL152aWRlby8udGVzdChmaWxlLm1pbWVUeXBlKTtcbiAgfVxuXG4gIGlzVW5rb3duKGZpbGU6RHJpdmVGaWxlUmVzb3VyY2UpOmJvb2xlYW4ge1xuICAgIHJldHVybiAhKC9eaW1hZ2UvLnRlc3QoZmlsZS5taW1lVHlwZSkgfHwgL15hdWRpby8udGVzdChmaWxlLm1pbWVUeXBlKSB8fCAvXnZpZGVvLy50ZXN0KGZpbGUubWltZVR5cGUpKTtcbiAgfVxuXG4gIGdlbmVyZWF0ZVB1YmxpY0xpbmsoZmlsZTpEcml2ZUZpbGVSZXNvdXJjZSk6dm9pZCB7XG4gICAgRHJpdmVQZXJtaXNzaW9ucy5jcmVhdGUoZmlsZS5pZCwgJ2FueW9uZScsICdyZWFkZXInKS50aGVuKCgpID0+IHtcbiAgICAgIHRoaXMub3BlbihmaWxlKTtcbiAgICB9KTtcbiAgfVxuXG4gIG9wZW4oZmlsZTpEcml2ZUZpbGVSZXNvdXJjZSk6dm9pZCB7XG4gICAgaWYgKGZpbGUuaXNGb2xkZXIoKSkge1xuICAgICAgdGhpcy5wYXJlbnQucHVzaChmaWxlLmlkKTtcbiAgICAgIHRoaXMubG9hZEZpbGVzKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMub3BlbkZpbGUoZmlsZSk7XG4gICAgfVxuICB9XG5cbiAgb3Blbk5ld1dpbmRvdyhmaWxlOiBEcml2ZUZpbGVSZXNvdXJjZSk6IHZvaWQge1xuICAgIHZhciBfbmV3V2luZG93ID0gd2luZG93Lm9wZW4oXG4gICAgICBmaWxlLndlYlZpZXdMaW5rLFxuICAgICAgZmlsZS5uYW1lLFxuICAgICAgJ3Jlc2l6YWJsZSxzY3JvbGxiYXJzLHN0YXR1cydcbiAgICApO1xuICB9XG5cbiAgcmV2b2tlKCk6dm9pZCB7XG4gICAgdGhpcy5hdXRoLnNpZ25PdXQoKVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICB0aGlzLmNoZWNrQXV0aCgpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoKSA9PiB7XG4gICAgICAgIHRoaXMuY2hlY2tBdXRoKCk7XG4gICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgY2hlY2tBdXRoKCk6dm9pZCB7XG4gICAgdmFyICRzY29wZSA9IHRoaXMuJHNjb3BlLFxuICAgICAgc2VsZiA9IHRoaXM7XG5cbiAgICB0aGlzLmF1dGguY2hlY2tBdXRoKClcbiAgICAgIC50aGVuKF9hdXRob3JpemVkKVxuICAgICAgLmNhdGNoKF91bmF1dGhvcml6ZWQpO1xuXG4gICAgZnVuY3Rpb24gX2F1dGhvcml6ZWQoKSB7XG4gICAgICAkc2NvcGUuJGV2YWxBc3luYyhmdW5jdGlvbigpIHtcbiAgICAgICAgc2VsZi5hdXRob3JpemVkID0gdHJ1ZTtcbiAgICAgICAgc2VsZi5sb2FkaW5nID0gZmFsc2U7XG4gICAgICB9KTtcblxuICAgICAgU3lzdGVtLmltcG9ydCgnY3gvZ29vZ2xlL2RyaXZlL2RyaXZlJylcbiAgICAgICAgLnRoZW4oKCkgPT4gc2VsZi5sb2FkRmlsZXMoKSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gX3VuYXV0aG9yaXplZCgpIHtcbiAgICAgICRzY29wZS4kZXZhbEFzeW5jKGZ1bmN0aW9uKCkge1xuICAgICAgICBzZWxmLmF1dGhvcml6ZWQgPSBmYWxzZTtcbiAgICAgICAgc2VsZi5sb2FkaW5nID0gZmFsc2U7XG4gICAgICAgIHNlbGYuaXRlbXMgPSBbXTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgbG9hZEZpbGVzKCk6dm9pZCB7XG4gICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgJHNjb3BlID0gdGhpcy4kc2NvcGUsXG4gICAgICBxdWVyeSA9IG5ldyBEcml2ZVF1ZXJ5KCk7XG5cbiAgICB0aGlzLmFsbG93QmFjayA9IHRoaXMucGFyZW50Lmxlbmd0aCA+IDE7XG4gICAgdGhpcy5pdGVtcyA9IFtdO1xuXG4gICAgcXVlcnkuZmllbGRzKFtcbiAgICAgICAgJ2ZpbGVzL2lkJyxcbiAgICAgICAgJ2ZpbGVzL25hbWUnLFxuICAgICAgICAnZmlsZXMvaWNvbkxpbmsnLFxuICAgICAgICAnZmlsZXMvdGh1bWJuYWlsTGluaycsXG4gICAgICAgICdmaWxlcy9taW1lVHlwZSdcbiAgICAgIF0pXG4gICAgICAuZXF1YWwoJ3BhcmVudHMnLCB0aGlzLnBhcmVudFt0aGlzLnBhcmVudC5sZW5ndGggLSAxXSlcbiAgICAgIC5lcXVhbCgnb3duZXJzJywgJ21lJylcbiAgICAgIC5lcXVhbCgnbWltZVR5cGUnLCBbJ2FwcGxpY2F0aW9uL3ZuZC5nb29nbGUtYXBwcy5mb2xkZXInLCAnYXVkaW8vbXBlZycsICdpbWFnZS9qcGVnJywgJ2ltYWdlL3BuZycsICdpbWFnZS9naWYnLCAnaW1hZ2UvYm1wJywgJ2FwcGxpY2F0aW9uL3BkZicsICd2aWRlby9tcDQnXSlcbiAgICAgIC5vcmRlckJ5KCdmb2xkZXInKVxuICAgICAgLm9yZGVyQnkoJ25hbWUnKTtcblxuICAgIEZpbGVzLmxpc3QocXVlcnkpLnRoZW4oX3Nob3dGaWxlcyk7XG5cbiAgICBmdW5jdGlvbiBfc2hvd0ZpbGVzKHJlc3ApIHtcbiAgICAgICRzY29wZS4kZXZhbEFzeW5jKGZ1bmN0aW9uKCkge1xuICAgICAgICBzZWxmLml0ZW1zID0gcmVzcC5yZXNvdXJjZXM7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIG9wZW5GaWxlKGZpbGU6RHJpdmVGaWxlUmVzb3VyY2UpOnZvaWQge1xuICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICRzY29wZSA9IHRoaXMuJHNjb3BlLFxuICAgICAgcXVlcnkgPSBuZXcgRHJpdmVRdWVyeSgpO1xuXG4gICAgcXVlcnkuZmllbGRzKFsnbmFtZScsICd0aHVtYm5haWxMaW5rJywgJ3Blcm1pc3Npb25zJywgJ2lkJywgJ3dlYkNvbnRlbnRMaW5rJywgJ3dlYlZpZXdMaW5rJywgJ21pbWVUeXBlJ10pO1xuICAgIHF1ZXJ5LmZpbGVJZChmaWxlLmlkKTtcblxuICAgIEZpbGVzLmdldChxdWVyeSkudGhlbihfc2hvd0ZpbGUpO1xuXG4gICAgZnVuY3Rpb24gX3Nob3dGaWxlKHJlc3ApIHtcbiAgICAgICRzY29wZS4kZXZhbEFzeW5jKGZ1bmN0aW9uKCkge1xuICAgICAgICBzZWxmLnNlbGVjdGVkRmlsZSA9IHJlc3AucmVzb3VyY2U7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgYW5ndWxhci5tb2R1bGUoJ2N4Lmdvb2dsZS5kcml2ZS5leGFtcGxlJywgW1xuICAnbmdNYXRlcmlhbCcsXG5dKVxuICAuY29uZmlnKEV4YW1wbGVDb25maWcpXG4gIC5jb250cm9sbGVyKCdjeEdvb2dsZURyaXZlRXhhbXBsZUN0cmwnLCBDeEdvb2dsZURyaXZlRXhhbXBsZUN0cmwpXG4gIC5kaXJlY3RpdmUoJ2N4R29vZ2xlRHJpdmVFeGFtcGxlJywgW1xuICAgIGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgJ3Jlc3RyaWN0JzogJ0EnLFxuICAgICAgICAnY29udHJvbGxlcic6ICdjeEdvb2dsZURyaXZlRXhhbXBsZUN0cmwgYXMgY3RybCdcbiAgICAgIH07XG4gICAgfVxuICBdKTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
