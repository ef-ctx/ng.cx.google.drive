/// <reference path="../../typings/tsd.d.ts" />

// https://developers.google.com/drive/v2/reference/files/list
export interface IDriveFilesListQuery {
	name?: string;
	fullText?: string;
	mimeType?: string;
	modifiedTime?: Date;
	viewedByMeTime?: Date;
	trashed?: boolean;
	starred?: boolean;
	parents?: string;
	owners?: string;
	writers?: string;
	readers?: string;
	sharedWithMe?: boolean;
	properties?: string;
	appProperties?: string;
}

// https://developers.google.com/drive/v2/reference/files/list
export interface IDriveFilesListPayload {
	corpus?: string;
	pageSize?: number;
	orderBy?: string;
	pageToken?: string;
	projection?: string;
	q?: IDriveFilesListQuery;
	spaces?: string;
}

class DriveFilesListQuery implements IDriveFilesListQuery {
	name: string;
	fullText: string;
	mimeType: string;
	modifiedTime: Date;
	viewedByMeTime: Date;
	trashed: boolean;
	starred: boolean;
	parents: string;
	owners: string;
	writers: string;
	readers: string;
	sharedWithMe: boolean;
	properties: string;
	appProperties: string;

	constructor(query: IDriveFilesListQuery) {
		for (let key in query) {
      this[key] = query[key];
		}
	}

	toString() {
		var _query:string[] = [];

		for (let key in this) {
			if (this.hasOwnProperty(key) && (this[key] || this[key] === false)) {
				_query.push(key + '="' + this[key] + '"');
			}
		}

		return _query.join(',');
	}
}

export class Drive {
	static DEFAULT_PAGESIZE: number = 100;

	private static _nextPageToken: string;

	static list(pageSize?: number, query?: IDriveFilesListQuery) {
		var _request;

		this._nextPageToken = null;

		_request = gapi.client.drive.files.list(this._createPayload(pageSize, new DriveFilesListQuery(query)));

		return new Promise((resolve, reject) => this._execute(_request, resolve, reject));
	}

	static next(pageSize?: number) {
		var _request = gapi.client.drive.files.list(this._createPayload(pageSize));;

		return new Promise((resolve, reject) => this._execute(_request, resolve, reject));
	}

	private static _execute(request, resolve, reject) {
		request.execute((response) => this._handleResponse(response, resolve, reject));
	}

	private static _handleResponse(response, resolve, reject) {
		this._nextPageToken = response.nextPageToken;

		resolve(response.items || []);
	}

	private static _createPayload(pageSize?: number, query?: DriveFilesListQuery): IDriveFilesListPayload {
		var _payload: IDriveFilesListPayload = {
				'pageSize': pageSize || Drive.DEFAULT_PAGESIZE
			},
			_query;

		if (this._nextPageToken) {
			_payload.pageToken = this._nextPageToken;
		}

		if (query) {
			_query = query.toString();
			if (_query) {
				_payload.q = _query;
			}
		}

		return _payload;
	}
}