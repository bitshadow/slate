import SlateModel from './models/slate.js';
import SlateConfigView from './views/slateConfig.js';
import SlateView from './views/slate.js';
import ShareView from './views/share.js';

let { View } = Backbone;

class SlateApp extends View {
    constructor(options) {
        super(options);
        let model = new SlateModel();
        this.slateConfigView = new SlateConfigView({
            model: model,
            el: $('.slate__config')
        });

        this.slateView = new SlateView({
            model: model,
            el: $('.slate__preview')
        });

        this.shareView = new ShareView({
            model: model,
            el: $('.share-box')
        });
    }

    render() {
        this.slateConfigView.render();
        this.slateView.render();
    }
}

(new SlateApp()).render()
