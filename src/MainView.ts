import {TextView, Button, Properties, asFactory, ImageView, Stack, device, ActivityIndicator} from 'tabris';
import {component, bindAll} from 'tabris-decorators';
import {MainViewModel} from './MainViewModel';

namespace internal {

  @component // Enabled data binding syntax
  export class MainView extends Stack {

    @bindAll({
      message: '#label.text',
      snapshot: 'ImageView.image',
      busy: '>> ActivityIndicator.visible'
    })
    model: MainViewModel;

    constructor(properties: Properties<MainView>) {
      super({alignment: 'stretchX', padding: 12});
      this.set(properties).append(
        ImageView({height: Math.min(device.screenWidth, device.screenHeight)}),
        ActivityIndicator({centerX: true}),
        TextView({id: 'label', centerX: true, padding: 16, font: {size: 24}}),
        Button({
          text: 'Random Image',
          onSelect: () => this.model.loadRandom()
        }),
        Button({
          text: 'Edit',
          onSelect: () => this.model.edit()
        })
      );
    }

  }

}

export const MainView = asFactory(internal.MainView);
