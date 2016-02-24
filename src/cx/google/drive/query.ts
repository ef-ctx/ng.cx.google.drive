/// <reference path="../../../../typings/tsd.d.ts" />

const OPERATORS = {
  'CONTAINS': '{key} contains "{value}"',
  'NOT_CONTAINS': 'not {key} contains "{value}"',
  'EQUAL': '{key}="{value}"',
  'NOT_EQUAL': '{key}!="{value}"',
	'IN': '"{value}" in {key}'
}

const DRIVE_QUERY_ORDER_DIRECTION  = {
		ASCENDING: 'asc',
    DESCENDING: 'desc'
}

const DRIVE_QUERY_VALID_CORPUS_FIELDS = ['domain', 'user'];
const DRIVE_QUERY_VALID_ORDER_FIELDS = ['createdTime', 'folder', 'modifiedByMeTime', 'modifiedTime', 'name', 'quotaBytesUsed', 'recency', 'sharedWithMeTime', 'starred', 'viewedByMeTime'];
const DRIVE_QUERY_VALID_SPACES_FIELDS = ['drive', 'appDataFolder', 'photos'];

// https://developers.google.com/drive/v2/reference/files/list
export interface IDriveQueryQ {
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
export interface IDriveGApiQuery {
	fields?: string;
  fileId?: string;
	corpus?: string;
  orderBy?: string;
	pageSize?: number;
	pageToken?: string;
	q?: string;
	spaces?: string;
}

function queryField(target: DriveQueryQ, propertyKey: string): any {
	target._queryFieldsRegistry = target._queryFieldsRegistry || {};
	target._queryFieldsRegistry[propertyKey] = [QueryField, propertyKey, OPERATORS.EQUAL];
}

function queryCollectionField(target: DriveQueryQ, propertyKey: string) {
	target._queryFieldsRegistry = target._queryFieldsRegistry || {};
	target._queryFieldsRegistry[propertyKey] = [QueryCollectionField, propertyKey, OPERATORS.IN];
}

class QueryField {
	key: string;
	operatorValuePair: any;

	private defaultOperator: string;

	constructor(key: string, defaultOperator: string) {
		this.key = key;
		this.defaultOperator = defaultOperator;
		this.operatorValuePair = {};

    this.operatorValuePair[OPERATORS.CONTAINS] = [];
    this.operatorValuePair[OPERATORS.NOT_CONTAINS] = [];
		this.operatorValuePair[OPERATORS.EQUAL] = [];
    this.operatorValuePair[OPERATORS.NOT_EQUAL] = [];
		this.operatorValuePair[OPERATORS.IN] = [];
	}

	get valuesCount(): number {
		var n = 0,
			operator;

		for (operator in this.operatorValuePair) {
			n += this.operatorValuePair[operator].length;
		}

		return n;
	}

	set(operator: string, value: any) {
		var _operator = operator || this.defaultOperator;
		if (!this.operatorValuePair.hasOwnProperty(_operator)) {
			throw new Error('Uknown operator "' + _operator + '" for QueryField when setting value "' + value + '"');
		}

		this.operatorValuePair[_operator].push(value);
	}

	toString(): string {
		var _values = [],
			_orStr,
			_or,
			_operator,
			i,
			j;

		for (_operator in this.operatorValuePair) {
			for (i = 0; i < this.operatorValuePair[_operator].length; i += 1) {
				if (this.operatorValuePair[_operator][i] instanceof Array) {
					_orStr = '(';
					_or = [];

					for (j = 0; j < this.operatorValuePair[_operator][i].length; j += 1) {
            _or.push(this.constructKeyValueStr(this.key, this.operatorValuePair[_operator][i][j], _operator))
					}

					_orStr += _or.join(' or ');
					_orStr += ')';

					_values.push(_orStr);
				} else {
          _values.push(this.constructKeyValueStr(this.key, this.operatorValuePair[_operator][i], _operator));
				}
			}
		}

		if (_values.length > 1) {
			return _values.join(' and ');
		}

		return _values.join('');
	}

  constructKeyValueStr(key, value, operator) {
    var _orStr = operator.replace('{key}', key);
    _orStr = _orStr.replace('{value}', value);
    return _orStr;
  }
}

class QueryCollectionField extends QueryField {
	toString(): string {
		var _values = [],
			_operator,
			i;

		for (_operator in this.operatorValuePair) {
			for (i = 0; i < this.operatorValuePair[_operator].length; i += 1) {
        _values.push(this.constructKeyValueStr(this.key, this.operatorValuePair[_operator][i], _operator));
			}
		}

		return _values.join('');
	}
}

class DriveQueryQ implements IDriveQueryQ {
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

