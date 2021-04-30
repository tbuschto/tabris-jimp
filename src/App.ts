/* eslint-disable no-console */
import {contentView} from 'tabris';
import {inject} from 'tabris-decorators';
import {MainViewModel} from './MainViewModel';
import {MainView} from './MainView';

export class App {

  constructor(
    @inject private main: MainViewModel
  ) {}

  start() {
    contentView.append(
      MainView({stretch: true, model: this.main})
    );
  }

}
