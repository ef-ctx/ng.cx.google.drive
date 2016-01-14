/// <reference path='../typings/tsd.d.ts' />

export declare var gapi: any;

export var MOCK_FILE = {
	"kind": "drive#file",
	"id": "1uhs-a41dp2z0NLs-QiXYY-rqLGhgjmTf4iwBad2myzY",
	"name": "ES6 +A: Angular v2.0 extensions to ES6 Traceur",
	"mimeType": "application/vnd.google-apps.document"
};


gapi = {
	'auth': {
		'authorize': function(opt, callback) {
			callback({
				'access_token': 'a',
				'expires_in': '1',
				'state': '1'
			});
		}
	},
	'client': {
		'drive': {
			'files': {
				'get': function () {
					return {
						'execute': function (callback) {
							callback(MOCK_FILE);
						}
					}
				},
				'list': function () {
					return {
						'execute': function(callback) {
							callback({
								'kind': 'drive#fileList',
								'nextPageToken': 'nextPageToken123456',
								'files': [
									MOCK_FILE
								]
							});
						}
					}
				}
			}
		},
		'load': function(name, version, callback) {
			callback();
		}
	}
};
