/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="google.ts" />
System.register([], function(exports_1) {
    var Client;
    return {
        setters:[],
        execute: function() {
            Client = (function () {
                function Client() {
                }
                Client.prototype.bootstrap = function () {
                    var _this = this;
                    return new Promise(function (resolve, reject) { return _this._add_script_tag(resolve, reject); });
                };
                Client.prototype.load = function (name, version) {
                    if (Client._script_loaded) {
                        return new Promise(function (resolve, reject) { return gapi.client.load(name, version, resolve); });
                    }
                    return Promise.reject('Google Apis has not been loaded');
                };
                Client.prototype._add_script_tag = function (resolve, reject) {
                    var _this = this;
                    if (Client._script_loaded) {
                        this._api_has_loaded(resolve, reject);
                    }
                    else {
                        var elem = document.createElement('script'), _readyCallbackName = '__gapi__callback';
                        elem.setAttribute('src', '//apis.google.com/js/client.js?onload=' + _readyCallbackName);
                        elem.setAttribute('defer', null);
                        elem.setAttribute('async', null);
                        window[_readyCallbackName] = function () { return _this._api_has_loaded(resolve, reject); };
                        window.document.body.appendChild(elem);
                    }
                };
                Client.prototype._api_has_loaded = function (resolve, reject) {
                    Client._script_loaded = true;
                    resolve();
                };
                Client._script_loaded = false;
                return Client;
            })();
            exports_1("Client", Client);
        }
    }
});
