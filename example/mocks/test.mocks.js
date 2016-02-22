/// <reference path='../../typings/tsd.d.ts' />
System.register([], function(exports_1) {
    var MOCK_FILE;
    function GoogleAuthUser() {
        this.hasGrantedScopes = function () { return true; };
    }
    function GoogleAuthMock() {
        var _this = this;
        this.signIn = function () { return Promise.resolve(true); };
        this.signOut = function () { return Promise.resolve(true); };
        this.isSignedIn = {
            'get': function () { return true; }
        };
        this.currentUser = {
            'get': function () { return new GoogleAuthUser(); }
        };
        this.then = function (cb) { return cb() && _this; };
    }
    return {
        setters:[],
        execute: function() {
            exports_1("MOCK_FILE", MOCK_FILE = {
                "kind": "drive#file",
                "id": "1uhs-a41dp2z0NLs-QiXYY-rqLGhgjmTf4iwBad2myzY",
                "name": "ES6 +A: Angular v2.0 extensions to ES6 Traceur",
                "mimeType": "application/vnd.google-apps.document"
            });
            exports_1("gapi", gapi = {
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
                                };
                            },
                            'list': function () {
                                return {
                                    'execute': function (callback) {
                                        callback({
                                            'kind': 'drive#fileList',
                                            'nextPageToken': 'nextPageToken123456',
                                            'files': [
                                                MOCK_FILE
                                            ]
                                        });
                                    }
                                };
                            }
                        }
                    },
                    'load': function (name, version, callback) {
                        callback();
                    }
                }
            });
        }
    }
});
