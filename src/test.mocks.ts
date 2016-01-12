/// <reference path='../typings/tsd.d.ts' />

export declare var gapi: any;
gapi = {
	'auth': {
		'authorize': function(opt, callback) {
			callback({
				'access_token': 'a',
				'expires_in': '1',
				'state': '1'
			});
		}
	},
	'client': {
		'drive': {
			'files': {
				'list': function () {
					return {
						'execute': function(callback) {
							callback({
								'kind': 'drive#fileList',
								'etag': 'etag',
								'selfLink': 'string',
								'nextPageToken': 'nextPageToken123456',
								'nextLink': 'string',
								'items': [
									{
										"kind": "drive#file",
										"id": "1uhs-a41dp2z0NLs-QiXYY-rqLGhgjmTf4iwBad2myzY",
										"etag": "\"XTBboRWlttiWhZ_feOHVV3sFYJs/MTQ1MjM5NzI4Mzk1Ng\"",
										"selfLink": "https://www.googleapis.com/drive/v2/files/1uhs-a41dp2z0NLs-QiXYY-rqLGhgjmTf4iwBad2myzY",
										"alternateLink": "https://docs.google.com/document/d/1uhs-a41dp2z0NLs-QiXYY-rqLGhgjmTf4iwBad2myzY/edit?usp=drivesdk",
										"embedLink": "https://docs.google.com/document/d/1uhs-a41dp2z0NLs-QiXYY-rqLGhgjmTf4iwBad2myzY/preview",
										"iconLink": "https://ssl.gstatic.com/docs/doclist/images/icon_11_document_list.png",
										"title": "ES6 +A: Angular v2.0 extensions to ES6 Traceur",
										"mimeType": "application/vnd.google-apps.document",
										"labels": {
											"starred": false,
											"hidden": false,
											"trashed": false,
											"restricted": false,
											"viewed": true
										},
										"createdDate": "2014-02-11T01:08:41.489Z",
										"modifiedDate": "2016-01-10T03:41:23.956Z",
										"lastViewedByMeDate": "2014-03-18T16:25:15.642Z",
										"markedViewedByMeDate": "1970-01-01T00:00:00.000Z",
										"version": "3438760",
										"parents": [
											{
												"kind": "drive#parentReference",
												"id": "0B7Ovm8bUYiUDR29iSkEyMk5pVUk",
												"selfLink": "https://www.googleapis.com/drive/v2/files/1uhs-a41dp2z0NLs-QiXYY-rqLGhgjmTf4iwBad2myzY/parents/0B7Ovm8bUYiUDR29iSkEyMk5pVUk",
												"parentLink": "https://www.googleapis.com/drive/v2/files/0B7Ovm8bUYiUDR29iSkEyMk5pVUk",
												"isRoot": false
											}
										],
										"userPermission": {
											"kind": "drive#permission",
											"etag": "\"XTBboRWlttiWhZ_feOHVV3sFYJs/t_befUGCSRyCOwOoJN1AxNIVzSs\"",
											"id": "me",
											"selfLink": "https://www.googleapis.com/drive/v2/files/1uhs-a41dp2z0NLs-QiXYY-rqLGhgjmTf4iwBad2myzY/permissions/me",
											"role": "reader",
											"additionalRoles": [
												"commenter"
											],
											"type": "user"
										},
										"quotaBytesUsed": "0",
										"ownerNames": [
											"Miško Hevery"
										],
										"owners": [
											{
												"kind": "drive#user",
												"displayName": "Miško Hevery",
												"picture": {
													"url": "https://lh6.googleusercontent.com/-t9SJPTtvPZQ/AAAAAAAAAAI/AAAAAAAAS6I/OF58UIXVUC8/s64/photo.jpg"
												},
												"isAuthenticatedUser": false,
												"permissionId": "09367365032895807306",
												"emailAddress": "misko.hevery@gmail.com"
											}
										],
										"lastModifyingUserName": "",
										"lastModifyingUser": {
											"kind": "drive#user",
											"displayName": "",
											"isAuthenticatedUser": false
										},
										"editable": false,
										"copyable": true,
										"writersCanShare": true,
										"shared": true,
										"explicitlyTrashed": false,
										"appDataContents": false,
										"spaces": [
											"drive"
										]
									}
								]
							});
						}
					}
				}
			}
		},
		'load': function(name, version, callback) {
			callback();
		}
	}
};
