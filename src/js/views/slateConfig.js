let { View } = Backbone;

export default class extends View {
    constructor(options) {
        _.defaults(options, {
            events: {
                'click #generate': 'setAttributes'
            }
        });

        super(options);
    }

    setAttributes(e) {
        let text = $('[name="text"]').val();
        this.model.set({text: text});
    }
}