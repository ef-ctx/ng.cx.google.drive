/// <reference path="../../typings/tsd.d.ts" />

import {AuthClient} from 'google/auth';

export function main() {
  window.gapi = {
    'auth': {
      'authorize': function (opt, callback) {
          callback({
            'access_token': 'a',
            'expires_in': '1',
            'state': '1'
          });
      }
    }
  };

  describe('AuthClient', function() {
    var clientId = '42';

    beforeEach(function() {
        spyOn(window.gapi.auth, 'authorize').and.callThrough();
    });

		it('should assign clientId and scopes', function() {
      var scopes = ['scope1'];
      var client = new AuthClient('42', scopes);

			expect(client.clientId).toBe('42');
      expect(client.scopes).toBe(scopes);
		});

    it('should assign default scopes', function() {
        var client = new AuthClient('42');

        expect(client.clientId).toBe('42');
        expect(client.scopes).toEqual(['https://www.googleapis.com/auth/drive.metadata.readonly']);
    });

    it('should call gapi.auth.authorize and resolve promise', function(done) {
        var client = new AuthClient('42'),
          success = false;

        client.authorize().then(function () {
          success = true;

          expect(window.gapi.auth.authorize).toHaveBeenCalled();
          expect(success).toBe(true);

          done();
        }, function () {
          expect(success).toBe(true);
          done();
        });
    });

    it('should call gapi.auth.checkAuth and resolve promise', function(done) {
        var client = new AuthClient('42'),
            success = false;

        client.checkAuth().then(function() {
            success = true;

            expect(window.gapi.auth.authorize).toHaveBeenCalled();
            expect(success).toBe(true);

            done();
        }, function() {
            expect(success).toBe(true);
            done();
        });
    });
	});
}