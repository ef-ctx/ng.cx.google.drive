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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV4YW1wbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsNENBQTRDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUFZNUM7Z0JBRUUsdUJBQVksWUFBWTtvQkFDdEIsWUFBWSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDOUIsQ0FBQztnQkFITSxxQkFBTyxHQUFhLENBQUMsY0FBYyxDQUFDLENBQUM7Z0JBSTlDLG9CQUFDO1lBQUQsQ0FMQSxBQUtDLElBQUE7WUFFRDtnQkFZRSxrQ0FBWSxNQUFNLEVBQUUsSUFBSTtvQkFDdEIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLFdBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFDaEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUN2QixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztvQkFFckIsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7b0JBQ3hCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO29CQUNwQixJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztvQkFDaEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7b0JBRXhDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztnQkFDbkIsQ0FBQztnQkFFRCw0Q0FBUyxHQUFUO29CQUFBLGlCQVFDO29CQVBDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsSUFBSSxDQUFDO3dCQUN6QixLQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQzt3QkFDdkIsTUFBTSxDQUFDLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQzs2QkFDbkMsSUFBSSxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsU0FBUyxFQUFFLEVBQWhCLENBQWdCLENBQUMsQ0FBQztvQkFDbEMsQ0FBQyxFQUFFLFVBQVMsTUFBTTt3QkFDaEIsT0FBTyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7b0JBQ2xDLENBQUMsQ0FBQyxDQUFDO2dCQUNMLENBQUM7Z0JBRUQsdUNBQUksR0FBSjtvQkFDRSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDO29CQUNsQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7Z0JBQ25CLENBQUM7Z0JBRUQsNENBQVMsR0FBVCxVQUFVLElBQXVCO29CQUMvQixNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUNsRCxDQUFDO2dCQUVELDBDQUFPLEdBQVAsVUFBUSxJQUFzQjtvQkFDNUIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUN0QyxDQUFDO2dCQUVELDBDQUFPLEdBQVAsVUFBUSxJQUFzQjtvQkFDNUIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUN0QyxDQUFDO2dCQUVELDBDQUFPLEdBQVAsVUFBUSxJQUFzQjtvQkFDNUIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUN0QyxDQUFDO2dCQUVELDJDQUFRLEdBQVIsVUFBUyxJQUFzQjtvQkFDN0IsTUFBTSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUN6RyxDQUFDO2dCQUVELHNEQUFtQixHQUFuQixVQUFvQixJQUFzQjtvQkFBMUMsaUJBSUM7b0JBSEMsOEJBQWdCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQzt3QkFDeEQsS0FBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDbEIsQ0FBQyxDQUFDLENBQUM7Z0JBQ0wsQ0FBQztnQkFFRCx1Q0FBSSxHQUFKLFVBQUssSUFBc0I7b0JBQ3pCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7d0JBQ3BCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQzt3QkFDMUIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO29CQUNuQixDQUFDO29CQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNOLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ3RCLENBQUM7Z0JBQ0gsQ0FBQztnQkFFRCxnREFBYSxHQUFiLFVBQWMsSUFBdUI7b0JBQ25DLElBQUksVUFBVSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQzFCLElBQUksQ0FBQyxXQUFXLEVBQ2hCLElBQUksQ0FBQyxJQUFJLEVBQ1QsNkJBQTZCLENBQzlCLENBQUM7Z0JBQ0osQ0FBQztnQkFFRCx5Q0FBTSxHQUFOO29CQUFBLGlCQVFDO29CQVBDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO3lCQUNoQixJQUFJLENBQUM7d0JBQ0osS0FBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO29CQUNuQixDQUFDLENBQUM7eUJBQ0QsS0FBSyxDQUFDO3dCQUNMLEtBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztvQkFDbkIsQ0FBQyxDQUFDLENBQUM7Z0JBQ1AsQ0FBQztnQkFFTyw0Q0FBUyxHQUFqQjtvQkFDRSxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxFQUN0QixJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUVkLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFO3lCQUNsQixJQUFJLENBQUMsV0FBVyxDQUFDO3lCQUNqQixLQUFLLENBQUMsYUFBYSxDQUFDLENBQUM7b0JBRXhCO3dCQUNFLE1BQU0sQ0FBQyxVQUFVLENBQUM7NEJBQ2hCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDOzRCQUN2QixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQzt3QkFDdkIsQ0FBQyxDQUFDLENBQUM7d0JBRUgsTUFBTSxDQUFDLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQzs2QkFDbkMsSUFBSSxDQUFDLGNBQU0sT0FBQSxJQUFJLENBQUMsU0FBUyxFQUFFLEVBQWhCLENBQWdCLENBQUMsQ0FBQztvQkFDbEMsQ0FBQztvQkFFRDt3QkFDRSxNQUFNLENBQUMsVUFBVSxDQUFDOzRCQUNoQixJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQzs0QkFDeEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7NEJBQ3JCLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO3dCQUNsQixDQUFDLENBQUMsQ0FBQztvQkFDTCxDQUFDO2dCQUNILENBQUM7Z0JBRU8sNENBQVMsR0FBakI7b0JBQ0UsSUFBSSxJQUFJLEdBQUcsSUFBSSxFQUNiLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxFQUNwQixLQUFLLEdBQUcsSUFBSSxrQkFBVSxFQUFFLENBQUM7b0JBRTNCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO29CQUN4QyxJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztvQkFFaEIsS0FBSyxDQUFDLE1BQU0sQ0FBQzt3QkFDVCxVQUFVO3dCQUNWLFlBQVk7d0JBQ1osZ0JBQWdCO3dCQUNoQixxQkFBcUI7d0JBQ3JCLGdCQUFnQjtxQkFDakIsQ0FBQzt5QkFDRCxLQUFLLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7eUJBQ3JELEtBQUssQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDO3lCQUNyQixLQUFLLENBQUMsVUFBVSxFQUFFLENBQUMsb0NBQW9DLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxpQkFBaUIsRUFBRSxXQUFXLENBQUMsQ0FBQzt5QkFDNUosT0FBTyxDQUFDLFFBQVEsQ0FBQzt5QkFDakIsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUVuQixhQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFFbkMsb0JBQW9CLElBQUk7d0JBQ3RCLE1BQU0sQ0FBQyxVQUFVLENBQUM7NEJBQ2hCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQzt3QkFDOUIsQ0FBQyxDQUFDLENBQUM7b0JBQ0wsQ0FBQztnQkFDSCxDQUFDO2dCQUVPLDJDQUFRLEdBQWhCLFVBQWlCLElBQXNCO29CQUNyQyxJQUFJLElBQUksR0FBRyxJQUFJLEVBQ2IsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQ3BCLEtBQUssR0FBRyxJQUFJLGtCQUFVLEVBQUUsQ0FBQztvQkFFM0IsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sRUFBRSxlQUFlLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxhQUFhLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQztvQkFDMUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7b0JBRXRCLGFBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUVqQyxtQkFBbUIsSUFBSTt3QkFDckIsTUFBTSxDQUFDLFVBQVUsQ0FBQzs0QkFDaEIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO3dCQUNwQyxDQUFDLENBQUMsQ0FBQztvQkFDTCxDQUFDO2dCQUNILENBQUM7Z0JBMUpNLGdDQUFPLEdBQWEsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0JBMkpoRCwrQkFBQztZQUFELENBdEtBLEFBc0tDLElBQUE7WUFFRCxvQkFBZSxPQUFPLENBQUMsTUFBTSxDQUFDLHlCQUF5QixFQUFFO2dCQUN2RCxZQUFZO2FBQ2IsQ0FBQztpQkFDQyxNQUFNLENBQUMsYUFBYSxDQUFDO2lCQUNyQixVQUFVLENBQUMsMEJBQTBCLEVBQUUsd0JBQXdCLENBQUM7aUJBQ2hFLFNBQVMsQ0FBQyxzQkFBc0IsRUFBRTtnQkFDakM7b0JBQ0UsTUFBTSxDQUFDO3dCQUNMLFVBQVUsRUFBRSxHQUFHO3dCQUNmLFlBQVksRUFBRSxrQ0FBa0M7cUJBQ2pELENBQUM7Z0JBQ0osQ0FBQzthQUNGLENBQUMsRUFBQyIsImZpbGUiOiJleGFtcGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL3R5cGluZ3MvdHNkLmQudHNcIiAvPlxuXG5kZWNsYXJlIHZhciBhbmd1bGFyOiBhbnk7XG5kZWNsYXJlIHZhciBDTElFTlRfSUQ6IGFueTtcbmRlY2xhcmUgdmFyIFN5c3RlbTogYW55O1xuXG5pbXBvcnQge0F1dGh9IGZyb20gJ2N4L2dvb2dsZS9jb3JlJztcbmltcG9ydCB7RHJpdmVGaWxlUmVzb3VyY2V9IGZyb20gJ2N4L2dvb2dsZS9kcml2ZS9maWxlJztcbmltcG9ydCB7RmlsZXN9IGZyb20gJ2N4L2dvb2dsZS9kcml2ZS9maWxlcyc7XG5pbXBvcnQge0RyaXZlUGVybWlzc2lvbnN9IGZyb20gJ2N4L2dvb2dsZS9kcml2ZS9wZXJtaXNzaW9ucydcbmltcG9ydCB7RHJpdmVRdWVyeX0gZnJvbSAnY3gvZ29vZ2xlL2RyaXZlL3F1ZXJ5JztcblxuY2xhc3MgRXhhbXBsZUNvbmZpZyB7XG4gIHN0YXRpYyAkaW5qZWN0OiBzdHJpbmdbXSA9IFsnJHNjZVByb3ZpZGVyJ107XG4gIGNvbnN0cnVjdG9yKCRzY2VQcm92aWRlcikge1xuICAgICRzY2VQcm92aWRlci5lbmFibGVkKGZhbHNlKTtcbiAgfVxufVxuXG5jbGFzcyBDeEdvb2dsZURyaXZlRXhhbXBsZUN0cmwge1xuICBwcml2YXRlIGF1dGg6IEF1dGg7XG4gIHByaXZhdGUgcGFyZW50OiBzdHJpbmdbXTtcbiAgcHJpdmF0ZSAkc2NvcGU6IGFueTtcblxuICBhbGxvd0JhY2s6IGJvb2xlYW47XG4gIGF1dGhvcml6ZWQ6IGJvb2xlYW47XG4gIGl0ZW1zOiBEcml2ZUZpbGVSZXNvdXJjZVtdO1xuICBsb2FkaW5nOiBib29sZWFuO1xuICBzZWxlY3RlZEZpbGU6IERyaXZlRmlsZVJlc291cmNlO1xuXG4gIHN0YXRpYyAkaW5qZWN0OiBzdHJpbmdbXSA9IFsnJHNjb3BlJywgJyRzY2UnXTtcbiAgY29uc3RydWN0b3IoJHNjb3BlLCAkc2NlKSB7XG4gICAgdGhpcy5hdXRoID0gbmV3IEF1dGgoQ0xJRU5UX0lEKTtcbiAgICB0aGlzLnBhcmVudCA9IFsncm9vdCddO1xuICAgIHRoaXMuJHNjb3BlID0gJHNjb3BlO1xuXG4gICAgdGhpcy5hdXRob3JpemVkID0gZmFsc2U7XG4gICAgdGhpcy5sb2FkaW5nID0gdHJ1ZTtcbiAgICB0aGlzLml0ZW1zID0gW107XG4gICAgdGhpcy5hbGxvd0JhY2sgPSB0aGlzLnBhcmVudC5sZW5ndGggPiAxO1xuXG4gICAgdGhpcy5jaGVja0F1dGgoKTtcbiAgfVxuXG4gIGF1dGhvcml6ZSgpOnZvaWQge1xuICAgIHRoaXMuYXV0aC5hdXRob3JpemUoKS50aGVuKCgpID0+IHtcbiAgICAgIHRoaXMuYXV0aG9yaXplZCA9IHRydWU7XG4gICAgICBTeXN0ZW0uaW1wb3J0KCdjeC9nb29nbGUvZHJpdmUvZHJpdmUnKVxuICAgICAgICAudGhlbigoKSA9PiB0aGlzLmxvYWRGaWxlcygpKTtcbiAgICB9LCBmdW5jdGlvbihyZWFzb24pIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ3JlYXNvbicsIHJlYXNvbik7XG4gICAgfSk7XG4gIH1cblxuICBiYWNrKCk6dm9pZCB7XG4gICAgdGhpcy5wYXJlbnQucG9wKCk7XG4gICAgdGhpcy5sb2FkRmlsZXMoKTtcbiAgfVxuXG4gIGlmcmFtZVVybChmaWxlOiBEcml2ZUZpbGVSZXNvdXJjZSk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGZpbGUud2ViQ29udGVudExpbmsucmVwbGFjZSgvXFwmLiskLywgJycpO1xuICB9XG5cbiAgaXNBdWRpbyhmaWxlOkRyaXZlRmlsZVJlc291cmNlKTpib29sZWFuIHtcbiAgICByZXR1cm4gL15hdWRpby8udGVzdChmaWxlLm1pbWVUeXBlKTtcbiAgfVxuXG4gIGlzSW1hZ2UoZmlsZTpEcml2ZUZpbGVSZXNvdXJjZSk6Ym9vbGVhbiB7XG4gICAgcmV0dXJuIC9eaW1hZ2UvLnRlc3QoZmlsZS5taW1lVHlwZSk7XG4gIH1cblxuICBpc1ZpZGVvKGZpbGU6RHJpdmVGaWxlUmVzb3VyY2UpOmJvb2xlYW4ge1xuICAgIHJldHVybiAvXnZpZGVvLy50ZXN0KGZpbGUubWltZVR5cGUpO1xuICB9XG5cbiAgaXNVbmtvd24oZmlsZTpEcml2ZUZpbGVSZXNvdXJjZSk6Ym9vbGVhbiB7XG4gICAgcmV0dXJuICEoL15pbWFnZS8udGVzdChmaWxlLm1pbWVUeXBlKSB8fCAvXmF1ZGlvLy50ZXN0KGZpbGUubWltZVR5cGUpIHx8IC9edmlkZW8vLnRlc3QoZmlsZS5taW1lVHlwZSkpO1xuICB9XG5cbiAgZ2VuZXJlYXRlUHVibGljTGluayhmaWxlOkRyaXZlRmlsZVJlc291cmNlKTp2b2lkIHtcbiAgICBEcml2ZVBlcm1pc3Npb25zLmNyZWF0ZShmaWxlLmlkLCAnYW55b25lJywgJ3JlYWRlcicpLnRoZW4oKCkgPT4ge1xuICAgICAgdGhpcy5vcGVuKGZpbGUpO1xuICAgIH0pO1xuICB9XG5cbiAgb3BlbihmaWxlOkRyaXZlRmlsZVJlc291cmNlKTp2b2lkIHtcbiAgICBpZiAoZmlsZS5pc0ZvbGRlcigpKSB7XG4gICAgICB0aGlzLnBhcmVudC5wdXNoKGZpbGUuaWQpO1xuICAgICAgdGhpcy5sb2FkRmlsZXMoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5vcGVuRmlsZShmaWxlKTtcbiAgICB9XG4gIH1cblxuICBvcGVuTmV3V2luZG93KGZpbGU6IERyaXZlRmlsZVJlc291cmNlKTogdm9pZCB7XG4gICAgdmFyIF9uZXdXaW5kb3cgPSB3aW5kb3cub3BlbihcbiAgICAgIGZpbGUud2ViVmlld0xpbmssXG4gICAgICBmaWxlLm5hbWUsXG4gICAgICAncmVzaXphYmxlLHNjcm9sbGJhcnMsc3RhdHVzJ1xuICAgICk7XG4gIH1cblxuICByZXZva2UoKTp2b2lkIHtcbiAgICB0aGlzLmF1dGguc2lnbk91dCgpXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIHRoaXMuY2hlY2tBdXRoKCk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKCgpID0+IHtcbiAgICAgICAgdGhpcy5jaGVja0F1dGgoKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBjaGVja0F1dGgoKTp2b2lkIHtcbiAgICB2YXIgJHNjb3BlID0gdGhpcy4kc2NvcGUsXG4gICAgICBzZWxmID0gdGhpcztcblxuICAgIHRoaXMuYXV0aC5jaGVja0F1dGgoKVxuICAgICAgLnRoZW4oX2F1dGhvcml6ZWQpXG4gICAgICAuY2F0Y2goX3VuYXV0aG9yaXplZCk7XG5cbiAgICBmdW5jdGlvbiBfYXV0aG9yaXplZCgpIHtcbiAgICAgICRzY29wZS4kZXZhbEFzeW5jKGZ1bmN0aW9uKCkge1xuICAgICAgICBzZWxmLmF1dGhvcml6ZWQgPSB0cnVlO1xuICAgICAgICBzZWxmLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgIH0pO1xuXG4gICAgICBTeXN0ZW0uaW1wb3J0KCdjeC9nb29nbGUvZHJpdmUvZHJpdmUnKVxuICAgICAgICAudGhlbigoKSA9PiBzZWxmLmxvYWRGaWxlcygpKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBfdW5hdXRob3JpemVkKCkge1xuICAgICAgJHNjb3BlLiRldmFsQXN5bmMoZnVuY3Rpb24oKSB7XG4gICAgICAgIHNlbGYuYXV0aG9yaXplZCA9IGZhbHNlO1xuICAgICAgICBzZWxmLmxvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgc2VsZi5pdGVtcyA9IFtdO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBsb2FkRmlsZXMoKTp2b2lkIHtcbiAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAkc2NvcGUgPSB0aGlzLiRzY29wZSxcbiAgICAgIHF1ZXJ5ID0gbmV3IERyaXZlUXVlcnkoKTtcblxuICAgIHRoaXMuYWxsb3dCYWNrID0gdGhpcy5wYXJlbnQubGVuZ3RoID4gMTtcbiAgICB0aGlzLml0ZW1zID0gW107XG5cbiAgICBxdWVyeS5maWVsZHMoW1xuICAgICAgICAnZmlsZXMvaWQnLFxuICAgICAgICAnZmlsZXMvbmFtZScsXG4gICAgICAgICdmaWxlcy9pY29uTGluaycsXG4gICAgICAgICdmaWxlcy90aHVtYm5haWxMaW5rJyxcbiAgICAgICAgJ2ZpbGVzL21pbWVUeXBlJ1xuICAgICAgXSlcbiAgICAgIC5lcXVhbCgncGFyZW50cycsIHRoaXMucGFyZW50W3RoaXMucGFyZW50Lmxlbmd0aCAtIDFdKVxuICAgICAgLmVxdWFsKCdvd25lcnMnLCAnbWUnKVxuICAgICAgLmVxdWFsKCdtaW1lVHlwZScsIFsnYXBwbGljYXRpb24vdm5kLmdvb2dsZS1hcHBzLmZvbGRlcicsICdhdWRpby9tcGVnJywgJ2ltYWdlL2pwZWcnLCAnaW1hZ2UvcG5nJywgJ2ltYWdlL2dpZicsICdpbWFnZS9ibXAnLCAnYXBwbGljYXRpb24vcGRmJywgJ3ZpZGVvL21wNCddKVxuICAgICAgLm9yZGVyQnkoJ2ZvbGRlcicpXG4gICAgICAub3JkZXJCeSgnbmFtZScpO1xuXG4gICAgRmlsZXMubGlzdChxdWVyeSkudGhlbihfc2hvd0ZpbGVzKTtcblxuICAgIGZ1bmN0aW9uIF9zaG93RmlsZXMocmVzcCkge1xuICAgICAgJHNjb3BlLiRldmFsQXN5bmMoZnVuY3Rpb24oKSB7XG4gICAgICAgIHNlbGYuaXRlbXMgPSByZXNwLnJlc291cmNlcztcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgb3BlbkZpbGUoZmlsZTpEcml2ZUZpbGVSZXNvdXJjZSk6dm9pZCB7XG4gICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgJHNjb3BlID0gdGhpcy4kc2NvcGUsXG4gICAgICBxdWVyeSA9IG5ldyBEcml2ZVF1ZXJ5KCk7XG5cbiAgICBxdWVyeS5maWVsZHMoWyduYW1lJywgJ3RodW1ibmFpbExpbmsnLCAncGVybWlzc2lvbnMnLCAnaWQnLCAnd2ViQ29udGVudExpbmsnLCAnd2ViVmlld0xpbmsnLCAnbWltZVR5cGUnXSk7XG4gICAgcXVlcnkuZmlsZUlkKGZpbGUuaWQpO1xuXG4gICAgRmlsZXMuZ2V0KHF1ZXJ5KS50aGVuKF9zaG93RmlsZSk7XG5cbiAgICBmdW5jdGlvbiBfc2hvd0ZpbGUocmVzcCkge1xuICAgICAgJHNjb3BlLiRldmFsQXN5bmMoZnVuY3Rpb24oKSB7XG4gICAgICAgIHNlbGYuc2VsZWN0ZWRGaWxlID0gcmVzcC5yZXNvdXJjZTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBhbmd1bGFyLm1vZHVsZSgnY3guZ29vZ2xlLmRyaXZlLmV4YW1wbGUnLCBbXG4gICduZ01hdGVyaWFsJyxcbl0pXG4gIC5jb25maWcoRXhhbXBsZUNvbmZpZylcbiAgLmNvbnRyb2xsZXIoJ2N4R29vZ2xlRHJpdmVFeGFtcGxlQ3RybCcsIEN4R29vZ2xlRHJpdmVFeGFtcGxlQ3RybClcbiAgLmRpcmVjdGl2ZSgnY3hHb29nbGVEcml2ZUV4YW1wbGUnLCBbXG4gICAgZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAncmVzdHJpY3QnOiAnQScsXG4gICAgICAgICdjb250cm9sbGVyJzogJ2N4R29vZ2xlRHJpdmVFeGFtcGxlQ3RybCBhcyBjdHJsJ1xuICAgICAgfTtcbiAgICB9XG4gIF0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
