/// <reference path="../../typings/tsd.d.ts" />

const OPERATORS = {
	'EQUAL': '=',
	'NOT_EQUAL': '!=',
	'IN': 'in'
}

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
	q?: string;
	spaces?: string;
}

function queryField(target: DriveFilesListQuery, propertyKey: string): any {
	target._queryFieldsRegistry = target._queryFieldsRegistry || {};
	target._queryFieldsRegistry[propertyKey] = [QueryField, propertyKey, OPERATORS.EQUAL];
}

function queryCollectionField(target: DriveFilesListQuery, propertyKey: string) {
	target._queryFieldsRegistry = target._queryFieldsRegistry || {};
	target._queryFieldsRegistry[propertyKey] = [QueryCollectionField, propertyKey, OPERATORS.IN];
}

class QueryField {
	key: string;
	operator: string;
	value: any;

	constructor(key: string, operator: string, value?: string) {
		this.key = key;
		this.operator = operator;
		this.value = value;
	}
}

class QueryCollectionField extends QueryField {}

export class DriveFilesListQuery implements IDriveFilesListQuery {
	@queryField
	get name(): string {
		return this._queryFields['name'].value;
	}

	set name(value: string) {
		this._queryFields['name'].value = value;
	}

	@queryField
	get mimeType(): string {
		return this._queryFields['mimeType'].value;
	}

	set mimeType(value: string) {
		this._queryFields['mimeType'].value = value;
	}

	@queryField
	get fullText(): string {
		return this._queryFields['fullText'].value;
	}

	set fullText(value: string) {
		this._queryFields['fullText'].value = value;
	}

	@queryField
	get modifiedTime(): Date {
		return this._queryFields['modifiedTime'].value;
	}

	set modifiedTime(value: Date) {
		this._queryFields['modifiedTime'].value = value;
	}

	@queryField
	get viewedByMeTime(): Date {
		return this._queryFields['viewedByMeTime'].value;
	}

	set viewedByMeTime(value: Date) {
		this._queryFields['viewedByMeTime'].value = value;
	}

	@queryField
	get trashed(): boolean {
		return this._queryFields['trashed'].value;
	}

	set trashed(value: boolean) {
		this._queryFields['trashed'].value = value;
	}

	@queryField
	get starred(): boolean {
		return this._queryFields['starred'].value;
	}

	set starred(value: boolean) {
		this._queryFields['starred'].value = value;
	}

	@queryCollectionField
	get parents(): string {
		return this._queryFields['parents'].value;
	}

	set parents(value: string) {
		this._queryFields['parents'].value = value;
	}

	@queryCollectionField
	get owners(): string {
		return this._queryFields['owners'].value;
	}

	set owners(value: string) {
		this._queryFields['owners'].value = value;
	}

	@queryCollectionField
	get writers(): string {
		return this._queryFields['writers'].value;
	}

	set writers(value: string) {
		this._queryFields['writers'].value = value;
	}

	@queryCollectionField
	get readers(): string {
		return this._queryFields['readers'].value;
	}

	set readers(value: string) {
		this._queryFields['readers'].value = value;
	}

	@queryField
	get sharedWithMe(): boolean {
		return this._queryFields['sharedWithMe'].value;
	}

	set sharedWithMe(value: boolean) {
		this._queryFields['sharedWithMe'].value = value;
	}

	// @queryField
	// get properties(): string {
	// 	return this._queryFields['properties'].value;
	// }

	// set properties(value: string) {
	// 	this._queryFields['properties'].value = value;
	// }

	// @queryField
	// get appProperties(): string {
	// 	return this._queryFields['appProperties'].value;
	// }

	// set appProperties(value: string) {
	// 	this._queryFields['appProperties'].value = value;
	// }

	_queryFieldsRegistry: any;
	_queryFields: any;

	constructor() {
		let fn, name, operator;

		this._queryFields = {};

		for (let key in this._queryFieldsRegistry) {
			fn = this._queryFieldsRegistry[key][0];
			name = this._queryFieldsRegistry[key][1];
			operator = this._queryFieldsRegistry[key][2];

			this._queryFields[key] = new fn(name, operator);
		}
	}

	equal(prop:string, value:any, operator?: string) {
		if (!this._queryFields.hasOwnProperty(prop)) {
			throw new Error('DriveFilesListQuery: No property named "' + prop + '"');
		}

		if (this._queryFields[prop] instanceof QueryCollectionField && ((operator || this._queryFields[prop].operator) !== OPERATORS.IN)) {
			throw new Error('DriveFilesListQuery: QueryCollectionField only supports operator "' + OPERATORS.IN + '"');
		}

		this._queryFields[prop].operator = operator || this._queryFields[prop].operator;
		this._queryFields[prop].value = value;

		return this;
	}

	get not():any {
		return {
			'equal': (prop: string, value: any) => this.equal(prop, value, OPERATORS.NOT_EQUAL)
		}
	}

	toString() {
		var _query:string[] = [];

		for (let key in this._queryFields) {
			if (this._queryFields.hasOwnProperty(key) && (this._queryFields[key].value !== undefined)) {
				if (this._queryFields[key] instanceof QueryCollectionField) {
					_query.push('"' + this._queryFields[key].value + '" ' + this._queryFields[key].operator + ' ' + this._queryFields[key].key);
				} else {
					_query.push(this._queryFields[key].key + this._queryFields[key].operator + '"' + this._queryFields[key].value + '"');
				}
			}
		}

		return _query.join(',');
	}
}

export class Drive {
	static DEFAULT_PAGESIZE: number = 100;

	private static _nextPageToken: string;

	static list(pageSize?: number, query?: DriveFilesListQuery) {
		var _request;

		this._nextPageToken = null;

		_request = gapi.client.drive.files.list(this._createPayload(pageSize, query));

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