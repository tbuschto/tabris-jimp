import {MSG_EDIT, MSG_LOAD, MSG_LOG, MSG_READY, MSG_RESULT} from './const';

// ArrayBuffer can not be nested in a message object
// See https://github.com/eclipsesource/tabris-js/issues/2171

export type WorkerRequest =
    ArrayBuffer & {type?: never}
  | {type: typeof MSG_EDIT, ops: string[]};

export type WorkerResponse =
  | {type: typeof MSG_LOG, message: string, error?: boolean}
  | {type: typeof MSG_READY}
  | ArrayBuffer & {type?: never};
