import {shared, Injector} from 'tabris-decorators';
import {EditableImage} from './EditableImage';

@shared
export class ImageProvider {

  private readonly URL = 'http://placeimg.com';
  private readonly WIDTH = 4000;
  private readonly HEIGHT = 3000;
  private readonly THEME = 'any';

  async getRandom(): Promise<EditableImage> {
    const response = await fetch(
      [this.URL, this.WIDTH, this.HEIGHT, this.THEME].join('/')
    );
    const result = Injector.get(this).resolve(EditableImage);
    return result.load(await response.blob());
  }

}
