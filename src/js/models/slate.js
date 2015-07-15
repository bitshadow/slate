import { colors, quotes } from '../modules/constants';

let { Model } = Backbone;
export default class extends Model{
    defaults() {
        let bgColor = colors[Math.floor(Math.random() * colors.length)];
        let quote = quotes[Math.floor(Math.random() * quotes.length)]
        return {
            bgColor: bgColor,
            textColor: '#fff',
            family: 'Georgia',
            text: quote,
            width: 360,
            height: 400,
            fontHeight: 35,
            delay: 300
        }
    }
};