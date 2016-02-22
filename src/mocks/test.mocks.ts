/// <reference path='../../typings/tsd.d.ts' />

export declare var gapi: any;

export var MOCK_FILE = {
	"kind": "drive#file",
	"id": "1uhs-a41dp2z0NLs-QiXYY-rqLGhgjmTf4iwBad2myzY",
	"name": "ES6 +A: Angular v2.0 extensions to ES6 Traceur",
	"mimeType": "application/vnd.google-apps.document"
};

function GoogleAuthUser() {
	this.hasGrantedScopes = () => true;
}

function GoogleAuthMock() {
	this.signIn = () => Promise.resolve(true);
	this.signOut = () => Promise.resolve(true);

	this.isSignedIn = {
		'get': () => true
	}

	this.currentUser = {
		'get': () => new GoogleAuthUser()
	}

	this.then = (cb) => cb() && this;
}

gapi = {
	'auth2': {
		'init': function () {
			return new GoogleAuthMock();
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
