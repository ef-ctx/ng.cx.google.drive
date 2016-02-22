/// <reference path="../../typings/tsd.d.ts" />

import {API} from 'google';
import {gapi} from 'mocks/test.mocks';

class APIMock extends API {
	static _add_script_tag(resolve, reject, preload_api) {
		this._api_has_loaded(resolve, reject, preload_api);
	}
}

export function main() {
	describe('API', function () {
		beforeEach(function() {
			APIMock._api_load_promise = null;
			spyOn(gapi.client, 'load').and.callThrough();
    });

    it('should add api script tag and resolve promise', function (done) {
			var success = false;

			APIMock.bootstrap().then(function() {
				success = true;
				expect(success).toBe(true);
				done();
			});
    });

    it('should load api with name and version', function(done) {
			var success = false;

			APIMock.bootstrap().then(function() {
				APIMock.load('drive', 'v3').then(function() {
					expect(gapi.client.load).toHaveBeenCalled();
					done();
				});
			});
    });

    it('should pre load api with name and version', function(done) {
			var success = false;

			APIMock.bootstrap('drive').then(function() {
				expect(gapi.client.load).toHaveBeenCalled();
				done();
			});
    });

    it('should reject load if api hasnt loaded', function(done) {
			var success = false;

			API._script_loaded = false;
			APIMock.load('drive', 'v3').catch(function(reason) {
				expect(reason).toBe('Google Apis has not been loaded');
				done();
			})
    });
	});
}