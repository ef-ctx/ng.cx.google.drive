declare module gapi.client.drive {}

declare module gapi.client.drive.files {
	export function get(fileId: any): void;
	export function list(payload: any): void;
}

declare module gapi.client.drive.permissions {
	export function create(payload: any): void;
}