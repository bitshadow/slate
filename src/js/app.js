import SlateModel from './models/slate.js';
import SlateConfigView from './views/slateConfig.js';
import SlateView from './views/slate.js';

let model = new SlateModel();
let slateConfigView = new SlateConfigView({ model: model, el: $('.slate__config')});
let slateView = new SlateView({ model: model, el: $('.slate__preview') });