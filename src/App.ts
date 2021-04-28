import {contentView} from 'tabris';
import {inject} from 'tabris-decorators';
import {MainViewModel} from './MainViewModel';
import {MainView} from './MainView';
import * as jimp from 'jimp';

export class App {

  constructor(
    @inject private main: MainViewModel
  ) {}

  start() {
    console.log(jimp.cssColorToHex('#ff00ff'));
    contentView.append(
      MainView({stretch: true, model: this.main})
    );
  }

}
