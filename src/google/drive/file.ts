
const MIME_TYPES = {
	'FOLDER': 'application/vnd.google-apps.folder'
}

interface IVideoMediaMetadata {
	width: number
	height: number
	durationMillis: number
}

class VideoMediaMetadata implements IVideoMediaMetadata {
	width: number
	height: number
	durationMillis: number

	constructor(data: IVideoMediaMetadata) {
		this.width = data && data.width;
		this.height = data && data.height;
		this.durationMillis = data && data.durationMillis;
	}
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
  videoMediaMetadata: VideoMediaMetadata

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
		this.videoMediaMetadata = new VideoMediaMetadata(data.videoMediaMetadata);
	}

	isFolder():boolean {
		return (this.mimeType && this.mimeType === MIME_TYPES.FOLDER);
	}
}