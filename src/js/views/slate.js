let { View } = Backbone;
import slate from '../modules/slate';

export default class extends View {
    constructor(options) {
        super(options);

        this.listenTo(this.model, 'change', this.render);
    }

    render() {
        slate.setProperties(this.model.toJSON());
        slate.render((err, data) => {
            var element = document.getElementById('result');
            element.src = 'data:image/gif;base64,' + data;
            localStorage.dataBase64 = data;
        });
    }
}