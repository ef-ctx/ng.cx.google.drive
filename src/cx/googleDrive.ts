/// <reference path="../../typings/tsd.d.ts" />

import {API, Auth, Drive, DriveQuery} from 'google/google';

export declare var angular: any;

export class GoogleDrive {
    static bootstrap() {
      API.bootstrap('drive');
      window['cxGoogleDrive'] = window['cxGoogleDrive'] || {};
      window['cxGoogleDrive'].api = API;
      window['cxGoogleDrive'].Auth = Auth;
      window['cxGoogleDrive'].drive = Drive;
      window['cxGoogleDrive'].DriveQuery = DriveQuery;
    }
}