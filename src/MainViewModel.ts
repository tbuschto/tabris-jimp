import {Image} from 'tabris';
import {inject, injectable, property} from 'tabris-decorators';
import {EditableImage} from './EditableImage';
import {ImageProvider} from './ImageProvider';

@injectable
export class MainViewModel {

  @property message: string = '';
  @property snapshot: Image;
  @property busy: boolean = false;

  @inject private imageProvider: ImageProvider;
  private image: EditableImage;

  constructor() {
    this.loadRandom().catch(ex => console.error(ex));
  }

  async loadRandom() {
    if (this.busy) {
      return;
    }
    this.busy = true;
    this.message = 'Loading image';
    this.image = await this.imageProvider.getRandom();
    await this.update();
  }

  async edit() {
    if (!this.image || this.busy) {
      return;
    }
    this.busy = true;
    this.message = 'Editing';
    const image = await this.image.ready;
    image.edit(['grayscale']);
    await this.update();
  }

  private async update() {
    const blob = await this.image.snapShot();
    this.snapshot = Image.from(blob);
    this.message = `Done (${Math.ceil(blob.size / 1000)} KB)`;
    this.busy = false;
  }

}
