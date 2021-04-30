import Jimp from 'jimp';
import {MSG_EDIT, MSG_LOAD, MSG_LOG, MSG_READY, MSG_RESULT} from '../src-common/const';
import {WorkerRequest, WorkerResponse} from '../src-common/types';
import {WorkerExt} from '../src-common/WorkerExt';

export class EditableImageClient extends WorkerExt<WorkerRequest, WorkerResponse> {

  private image: Jimp;

  constructor() {
    super(global as unknown as Worker);
    this.log('START');
    this.onMessage(async ({data}) => {
      if (data instanceof ArrayBuffer) {
        await this.load(data);
      } else if (data.type === MSG_EDIT) {
        await this.edit(data.ops);
      } else {
        this.log(new Error('Unknown message ' + data));
      }
    });
  }

  protected log(message: string | Error) {
    if (message instanceof Error) {
      this.post({type: MSG_LOG, message: 'Worker: ' + message.toString(), error: true});
    } else {
      this.post({type: MSG_LOG, message: 'Worker: ' + message});
    }
  }

  private async load(buffer: ArrayBuffer) {
    this.log(`Decoding ${Math.ceil(buffer.byteLength / 1024)} KB`);
    this.image = await Jimp.read(Buffer.from(buffer));
    this.post({type: MSG_READY});
  }

  private async edit(_ops: string[]) {
    this.log(`Editing ${_ops.join()}`);
    this.image.grayscale();
    const {buffer} = (await this.image.getBufferAsync(Jimp.MIME_JPEG));
    this.log(`Result is ${Math.ceil(buffer.byteLength / 1024)} KB`);
    this.post(buffer);
    this.log('Sent');
  }

}
