/// <reference path="../../../../typings/tsd.d.ts" />

import {DriveQuery} from 'cx/google/drive/query';
import {Files} from 'cx/google/drive/files';

export function main() {
  describe('Drive', function() {
    it('should export Drive and DriveQuery via core', function() {
      expect(typeof Files).toBe('function');
      expect(typeof DriveQuery).toBe('function');
    });
  });
}