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

						return {
							'api': API,
							'Auth': Auth,
							'drive': Drive,
							'DriveQuery': DriveQuery
						};
					}
				]);
    }
}