let { View } = Backbone;

export default class extends View {
    initialize() {
        this.events = {
            'click #generate': 'setAttributes'
        };
    }

    setAttributes(e) {
        let text = $('[name="text"]').val();
        this.model.set({text: text});
    }
}