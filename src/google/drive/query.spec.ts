/// <reference path="../../../typings/tsd.d.ts" />

import {DriveQuery} from 'google/google';
import {gapi} from 'test.mocks';

export function main() {
	describe('DriveQuery', function() {
    it('should add fields', function() {
      var _query = new DriveQuery();

      _query
        .fields('thumbnailLink')
        .fields(['webContentLink', 'webViewLink']);

      expect(_query.toQuery()).toEqual({
        'fields': 'thumbnailLink,webContentLink,webViewLink'
      });
    });

    it('should add corpus', function() {
      var _query = new DriveQuery();

      _query
        .corpus('user');

      expect(_query.toQuery()).toEqual({
        'corpus': 'user'
      });

      expect(function() {
        _query.corpus('thumbnailLink');
      }).toThrow(new Error('"thumbnailLink" is not a valid corpus field. Valid fields are domain,user'));
    });

    it('should order by', function() {
      var _query = new DriveQuery();

      _query
        .orderBy('createdTime')
        .orderBy('folder', 'desc')
        .orderBy('modifiedByMeTime');

      expect(_query.toQuery()).toEqual({
        'orderBy': 'createdTime,folder desc,modifiedByMeTime'
      });

      expect(function() {
        _query.orderBy('thumbnailLink');
      }).toThrow(new Error('"thumbnailLink" is not a valid orderBy field. Valid fields are createdTime,folder,modifiedByMeTime,modifiedTime,name,quotaBytesUsed,recency,sharedWithMeTime,starred,viewedByMeTime'));
    });

    it('should order by', function() {
      var _query = new DriveQuery();

      _query
        .orderBy('createdTime')
        .orderBy('folder', 'desc')
        .orderBy('modifiedByMeTime');

      expect(_query.toQuery()).toEqual({
        'orderBy': 'createdTime,folder desc,modifiedByMeTime'
      });

      expect(function() {
        _query.orderBy('thumbnailLink');
      }).toThrow(new Error('"thumbnailLink" is not a valid orderBy field. Valid fields are createdTime,folder,modifiedByMeTime,modifiedTime,name,quotaBytesUsed,recency,sharedWithMeTime,starred,viewedByMeTime'));
    });

    it('should spaces', function() {
      var _query = new DriveQuery();

      _query
        .spaces('drive')
        .spaces('photos');

      expect(_query.toQuery()).toEqual({
        'spaces': 'drive,photos'
      });

      expect(function() {
        _query.spaces('thumbnailLink');
      }).toThrow(new Error('"thumbnailLink" is not a valid spaces field. Valid fields are drive,appDataFolder,photos'));
    });

		it('should equal', function() {
			var _query = new DriveQuery();

			_query
				.equal('name', 'Monkey brains')
				.equal('mimeType', 'image/gif');

      expect(_query.toQuery()).toEqual({
        'q': 'name="Monkey brains",mimeType="image/gif"'
      });
    });

    it('should not equal', function() {
			var _query = new DriveQuery();

			_query
				.not.equal('name', 'Monkey brains')
				.not.equal('mimeType', 'image/gif');

      expect(_query.toQuery()).toEqual({
        'q': 'name!="Monkey brains",mimeType!="image/gif"'
      });
    });

    it('should equal collection', function() {
			var _query = new DriveQuery();

			_query
				.equal('parents', 'xPKyprusppKelcnMvLmMx89Y4N3CLtbU');

      expect(_query.toQuery()).toEqual({
        'q': '"xPKyprusppKelcnMvLmMx89Y4N3CLtbU" in parents'
      });

			expect(function() {
				_query.not.equal('parents', 'xPKyprusppKelcnMvLmMx89Y4N3CLtbU');
			}).toThrow(new Error('DriveQuery: QueryCollectionField only supports operator "in"'));
    });

    it('should mix', function() {
			var _query = new DriveQuery();

			_query
				.not.equal('name', 'Monkey brains')
				.equal('mimeType', 'image/gif')
				.equal('parents', 'xPKyprusppKelcnMvLmMx89Y4N3CLtbU');

      expect(_query.toQuery()).toEqual({
        'q': 'name!="Monkey brains",mimeType="image/gif","xPKyprusppKelcnMvLmMx89Y4N3CLtbU" in parents'
      });
    });
  });
}