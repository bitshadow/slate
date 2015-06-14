let { Model } = Backbone;

export default class extends Model{
    defaults() {
        return {
            bgColor: '#018790',
            textColor: '#fff',
            font: 'Roboto, Times New Roman, Times, serif',
            text: 'Generate your text here',
            width: 400,
            height: 400
        }
    }
};