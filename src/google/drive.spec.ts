/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="drive.ts" />

import {Drive, DriveFilesListQuery} from 'google/drive';
import {gapi} from 'test.mocks';

export function main() {
	describe('DriveFilesListQuery', function() {
		it('should equal', function() {
			var _query = new DriveFilesListQuery();

			_query
				.equal('name', 'Monkey brains')
				.equal('mimeType', 'image/gif');

			expect(_query.toString()).toBe('name="Monkey brains",mimeType="image/gif"')
    });

    it('should not equal', function() {
			var _query = new DriveFilesListQuery();

			_query
				.not.equal('name', 'Monkey brains')
				.not.equal('mimeType', 'image/gif');

			expect(_query.toString()).toBe('name!="Monkey brains",mimeType!="image/gif"')
    });

    it('should equal collection', function() {
			var _query = new DriveFilesListQuery();

			_query
				.equal('parents', 'xPKyprusppKelcnMvLmMx89Y4N3CLtbU');

			expect(_query.toString()).toBe('"xPKyprusppKelcnMvLmMx89Y4N3CLtbU" in parents')

			expect(function() {
				_query.not.equal('parents', 'xPKyprusppKelcnMvLmMx89Y4N3CLtbU');
			}).toThrow(new Error('DriveFilesListQuery: QueryCollectionField only supports operator "in"'));
    });

    it('should mix', function() {
			var _query = new DriveFilesListQuery();

			_query
				.not.equal('name', 'Monkey brains')
				.equal('mimeType', 'image/gif')
				.equal('parents', 'xPKyprusppKelcnMvLmMx89Y4N3CLtbU');

			expect(_query.toString()).toBe('name!="Monkey brains",mimeType="image/gif","xPKyprusppKelcnMvLmMx89Y4N3CLtbU" in parents')
    });
  });

	describe('Drive', function() {
		beforeEach(function() {
			spyOn(gapi.client.drive.files, 'list').and.callThrough();
    });

    it('should load files from google drive', function (done) {
			Drive.list().then(function() {
				expect(gapi.client.drive.files.list).toHaveBeenCalledWith({
					'pageSize': 100
				});
				done();
			});
    });

    it('should load files from google drive with a query', function(done) {
			var _query = new DriveFilesListQuery();

			_query
				.equal('name', 'Monkey brains')
				.not.equal('mimeType', 'image/gif');

			Drive.list(10, _query).then(function() {
				expect(gapi.client.drive.files.list).toHaveBeenCalledWith({
					'pageSize': 10,
					'q': 'name="Monkey brains",mimeType!="image/gif"'
				});
				done();
			});
    });

		it('should load files from google drive with a query with collection', function(done) {
			var _query = new DriveFilesListQuery();
			var _query2 = new DriveFilesListQuery();

			_query
				.equal('name', 'Monkey brains')
				.equal('parents', 'xPKyprusppKelcnMvLmMx89Y4N3CLtbU')

			Drive.list(10, _query).then(function() {
				expect(gapi.client.drive.files.list).toHaveBeenCalledWith({
					'pageSize': 10,
					'q': 'name="Monkey brains","xPKyprusppKelcnMvLmMx89Y4N3CLtbU" in parents'
				});
				done();
			});
    });

    it('should load next set of files from google drive', function(done) {
			Drive.list().then(function() {
				Drive.next().then(function() {
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