let { View } = Backbone;
import slate from '../modules/slate';

export default class extends View {
    constructor(options) {
        super(options);

        this.listenTo(this.model, 'change', this.render);
    }

    render() {
        let model = this.model;

        slate.setProperties(this.model.toJSON());
        slate.render(document.getElementById('result'));
    }
}