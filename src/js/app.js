import SlateModel from './models/slate.js';
import SlateConfigView from './views/slateConfig.js';
import SlateView from './views/slate.js';

class SlateApp {
  render() {
    let model = new SlateModel();
    new SlateConfigView({
        model: model,
        el: $('.slate__config')
    });
    new SlateView({
        model: model,
        el: $('.slate__preview')
    });
  }
}

(new SlateApp()).render()