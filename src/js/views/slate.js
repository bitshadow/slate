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
            let element = $('#result');
            element.removeClass('hide');
            element.attr('src', 'data:image/gif;base64,' + data);
            localStorage.dataBase64 = data;
        });
    }
}