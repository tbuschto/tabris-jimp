import {ChangeListeners} from 'tabris';
import {injectable, event, prop} from 'tabris-decorators';
import {MSG_EDIT, MSG_LOAD, MSG_LOG} from '../src-common/const';
import {WorkerRequest, WorkerResponse} from '../src-common/types';
import {WorkerExt} from '../src-common/WorkerExt';

@injectable
export class EditableImage extends WorkerExt<WorkerResponse, WorkerRequest> {

  @prop preview: Blob;
  @event onPreviewChanged: ChangeListeners<EditableImage, 'preview'>;

  private _ready: Promise<this>;
  private done: () => void;

  constructor() {
    super(new Worker('dist/worker.js'));
    this.onMessage(({data}) => data.type === MSG_LOG ? this.log(data.message) : null);
  }

  get ready() {
    return this._ready;
  }

  async load(encoded: Blob): Promise<this> {
    this.log('Loading...');
    this.busy();
    this.preview = encoded;
    await this.postAsync(
      await encoded.arrayBuffer(),
      data => data.type === 'ready'
    );
    this.done();
    return this;
  }

  async edit(ops: string[]) {
    // const opName: keyof Jimp = 'blur';
    // const opArgs: Parameters<Jimp['blur']> = [2];
    // this.image[opName](opArgs[0]);
    const now = Date.now();
    const result = await this.postAsync(
      {type: MSG_EDIT, ops: []},
      data => data instanceof ArrayBuffer ? data : null
    );
    console.info(ops, ':' + (Date.now() - now) + ' ms');
    this.preview = new Blob([result]);
  }

  protected log(msg: string | Error) {
    if (msg instanceof Error) {
      console.error(this.constructor.name, msg);
    } else {
      console.info(this.constructor.name, msg);
    }
  }

  private busy(): void {
    this._ready = new Promise(resolve => this.done = () => resolve(this));
  }

}
