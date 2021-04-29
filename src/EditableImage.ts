import {Image, Listeners} from 'tabris';
import {event, injectable} from 'tabris-decorators';
import Jimp from 'jimp';

@injectable
export class EditableImage {

  @event onUpdate: Listeners<{target: EditableImage}>;
  ready: Promise<this>;

  private image: Jimp;
  private cached: Blob;
  private done: () => void;

  async load(encoded: Blob): Promise<this> {
    this.busy();
    this.cached = encoded;
    this.onUpdate.trigger();
    this.image = await Jimp.read(Buffer.from(await encoded.arrayBuffer()));
    this.done();
    return this;
  }

  edit(ops: string[]) {
    const now = Date.now();
    this.cached = null;
    this.image.grayscale();
    this.onUpdate.trigger();
    console.info(ops, ':' + (Date.now() - now) + ' ms');
  }

  async snapShot(): Promise<Blob> {
    await this.ready;
    if (!this.cached) {
      this.busy();
      const now = Date.now();
      this.image.quality(60);
      this.cached = await this.toBlob(Jimp.MIME_JPEG);
      console.info('encode:' + (Date.now() - now) + ' ms');
      this.done();
    }
    return this.cached;
  }

  private async toBlob(type: string): Promise<Blob> {
    return new Blob([(await this.image.getBufferAsync(type)).buffer]);
  }

  private busy(): void {
    this.ready = new Promise(resolve => this.done = () => resolve(this));
  }

}
