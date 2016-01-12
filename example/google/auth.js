/// <reference path="../../typings/tsd.d.ts" />
System.register(['google/google'], function(exports_1) {
    var google_1;
    var SCOPES, Auth;
    return {
        setters:[
            function (google_1_1) {
                google_1 = google_1_1;
            }],
        execute: function() {
            SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly'];
            Auth = (function () {
                function Auth(clientId, scopes) {
                    this.clientId = clientId;
                    this.scopes = scopes || SCOPES;
                }
                Auth.prototype.authorize = function () {
                    var _this = this;
                    return new Promise(function (resolve, reject) { return _this._authorize(resolve, reject, false); });
                };
                Auth.prototype.checkAuth = function () {
                    var _this = this;
                    return new Promise(function (resolve, reject) { return _this._authorize(resolve, reject, true); });
                };
                Auth.prototype._authorize = function (resolve, reject, immediate) {
                    var self = this;
                    google_1.API.bootstrap().then(_gapi_authorize);
                    function _gapi_authorize() {
                        gapi.auth.authorize({
                            'client_id': self.clientId,
                            'scope': self.scopes,
                            'immediate': immediate
                        }, self._handleAuthResult(resolve, reject));
                    }
                };
                Auth.prototype._handleAuthResult = function (resolve, reject) {
                    return function (authResult) {
                        if (authResult && !authResult.error) {
                            resolve(authResult);
                        }
                        else {
                            reject(authResult.error);
                        }
                    };
                };
                return Auth;
            })();
            exports_1("Auth", Auth);
        }
    }
});
