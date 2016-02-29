/// <reference path="../../../../typings/tsd.d.ts" />

import {Files} from 'cx/google/drive/files';
import {DriveQuery} from 'cx/google/drive/query';

export {Files} from 'cx/google/drive/files';
export {DriveQuery} from 'cx/google/drive/query';

window.cx = window.cx || {};
window.cx.google = window.cx.google || {};
window.cx.google.drive = {
  'DriveQuery': DriveQuery,
  'files': Files
};