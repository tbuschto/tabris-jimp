import {injectable, property} from 'tabris-decorators';

@injectable
export class MainViewModel {

  @property message: string = '';

  continue() {
    this.message = 'Tabris.js rocks!';
  }

}