	toString() {
		var _q: string[] = [],
			_qField:QueryField;

		for (let key in this._queryFields) {
			if (this._queryFields.hasOwnProperty(key) && (this._queryFields[key].valuesCount > 0)) {
				_qField = this._queryFields[key];
				_q.push(_qField.toString());
			}
		}

		return _q.join(' and ');
	}
}

export class DriveQuery {
  private _corpus: string;
	private _fields: string[];
	private _fileId: string;
	private _limit: number;
	private _orderBy: string[];
	private _nextPageToken: string;
	private _queryFieldsRegistry: any;
	private _queryFields: any;
	private _queryQ: DriveQueryQ;
  private _spaces: string[];

	constructor() {
		this._queryQ = new DriveQueryQ();
    this._fields = [];
    this._orderBy = [];
    this._spaces = [];
	}


  contains(prop: string, value: any, operator?: string) {
    return this.equal(prop, value, OPERATORS.CONTAINS);
  }

  corpus(key: string) {
    if (DRIVE_QUERY_VALID_CORPUS_FIELDS.indexOf(key) === -1) {
      throw new Error('"' + key + '" is not a valid corpus field. Valid fields are ' + DRIVE_QUERY_VALID_CORPUS_FIELDS);
    }

    this._corpus = key;
    return this;
  }

	equal(prop: string, value: any, operator?: string) {
		if (!this._queryQ._queryFields.hasOwnProperty(prop)) {
			throw new Error('DriveQuery: No property named "' + prop + '"');
		}

		if (this._queryQ._queryFields[prop] instanceof QueryCollectionField && ((operator || this._queryQ._queryFields[prop].defaultOperator) !== OPERATORS.IN)) {
			throw new Error('DriveQuery: QueryCollectionField only supports OPERATORS.IN');
		}

		this._queryQ._queryFields[prop].set(operator, value);

		return this;
	}

	fields(value) {
		if (value instanceof Array) {
      this._fields = this._fields.concat(value);
		} else {
      this._fields.push(value)
		}

		return this;
	}

	fileId(fileId: string) {
		this._fileId = fileId;
		return this;
	}

	limit(limitTo: number) {
		this._limit = limitTo;
		return this;
	}

	get not(): any {
		return {
      'contains': (prop: string, value: any) => this.equal(prop, value, OPERATORS.NOT_CONTAINS),
			'equal': (prop: string, value: any) => this.equal(prop, value, OPERATORS.NOT_EQUAL)
		}
	}

  orderBy(key:string, direction:string = DRIVE_QUERY_ORDER_DIRECTION.ASCENDING) {
    var _orderByStr;

    if (DRIVE_QUERY_VALID_ORDER_FIELDS.indexOf(key) === -1) {
      throw new Error('"' + key + '" is not a valid orderBy field. Valid fields are ' + DRIVE_QUERY_VALID_ORDER_FIELDS);
    }

    _orderByStr = key + (direction === DRIVE_QUERY_ORDER_DIRECTION.DESCENDING? ' desc' : '');
    this._orderBy.push(_orderByStr);
    return this;
	}

	 spaces(key:string) {
    if (DRIVE_QUERY_VALID_SPACES_FIELDS.indexOf(key) === -1) {
      throw new Error('"' + key + '" is not a valid spaces field. Valid fields are ' + DRIVE_QUERY_VALID_SPACES_FIELDS);
    }

    this._spaces.push(key);
    return this;
  }

	toQuery() {
		var _q: string = this._queryQ.toString(),
			_query:IDriveGApiQuery = {};

		if (_q) {
			_query.q = _q;
		}

    if (this._corpus) {
      _query.corpus = this._corpus;
    }

    if (this._fields.length > 0) {
      _query.fields = this._fields.join(',');
    }

		if (this._fileId) {
			_query.fileId = this._fileId;
		}

		if (this._limit) {
			_query.pageSize = this._limit;
		}

    if (this._orderBy.length > 0) {
      _query.orderBy = this._orderBy.join(',');
    }

    if (this._spaces.length > 0) {
      _query.spaces = this._spaces.join(',');
    }

		if (this._nextPageToken) {
			_query.pageToken = this._nextPageToken;
		}

		return _query;
	}

  _pageToken(token: string) {
    this._nextPageToken = token;
  }
}
