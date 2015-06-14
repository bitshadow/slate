let { View } = Backbone;
import slate from '../modules/slate';

export default class extends View {
    constructor(options) {
        super(options);

        this.listenTo(this.model, 'change', this.render);
    }

    render() {
        slate.setProperties(this.model.toJSON());
        // use callback here;
        slate.render(document.getElementById('result'));
    }
}