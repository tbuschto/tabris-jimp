import {Image} from 'tabris';
import {inject, injectable, property} from 'tabris-decorators';
import {EditableImage} from './EditableImage';
import {ImageProvider} from './ImageProvider';

@injectable
export class MainViewModel {

  @property message: string = '';
  @property snapshot: Image;
  @property busy: boolean = false;

  @inject private readonly imageProvider: ImageProvider;
  @inject private readonly image: EditableImage;

  constructor() {
    this.image.onPreviewChanged(({value}) => this.snapshot = Image.from(value));
    this.loadRandom().catch(ex => console.error(ex));
  }

  async loadRandom() {
    if (this.busy) {
      return;
    }
    this.busy = true;
    this.message = 'Loading image';
    await this.image.load(await this.imageProvider.getRandom())
      .catch(ex => console.error(ex));
    this.busy = false;
    this.message = `Done (${Math.ceil(this.image.preview.size / 1024)} KB)`;
  }

  async edit() {
    if (this.busy) {
      return;
    }
    this.busy = true;
    this.message = 'Editing';
    await this.image.edit(['grayscale']);
    this.message = `Done (${Math.ceil(this.image.preview.size / 1024)} KB)`;
    this.busy = false;
  }

}
