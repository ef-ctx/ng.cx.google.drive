/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="drive.ts" />

import {Drive} from 'google/drive';
import {gapi} from 'test.mocks';

export function main() {
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
			var _query = {
				'name': 'Monkey brains'
			};

			Drive.list(10, _query).then(function() {
				expect(gapi.client.drive.files.list).toHaveBeenCalledWith({
					'pageSize': 10,
					'q': 'name="Monkey brains"'
				});
				done();
			});
    });

		it('should load files from google drive with a query with collection', function(done) {
			var _query = {
				'name': 'Monkey brains'
			};

			Drive.list(10, _query).then(function() {
				expect(gapi.client.drive.files.list).toHaveBeenCalledWith({
					'pageSize': 10,
					'q': 'name="Monkey brains"'
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