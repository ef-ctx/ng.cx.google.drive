/// <reference path="../../typings/tsd.d.ts" />

import {Auth, API} from 'google';
import {gapi} from 'test.mocks';

export function main() {
  describe('Auth', function() {
    var clientId = '42';

    beforeEach(function() {
        spyOn(gapi.auth, 'authorize').and.callThrough();
        API._add_script_tag = function(resolve, reject) {
					this._api_has_loaded(resolve, reject);
				}
    });

		it('should assign clientId and scopes', function() {
      var scopes = ['scope1'];
      var client = new Auth('42', scopes);

			expect(client.clientId).toBe('42');
      expect(client.scopes).toBe(scopes);
		});

    it('should assign default scopes', function() {
        var client = new Auth('42');

        expect(client.clientId).toBe('42');
        expect(client.scopes).toEqual(['https://www.googleapis.com/auth/drive']);
    });

    it('should call gapi.auth.authorize and resolve promise', function(done) {
        var client = new Auth('42'),
          success = false;

        client.authorize().then(function () {
          success = true;

          expect(gapi.auth.authorize).toHaveBeenCalled();
          expect(success).toBe(true);

          done();
        }, function () {
          expect(success).toBe(true);
          done();
        });
    });

    it('should call gapi.auth.checkAuth and resolve promise', function(done) {
        var client = new Auth('42'),
            success = false;

        client.checkAuth().then(function() {
            success = true;

            expect(gapi.auth.authorize).toHaveBeenCalled();
            expect(success).toBe(true);

            done();
        }, function() {
            expect(success).toBe(true);
            done();
        });
    });
	});
}