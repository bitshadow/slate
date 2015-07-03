let { Model } = Backbone;

export default class extends Model{
    defaults() {
        return {
            bgColor: '#018790',
            textColor: '#fff',
            font: 'Arial',
            text: 'I am AWESOME!',
            width: 400,
            height: 400,
            fontHeight: 35,
            delay: 250
        }
    }
};