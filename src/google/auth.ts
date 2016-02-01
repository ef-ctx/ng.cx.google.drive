/// <reference path="../../typings/tsd.d.ts" />

import {API} from 'google/google';
/**
	For some damned reason we need to get the 'profile' scope as well.
	If we don't we get "random" error after `signIn`.
	Errors include:
		- `{"error":"IMMEDIATE_FAILED","detail":"Not all scopes are approved."}` when using promt=none on signIn
		- `{type: "tokenFailed", idpId: "google", error: "IMMEDIATE_FAILED"}` when using `signIn` with no arguments

	Adding `profile` as part of the scope seems to solve all these issues.

	Note:
	Using auth2 or auth since gapi.auth.signOut is broken. And undocumented (https://developers.google.com/api-client-library/javascript/reference/referencedocs#gapiclientrequest)
	It's too bad, since `gapi.auth.authorize` seems to work better then `auth2` and `signIn`.
	Also it would be amazing to know where this API is headed. Is auth or auth2 the way to go.
**/
var SCOPES = ['profile', 'https://www.googleapis.com/auth/drive'];

export class Auth {
  scopes: Array<string>;
  clientId: string;

  private _googleAuth: any;
  private _hook: Promise<any>;

  constructor(clientId: string, scopes?:Array<string>) {
    var _resolve;

    this.clientId = clientId;
    this.scopes = scopes || SCOPES;

    this._hook = new Promise((resolve) => _resolve = resolve);

    this._wait(() => {
      this._googleAuth = gapi.auth2.init({
        'client_id': this.clientId,
        'scope': this.scopes.join(' '),
        'fetch_basic_profile': false
      });

      this._googleAuth.then(() => {
        _resolve();
      });
    });
  }

  authorize() {
    return new Promise((resolve, reject) => {
      this._hook.then(() => {
        this._googleAuth.signIn().then(resolve, reject);
      });
    });
  }

  checkAuth() {
    return new Promise((resolve, reject) => {
    	this._hook.then(() => {
        var user = this._googleAuth.currentUser.get();
        if (this._googleAuth.isSignedIn.get() && (user && user.hasGrantedScopes(this.scopes.join(' ')))) {
          resolve();
        } else {
          reject();
        }
    	});
    });
  }

  signOut() {
    return new Promise((resolve, reject) => {
      this._hook.then(() => {
        this._googleAuth.signOut().then(resolve, reject);
      });
    });
  }

  private _wait(fn:any) {
    API.bootstrap().then(fn);
  }
}