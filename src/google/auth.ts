/// <reference path="../../typings/tsd.d.ts" />

import {API} from 'google/google';

var SCOPES = ['https://www.googleapis.com/auth/drive'];

export class Auth {
  scopes: Array<string>;
  clientId: string;

  constructor(clientId: string, scopes?:Array<string>) {
    this.clientId = clientId;
    this.scopes = scopes || SCOPES;
  }

  authorize() {
		return new Promise((resolve, reject) => this._authorize(resolve, reject, false));
  }

  checkAuth() {
		return new Promise((resolve, reject) => this._authorize(resolve, reject, true));
  }

  private _authorize(resolve, reject, immediate) {
		var self = this;

		API.bootstrap().then(_gapi_authorize);

		function _gapi_authorize() {
			gapi.auth.authorize({
					'client_id': self.clientId,
					'scope': self.scopes,
					'immediate': immediate
				},
				self._handleAuthResult(resolve, reject));
		}
	}

  private _handleAuthResult(resolve, reject) {
		return function(authResult) {
			if (authResult && !authResult.error) {
				resolve(authResult);
			} else {
				reject(authResult.error);
			}
		}
  }
}