import fonts from '../modules/fonts';

let { View } = Backbone;

export default class extends View {
    constructor(options) {
        _.defaults(options, {
            events: {
                'change .text-color': 'setTextColor',
                'change .bg-color': 'setBgColor',
                'keyup .height': 'setFontHeight',
                'keyup .text': 'setText',
                'keyup .delay': 'setDelay',
                'change .family': 'setFontFamily'
            }
        });

        super(options);
        this.fonts = fonts;
        this.template = _.template($('script.slate-config').html());
    }

    initialize() {
        this._setDebouncedText = _.debounce(_.bind(this.setDebouncedText, this), 300);
    }

    render() {
        this.$el.append(this.template({ model: this.model.attributes }));
        this.postRender();
    }

    postRender() {
        let select = this.$('.family');

        this.fonts.forEach((font) => {
            select.append('<option val="' + font + '">' + font + '</option>');
        });

        this.$('.text-color').val(this.model.get('textColor'));
        this.$('.bg-color').val(this.model.get('bgColor'))
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

    setFontFamily(e) {
        this.model.set({ font: $(e.target).val().trim()});
    }

    setAttributes(e) {
        let text = $('[name="text"]').val();
        this.model.set({text: text});
    }
}