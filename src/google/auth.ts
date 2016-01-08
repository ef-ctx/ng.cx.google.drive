/// <reference path="../../typings/tsd.d.ts" />

var SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly'];

export class AuthClient {
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

		gapi.auth.authorize({
				'client_id': self.clientId,
				'scope': self.scopes,
				'immediate': immediate
			},
			self._handleAuthResult(resolve, reject));
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