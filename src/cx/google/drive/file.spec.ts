/// <reference path="../../../../typings/browser.d.ts" />

import {DriveFileResource} from 'cx/google/drive/file';
import {gapi, MOCK_FILE} from 'mocks/test.mocks';

export function main() {
	describe('DriveFileResource', function() {
		it('should create file resource', function() {
			var _file = new DriveFileResource(MOCK_FILE);

			expect(_file.id).toBe(MOCK_FILE.id)
    });

  });
}