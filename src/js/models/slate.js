import colors from '../modules/colors';

let { Model } = Backbone;
export default class extends Model{
    defaults() {
        let bgColor = colors[Math.floor(Math.random() * colors.length)];
        console.log(bgColor);
        return {
            bgColor: bgColor,
            textColor: '#fff',
            family: 'Georgia',
            text: 'The shortest answer is doing the thing.',
            width: 360,
            height: 400,
            fontHeight: 35,
            delay: 300
        }
    }
};