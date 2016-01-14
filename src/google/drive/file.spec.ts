/// <reference path="../../../typings/tsd.d.ts" />

import {DriveFileResource} from './file';
import {gapi, MOCK_FILE} from 'test.mocks';

export function main() {
	describe('DriveFileResource', function() {
		it('should create file resource', function() {
			var _file = new DriveFileResource(MOCK_FILE);

			expect(_file.id).toBe(MOCK_FILE.id)
    });

  });
}