declare module 'cx/google/drive/drive' {
  import {Files} from 'cx/google/drive/files';
  import {DriveFileResource} from 'cx/google/drive/file';
  import {DrivePermissions} from 'cx/google/drive/permissions';
  import {DriveQuery} from 'cx/google/drive/query';
}

declare module 'cx/google/drive/file' {
  interface IVideoMediaMetadata {
    width: number;
    height: number;
    durationMillis: number;
  }

  class VideoMediaMetadata implements IVideoMediaMetadata {
    width: number;
    height: number;
    durationMillis: number;
    constructor(data: IVideoMediaMetadata);
  }

  class DriveFileResource {
    kind: string;
    id: string;
    name: string;
    mimeType: string;
    description: string;
    starred: boolean;
    trashed: boolean;
    parents: string[];
    version: number;
    webContentLink: string;
    webViewLink: string;
    iconLink: string;
    thumbnailLink: string;
    createdTime: Date;
    modifiedTime: Date;
    videoMediaMetadata: VideoMediaMetadata;
    constructor(data: any);
    isFolder(): boolean;
  }
}

declare module 'cx/google/drive/files' {
  import { DriveQuery } from 'cx/google/drive/query';
  import { DriveFileResource } from 'cx/google/drive/file';
  import { DrivePermissions } from 'cx/google/drive/permissions';

  interface DriveApiResponse {
    query: DriveQuery;
    resource?: DriveFileResource;
    resources?: DriveFileResource[];
  }

  class Files {
    static permissions: DrivePermissions;
    private static _nextPageToken;
    static get(query?: DriveQuery): Promise<DriveApiResponse>;
    static list(query?: DriveQuery): Promise<DriveApiResponse>;
    private static _createFileResources(files);
    private static _defaultQuery();
    private static _execute(action, request, query, resolve, reject);
    private static _handleResponse(action, query, response, resolve, reject);
  }
}

declare module 'cx/google/drive/permissions' {
  class DrivePermissions {
    static create(fileId: string, type: string, role: string): Promise<{}>;
    private static _execute(request, resolve, reject);
    private static _handleResponse(response, resolve, reject);
  }
}

declare module 'cx/google/drive/query' {
  interface IDriveQueryQ {
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

  interface IDriveGApiQuery {
    fields?: string;
    fileId?: string;
    corpus?: string;
    orderBy?: string;
    pageSize?: number;
    pageToken?: string;
    q?: string;
    spaces?: string;
  }

  class DriveQuery {
    private _corpus;
    private _fields;
    private _fileId;
    private _limit;
    private _orderBy;
    private _nextPageToken;
    private _queryFieldsRegistry;
    private _queryFields;
    private _queryQ;
    private _spaces;
    constructor();
    contains(prop: string, value: any, operator?: string): this;
    corpus(key: string): this;
    equal(prop: string, value: any, operator?: string): this;
    fields(value: any): this;
    fileId(fileId: string): this;
    limit(limitTo: number): this;
    not: any;
    orderBy(key: string, direction?: string): this;
    spaces(key: string): this;
    toQuery(): IDriveGApiQuery;
    _pageToken(token: string): void;
  }

}