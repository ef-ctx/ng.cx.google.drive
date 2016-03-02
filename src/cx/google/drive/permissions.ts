const DRIVE_PERMISSION_ROLES = {
	'COMMENTER': 'commenter',
	'OWNER': 'owner',
	'READER': 'reader',
	'WRITER': 'writer'
}

interface IDrivePermissionQuery {
	fileId: string;
	type: string;
	role: string;
}

export class DrivePermissions {
	static create(fileId: string, type: string, role: string) {
		var _query:IDrivePermissionQuery = {
				'fileId': fileId,
				'type': type,
				'role': role
			},
			_request = gapi.client.drive.permissions.create(_query);

		return new Promise((resolve, reject) => this._execute(_request, resolve, reject));
	}

	private static _execute(request, resolve, reject) {
		request.execute((response) => this._handleResponse(response, resolve, reject));
	}

	private static _handleResponse(response, resolve, reject) {
		resolve(response);
	}
}