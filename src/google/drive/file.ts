
const MIME_TYPES = {
	'FOLDER': 'application/vnd.google-apps.folder'
}

export class DriveFileResource {
	kind: string
  id: string
  name: string
  mimeType: string
  description: string
  starred: boolean
  trashed: boolean
  parents: string[]
  version: number
  webContentLink: string
  webViewLink: string
  iconLink: string
  thumbnailLink: string
  createdTime: Date
  modifiedTime: Date

	constructor(data:any) {
		this.kind = data.kind;
		this.id = data.id;
		this.name = data.name;
		this.mimeType = data.mimeType;
		this.description = data.description;
		this.starred = data.starred;
		this.trashed = data.trashed;
		this.parents = data.parents;
		this.version = data.version;
		this.webContentLink = data.webContentLink;
		this.webViewLink = data.webViewLink;
		this.iconLink = data.iconLink;
		this.thumbnailLink = data.thumbnailLink;
		this.createdTime = data.createdTime;
		this.modifiedTime = data.modifiedTime;
	}

	isFolder():boolean {
		return (this.mimeType && this.mimeType === MIME_TYPES.FOLDER);
	}
}