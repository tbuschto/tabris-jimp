/* eslint-disable no-console */
import {contentView} from 'tabris';
import {inject} from 'tabris-decorators';
import jimp from 'jimp';
import bmp from '@jimp/bmp';
import gif from '@jimp/gif';
import jpeg from '@jimp/jpeg';
import png from '@jimp/png';
import tiff from '@jimp/tiff';
import fisheye from '@jimp/plugin-fisheye';
import threshold from '@jimp/plugin-threshold';
import circle from '@jimp/plugin-circle';
import shadow from '@jimp/plugin-shadow';
import {MainViewModel} from './MainViewModel';
import {MainView} from './MainView';

export class App {

  constructor(
    @inject private main: MainViewModel
  ) {}

  start() {
    console.log(bmp);
    console.log(gif);
    console.log(jpeg);
    console.log(png);
    console.log(tiff);
    console.log(fisheye);
    console.log(threshold);
    console.log(circle);
    console.log(shadow);
    console.log(jimp.cssColorToHex('#ff00ff'));
    contentView.append(
      MainView({stretch: true, model: this.main})
    );
  }

}
