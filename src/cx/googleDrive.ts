/// <reference path="../../typings/tsd.d.ts" />

import {API, Auth, Drive, DriveQuery} from 'google/google';

export declare var angular: any;

export class GoogleDrive {
    static bootstrap() {
      API.bootstrap('drive');

      angular.module('ng.cx.google.drive', [
      ])
        .service('google', [
          function() {
            'use strict';

            this.api = API;
            this.Auth = Auth;
            this.drive = Drive;
            this.DriveQuery = DriveQuery;
          }
        ]);
    }
}