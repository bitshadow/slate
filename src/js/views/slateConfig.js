let { View } = Backbone;

export default class extends View {
    constructor(options) {
        _.defaults(options, {
            events: {
                'change .text-color': 'setTextColor',
                'change .bg-color': 'setBgColor',
                'keyup .height': 'setFontHeight',
                'keyup .text': 'setText',
                'keyup .delay': 'setDelay'
            }
        });

        super(options);
        this.$('.text-color').val(this.model.get('textColor'));
        this.$('.bg-color').val(this.model.get('bgColor'))
    }

    initialize() {
        this._setDebouncedText = _.debounce(_.bind(this.setDebouncedText, this), 300);
    }

    setDebouncedText(text) {
        this.model.set({ text: text });
    }

    setDelay(e) {
        this.model.set({ delay: parseInt($(e.target).val(), 10) })
    }

    setText(e) {
        var text = $(e.target).val();
        this._setDebouncedText(text);
    }

    setFontHeight(e) {
        this.model.set({ fontHeight: parseInt($(e.target).val(), 10) });
    }

    setTextColor(e) {
        this.model.set({ textColor: '#' + $(e.target).val() });
    }

    setBgColor(e) {
        this.model.set({ bgColor: '#' + $(e.target).val() });
    }

    setAttributes(e) {
        let text = $('[name="text"]').val();
        this.model.set({text: text});
    }
}