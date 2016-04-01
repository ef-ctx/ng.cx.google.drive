/// <reference path="../typings/browser.d.ts" />

declare var angular: any;
declare var CLIENT_ID: any;
declare var System: any;

import {Auth} from 'cx/google/core';
import {DriveFileResource} from 'cx/google/drive/file';
import {Files} from 'cx/google/drive/files';
import {DrivePermissions} from 'cx/google/drive/permissions'
import {DriveQuery} from 'cx/google/drive/query';

class ExampleConfig {
  static $inject: string[] = ['$sceProvider'];
  constructor($sceProvider) {
    $sceProvider.enabled(false);
  }
}

class CxGoogleDriveExampleCtrl {
  private auth: Auth;
  private parent: string[];
  private $scope: any;

  allowBack: boolean;
  authorized: boolean;
  items: DriveFileResource[];
  loading: boolean;
  selectedFile: DriveFileResource;

  static $inject: string[] = ['$scope', '$sce'];
  constructor($scope, $sce) {
    this.auth = new Auth(CLIENT_ID);
    this.parent = ['root'];
    this.$scope = $scope;

    this.authorized = false;
    this.loading = true;
    this.items = [];
    this.allowBack = this.parent.length > 1;

    this.checkAuth();
  }

  authorize():void {
    this.auth.authorize().then(() => {
      this.authorized = true;
      System.import('cx/google/drive/drive')
        .then(() => this.loadFiles());
    }, function(reason) {
      console.error('reason', reason);
    });
  }

  back():void {
    this.parent.pop();
    this.loadFiles();
  }

  iframeUrl(file: DriveFileResource): string {
    return file.webContentLink.replace(/\&.+$/, '');
  }

  isAudio(file:DriveFileResource):boolean {
    return /^audio/.test(file.mimeType);
  }

  isImage(file:DriveFileResource):boolean {
    return /^image/.test(file.mimeType);
  }

  isVideo(file:DriveFileResource):boolean {
    return /^video/.test(file.mimeType);
  }

  isUnkown(file:DriveFileResource):boolean {
    return !(/^image/.test(file.mimeType) || /^audio/.test(file.mimeType) || /^video/.test(file.mimeType));
  }

  genereatePublicLink(file:DriveFileResource):void {
    DrivePermissions.create(file.id, 'anyone', 'reader').then(() => {
      this.open(file);
    });
  }

  open(file:DriveFileResource):void {
    if (file.isFolder()) {
      this.parent.push(file.id);
      this.loadFiles();
    } else {
      this.openFile(file);
    }
  }

  openNewWindow(file: DriveFileResource): void {
    var _newWindow = window.open(
      file.webViewLink,
      file.name,
      'resizable,scrollbars,status'
    );
  }

  revoke():void {
    this.auth.signOut()
      .then(() => {
        this.checkAuth();
      })
      .catch(() => {
        this.checkAuth();
      });
  }

  private checkAuth():void {
    var $scope = this.$scope,
      self = this;

    this.auth.checkAuth()
      .then(_authorized)
      .catch(_unauthorized);

    function _authorized() {
      $scope.$evalAsync(function() {
        self.authorized = true;
        self.loading = false;
      });

      System.import('cx/google/drive/drive')
        .then(() => self.loadFiles());
    }

    function _unauthorized() {
      $scope.$evalAsync(function() {
        self.authorized = false;
        self.loading = false;
        self.items = [];
      });
    }
  }

  private loadFiles():void {
    var self = this,
      $scope = this.$scope,
      query = new DriveQuery();

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

    Files.list(query).then(_showFiles);

    function _showFiles(resp) {
      $scope.$evalAsync(function() {
        self.items = resp.resources;
      });
    }
  }

  private openFile(file:DriveFileResource):void {
    var self = this,
      $scope = this.$scope,
      query = new DriveQuery();

    query.fields(['name', 'thumbnailLink', 'permissions', 'id', 'webContentLink', 'webViewLink', 'mimeType']);
    query.fileId(file.id);

    Files.get(query).then(_showFile);

    function _showFile(resp) {
      $scope.$evalAsync(function() {
        self.selectedFile = resp.resource;
      });
    }
  }
}

export default angular.module('cx.google.drive.example', [
  'ngMaterial',
])
  .config(ExampleConfig)
  .controller('cxGoogleDriveExampleCtrl', CxGoogleDriveExampleCtrl)
  .directive('cxGoogleDriveExample', [
    function() {
      return {
        'restrict': 'A',
        'controller': 'cxGoogleDriveExampleCtrl as ctrl'
      };
    }
  ]);
