import {Files} from './files';
import {DriveQuery} from './query';

export {Files} from './files';
export {DriveFileResource} from './file';
export {DrivePermissions} from './permissions';
export {DriveQuery} from './query';


window.cx = window.cx || {};
window.cx.google = window.cx.google || {};
window.cx.google.drive = {
  'DriveQuery': DriveQuery,
  'files': Files
};