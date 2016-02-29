/// <reference path="../../../../typings/tsd.d.ts" />

import {Files} from 'cx/google/drive/files';
import {DriveQuery} from 'cx/google/drive/query';
import {gapi} from 'mocks/test.mocks';

export function main() {
  describe('Files', function() {
		beforeEach(function() {
			spyOn(gapi.client.drive.files, 'list').and.callThrough();
      spyOn(gapi.client.drive.files, 'get').and.callThrough();
    });

    it('should fetch information about a single file', function (done) {
      var _file_id = '1uhs-a41dp2z0NLs-QiXYY-rqLGhgjmTf4iwBad2myzY';
      var _query = new DriveQuery();

      _query.fileId(_file_id);

      Files.get(_query).then(function(resp) {
        expect(resp.resource.id).toBe(_file_id);
        expect(gapi.client.drive.files.get).toHaveBeenCalledWith({ 'fileId': _file_id });
				done();
			});
    });

    it('should load files from google drive', function (done) {
      var _file_id = '1uhs-a41dp2z0NLs-QiXYY-rqLGhgjmTf4iwBad2myzY';

			Files.list().then(function(resp) {
        expect(resp.resources[0].id).toBe(_file_id);
				expect(gapi.client.drive.files.list).toHaveBeenCalledWith({
					'pageSize': 100
				});
				done();
			});
    });

    it('should load files from google drive with a query', function(done) {
			var _query = new DriveQuery();

			_query
				.equal('name', 'Monkey brains')
				.not.equal('mimeType', 'image/gif');

			Files.list(_query).then(function() {
				expect(gapi.client.drive.files.list).toHaveBeenCalledWith({
					'q': 'name="Monkey brains" and mimeType!="image/gif"'
				});
				done();
			});
    });

		it('should load files from google drive with a query with collection', function(done) {
			var _query = new DriveQuery();
			var _query2 = new DriveQuery();

			_query
				.equal('name', 'Monkey brains')
				.equal('parents', 'xPKyprusppKelcnMvLmMx89Y4N3CLtbU')

			Files.list(_query).then(function() {
				expect(gapi.client.drive.files.list).toHaveBeenCalledWith({
					'q': 'name="Monkey brains" and "xPKyprusppKelcnMvLmMx89Y4N3CLtbU" in parents'
				});
				done();
			});
    });

    it('should load next set of files from google drive', function(done) {
      Files.list().then(function(resp) {
        Files.list(resp.query).then(function() {
					expect(gapi.client.drive.files.list).toHaveBeenCalledWith({
            'pageSize': 100,
						'pageToken': 'nextPageToken123456'
					});
					done();
				});
			});
    });
	});
}