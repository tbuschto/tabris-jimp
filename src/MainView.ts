import {Composite, TextView, Button, Constraint, Properties, asFactory} from 'tabris';
import {component, bindAll} from 'tabris-decorators';
import {MainViewModel} from './MainViewModel';

namespace internal {

  @component // Enabled data binding syntax
  export class MainView extends Composite {

    @bindAll({
      message: '#label.text'
    })
    model: MainViewModel;

    constructor(properties: Properties<MainView>) {
      super();
      this.set(properties).append(
        TextView({id: 'label', centerX: true, padding: 16, bottom: Constraint.next, font: {size: 24}}),
        Button({center: true, onSelect: () => this.model.continue(), text: 'Tap here'})
      );
    }

  }

}

export const MainView = asFactory(internal.MainView);
