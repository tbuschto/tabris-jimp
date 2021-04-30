import {shared} from 'tabris-decorators';

@shared
export class ImageProvider {

  private readonly URL = 'http://placeimg.com';
  private readonly WIDTH = 640;
  private readonly HEIGHT = 480;
  private readonly THEME = 'any';

  async getRandom(): Promise<Blob> {
    const response = await fetch(
      [this.URL, this.WIDTH, this.HEIGHT, this.THEME].join('/')
    );
    return response.blob();
  }

}
