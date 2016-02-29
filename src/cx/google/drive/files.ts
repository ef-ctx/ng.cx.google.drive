/// <reference path="../../../../typings/tsd.d.ts" />

import {DriveQuery} from 'cx/google/drive/query';
import {DriveFileResource} from 'cx/google/drive/file';
import {DrivePermissions} from 'cx/google/drive/permissions';

const DRIVE_ERROR = {
	'UNKONW_ACTION': new Error('Can\'t handle result for unkown action')
}

enum DRIVE_API_ACTIONS {
		GET,
		LIST
}

export interface DriveApiResponse {
  query: DriveQuery;
  resource?: DriveFileResource;
  resources?: DriveFileResource[];
}

export class Files {
  static permissions: DrivePermissions = DrivePermissions;

	private static _nextPageToken: string;

  static get(query?: DriveQuery): Promise<DriveApiResponse> {
		var _query = (query || this._defaultQuery()),
			_request = gapi.client.drive.files.get(_query.toQuery());

		return new Promise((resolve, reject) => this._execute(DRIVE_API_ACTIONS.GET, _request, _query, resolve, reject));
	}

  static list(query?: DriveQuery): Promise<DriveApiResponse> {
		var _request,
			_query = (query || this._defaultQuery());

		_request = gapi.client.drive.files.list(_query.toQuery());

		return new Promise((resolve, reject) => this._execute(DRIVE_API_ACTIONS.LIST, _request, _query, resolve, reject));
	}

	private static _createFileResources(files:any[]): DriveFileResource[] {
		var _fileResource:DriveFileResource[] = [];

		files.forEach(function(file) {
			_fileResource.push(new DriveFileResource(file))
		});

		return _fileResource;
	}

	private static _defaultQuery(): DriveQuery {
		return new DriveQuery().limit(100);
	}

	private static _execute(action, request, query, resolve, reject) {
		request.execute((response) => this._handleResponse(action, query, response, resolve, reject));
	}

	private static _handleResponse(action:DRIVE_API_ACTIONS, query, response, resolve, reject) {
    var resp: DriveApiResponse = {
    	'query': query
    };

		switch (action) {
			case DRIVE_API_ACTIONS.GET:
        resp.resource = new DriveFileResource(response);
				resolve(resp);
				break;
			case DRIVE_API_ACTIONS.LIST:
				query._pageToken(response.nextPageToken);
        resp.resources = this._createFileResources(response.files || []);
				resolve(resp);
				break;
			default:
				// TODO: Format error message
				throw DRIVE_ERROR.UNKONW_ACTION;
		}
	}
}