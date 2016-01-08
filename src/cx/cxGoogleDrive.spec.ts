/// <reference path="../../typings/tsd.d.ts" />

import {CxGoogleDrive} from 'cx/cxGoogleDrive';

export function main() {
	describe('aaa', function () {
		it('should do stuff', function () {
			var drive = new CxGoogleDrive('42');
			expect(drive.clientId).toBe('42');
		});

		it('should do stuff22', function() {
			expect(1).toBe(1);
		});
	});
}