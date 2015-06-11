import slate from './slate';

let canvas = document.getElementById('canvas');
slate.render(canvas, { element: '.result' });

// let context = canvas.getContext('2d');
// canvas.width = 150;
// canvas.height = 150;
// context.font = "bold 70px Helvetica"
// context.textAlign = 'center'
// context.textBaseline = 'middle'
// context.lineWidth = 3;
// context.fillText("Hello", 75, 75);

// let gif = new GIF({
//   workers: 2,
//   quality: 10,
//   width: 150,
//   height: 150
// });

// // add an image element
// // gif.addFrame(imageElement);

// gif.addFrame context {copy: true, delay: 200}

// context.font = "bold 70px Helvetica"
// context.textAlign = 'center'
// context.textBaseline = 'middle'
// context.lineWidth = 3;
// context.fillStyle = "rgb(255,255,255)";
// context.fillRect 0 0 150 150
// context.fillText "Hello" 75 75

// gif.addFrame(context, {copy: true, delay: 200});
// // // or copy the pixels from a canvas context
// // gif.addFrame(ctx, {copy: true});

// gif.on('finished', function(blob) {
//   window.open(URL.createObjectURL(blob));
// });

// gif.render();