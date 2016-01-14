/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../google.d.ts" />

const DRIVE_PERMISSION_ROLES = {
	'COMMENTER': 'commenter',
	'OWNER': 'owner',
	'READER': 'reader',
	'WRITER': 'writer'
}

interface IDrivePermissionQuery {
	fileId: string;
	permissionId: string;
	role: string;
}

export class DrivePermissions {
	static update(fileId: string, permissionId:string, role:string) {
		var _query:IDrivePermissionQuery = {
				'fileId': fileId,
				'permissionId': permissionId,
				'role': role
			},
			_request = gapi.client.drive.permissions.update(_query);

		return new Promise((resolve, reject) => this._execute(_request, resolve, reject));
	}

	private static _execute(request, resolve, reject) {
		request.execute((response) => this._handleResponse(response, resolve, reject));
	}

	private static _handleResponse(response, resolve, reject) {
		resolve(response);
	}
}