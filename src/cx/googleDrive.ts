/// <reference path="../../typings/tsd.d.ts" />

import {API, Auth, Drive, DriveQuery} from 'google/google';

export declare var angular: any;

export class GoogleDrive {
    static bootstrap() {
			API.bootstrap('drive');

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
				])
				.factory('DriveQuery', [
					function() {
						return DriveQuery;
					}
				]);
    }
}