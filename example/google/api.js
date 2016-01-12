/// <reference path="../../typings/tsd.d.ts" />
System.register([], function(exports_1) {
    var API;
    return {
        setters:[],
        execute: function() {
            API = (function () {
                function API() {
                }
                API.bootstrap = function () {
                    var _this = this;
                    if (!this._api_load_promise) {
                        this._api_load_promise = new Promise(function (resolve, reject) { return _this._add_script_tag(resolve, reject); });
                    }
                    return this._api_load_promise;
                };
                API.load = function (name, version) {
                    if (API._script_loaded) {
                        return new Promise(function (resolve, reject) { return gapi.client.load(name, version, resolve); });
                    }
                    return Promise.reject('Google Apis has not been loaded');
                };
                API._add_script_tag = function (resolve, reject) {
                    var _this = this;
                    if (API._script_loaded) {
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
                API._api_has_loaded = function (resolve, reject) {
                    API._script_loaded = true;
                    resolve();
                };
                API._script_loaded = false;
                return API;
            })();
            exports_1("API", API);
        }
    }
});
