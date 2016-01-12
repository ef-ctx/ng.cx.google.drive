/// <reference path="../../typings/tsd.d.ts" />
System.register([], function(exports_1) {
    var Drive;
    return {
        setters:[],
        execute: function() {
            Drive = (function () {
                function Drive() {
                }
                Drive.list = function (pageSize) {
                    var _this = this;
                    var _request = gapi.client.drive.files.list({
                        'maxResults': pageSize || Drive.DEFAULT_PAGESIZE
                    });
                    return new Promise(function (resolve, reject) { return _this._execute(_request, resolve, reject); });
                };
                Drive.next = function (pageSize) {
                    var _this = this;
                    var _request = gapi.client.drive.files.list({
                        'maxResults': pageSize || Drive.DEFAULT_PAGESIZE,
                        'pageToken': this._nextPageToken
                    });
                    return new Promise(function (resolve, reject) { return _this._execute(_request, resolve, reject); });
                };
                Drive._execute = function (request, resolve, reject) {
                    var _this = this;
                    request.execute(function (response) { return _this._handleResponse(response, resolve, reject); });
                };
                Drive._handleResponse = function (response, resolve, reject) {
                    this._nextPageToken = response.nextPageToken;
                    resolve(response.items || []);
                };
                Drive.DEFAULT_PAGESIZE = 10;
                return Drive;
            })();
            exports_1("Drive", Drive);
        }
    }
});
