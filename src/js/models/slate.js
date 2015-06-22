let { Model } = Backbone;

export default class extends Model{
    defaults() {
        return {
            bgColor: '#018790',
            textColor: '#fff',
            font: 'Georgia, serif',
            text: 'Generate your text here',
            width: 540,
            height: 540,
            fontHeight: 50,
            delay: 250
        }
    }
};