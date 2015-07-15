import fonts from '../modules/fonts';

let {
    View
} = Backbone;

export default class extends View {
    constructor(options) {
        _.defaults(options, {
            events: {
                'change .text-color': '_updateModel',
                'change .bg-color': '_updateModel',
                'keyup .text': 'setText',
                'change .family': '_updateModel',
                'keyup .delay': '_updateModel',
                'keyup .font-height': '_updateModel',
                'keydown .delay': '_updateInput',
                'keydown .font-height': '_updateInput',
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
        this.$el.append(this.template({
            model: this.model.attributes
        }));
        this.postRender();
    }

    postRender() {
        let select = this.$('.family');

        let str = ''
        this.fonts.forEach((font) => {
            let selected = font.name === this.model.get('family') ? 'selected' : '';
            str += '<option val="' + font + '"' + selected + '>' + font + '</option>';
        });

        select.append(str);

        var keys = ['bgColor', 'textColor', 'text'];
        keys.forEach((key) => {
            this.$('[name="' + key + '"]').val(this.model.get(key));
        });
    }

    setDebouncedText(text) {
        this.model.set({
            text: text
        });
    }

    setText(e) {
        var text = $(e.target).val();
        this._setDebouncedText(text);
    }

    _updateInput(ev) {
        if (ev.keyCode != 38 && ev.keyCode != 40) return;

        var target = $(ev.currentTarget),
            val = parseInt(target.val()),
            increment = ev.keyCode == 38 ? 1 : -1,
            multiply = ev.shiftKey ? 10 : 1,
            newVal = val + increment * multiply;

        if (newVal < 0) newVal = 0;

        target.val(newVal);
    }

    _updateModel(ev) {
        let target = $(ev.currentTarget),
            val = target.val(),
            attr;

        attr = target.attr('name');

        if (attr === 'fontHeight' || attr === 'delay') val = parseInt(val, 10);
        if (attr === 'textColor' || attr === 'bgColor') val = '#' + val;

        this.model.set(attr, val);
    }

    setAttributes(e) {
        let text = $('[name="text"]').val();
        this.model.set({
            text: text
        });
    }
}
