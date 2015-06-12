import slate from './slate';

let canvas = document.getElementById('canvas');
slate.render(canvas, {
    element: '.result',
    text: "There is another world out",
    bgColor: '#018790',
    textColor: '#fff',
    font: "Roboto, Times New Roman, Times, serif"
});
