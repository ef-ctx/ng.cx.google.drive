/// <reference path="../../typings/tsd.d.ts" />

import {API} from 'google';
import {gapi} from 'test.mocks';

class APIMock extends API {
	static _add_script_tag(resolve, reject) {
		this._api_has_loaded(resolve, reject);
	}
}

export function main() {
	describe('API', function () {
		beforeEach(function() {
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
				APIMock.load('drive', 'v2').then(function() {
					expect(gapi.client.load).toHaveBeenCalled();
					done();
				});
			});
    });

    it('should reject load if api hasnt loaded', function(done) {
			var success = false;

			API._script_loaded = false;
			APIMock.load('drive', 'v2').catch(function(reason) {
				expect(reason).toBe('Google Apis has not been loaded');
				done();
			})
    });
	});
}