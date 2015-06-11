(function (factory) {
    !(typeof exports === 'object' && typeof module !== 'undefined') &&
    typeof define === 'function' && define.amd ? define(factory) :
    factory()
}(function () { 'use strict';

    var slate = {
        render: function (canvas) {
            var options = arguments[1] === undefined ? {} : arguments[1];

            var ctx = canvas.getContext('2d');
            var w = canvas.width;
            var h = canvas.height;
            var x = canvas.width / 2;
            var y = canvas.height / 2;
            var bgColor = options.bgColor || 'yellow';
            var textColor = options.textColor || 'red';
            var font = 'bold 30px Helvetica';
            var delay = 300;

            var gif = new GIF({
                workers: 2,
                quality: 10,
                width: 400,
                height: 400
            });

            ctx.fillStyle = bgColor;
            ctx.font = font;
            ctx.textAlign = 'center';
            ctx.fillRect(0, 0, w, h);

            var text = options.text || 'hello world';
            var splitArray = text.split(' ');

            for (var i = 0, l = splitArray.length; i < l; i++) {
                ctx.fillStyle = textColor;
                ctx.fillText(splitArray[i], x, y);
                gif.addFrame(ctx, { copy: true, delay: delay });

                ctx.fillStyle = bgColor;
                ctx.fillRect(0, 0, w, h);
                gif.addFrame(ctx, { copy: true, delay: delay });
            }

            gif.on('finished', function (blob) {
                window.open(URL.createObjectURL(blob));
            });

            gif.render();
        }
    };

    var canvas = document.getElementById('canvas');
    slate.render(canvas, { element: '.result', text: 'There is another world out' });

    // let context = canvas.getContext('2d');
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
    // context.fillRect(0, 0, 150, 150)
    // context.fillText("Hello", 75, 75)

    // gif.addFrame(context, {copy: true, delay: 200});
    // // // or copy the pixels from a canvas context
    // // gif.addFrame(ctx, {copy: true});

    // gif.on('finished', function(blob) {
    //   window.open(URL.createObjectURL(blob));
    // });

    // gif.render();

}));