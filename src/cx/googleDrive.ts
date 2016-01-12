/// <reference path="../../typings/tsd.d.ts" />

import {API, Auth, Drive} from 'google/google';

export declare var angular: any;

export class GoogleDrive {
    static bootstrap() {
			API.bootstrap();

      angular.module('ng.cx.google.drive', [
    	])
      .service('api', [
        function() {
          return API;
        }
      ])
      .factory('Auth', [
        function() {
          return Auth;
        }
      ])
      .service('drive', [
        function() {
          return Drive;
        }
      ]);
    }
}