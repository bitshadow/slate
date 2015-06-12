(function (factory) {
    !(typeof exports === 'object' && typeof module !== 'undefined') &&
    typeof define === 'function' && define.amd ? define(factory) :
    factory()
}(function () { 'use strict';

    var slate = {
        render: function (canvas) {
            var options = arguments[1] === undefined ? { element: element, bgColor: bgColor, textColor: textColor, font: font, delay: delay } : arguments[1];
            return (function () {
                var ctx = canvas.getContext('2d');
                var w = canvas.width;
                var h = canvas.height;
                var x = w / 2;
                var y = h / 2;
                var bgColor = bgColor || '#018790';
                var textColor = textColor || '#fff';
                var font = font || '100 30px/30px "Times New Roman", Times, serif';
                var delay = delay || 300;
                var fontHeight = 30;

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

                var scale = 2;
                var ocanvas = document.createElement('canvas');
                var octx = ocanvas.getContext('2d');
                var ow = w * scale;
                var oh = h * scale;
                ocanvas.width = ow;
                ocanvas.height = oh;
                octx.font = fontHeight * scale + 'px Times New Roman, Times, serif';

                octx.textAlign = 'center';
                gif.addFrame(ctx, { copy: true, delay: delay });

                for (var i = 0, l = splitArray.length; i < l; i++) {
                    octx.fillStyle = bgColor;
                    octx.fillRect(0, 0, ow, oh);
                    octx.fillStyle = textColor;
                    octx.fillText(splitArray[i], ow / 2, oh / 2);

                    ctx.drawImage(ocanvas, 0, 0, w, h);
                    gif.addFrame(ctx, { copy: true, delay: delay });

                    octx.fillStyle = bgColor;
                    octx.fillRect(0, 0, ow, oh);

                    ctx.drawImage(ocanvas, 0, 0, w, h);
                    gif.addFrame(ctx, { copy: true, delay: delay });
                }

                gif.on('finished', function (blob) {
                    window.open(URL.createObjectURL(blob));
                });

                gif.render();
            })();
        }
    };

    var canvas = document.getElementById('canvas');
    slate.render(canvas, { element: '.result', text: 'There is another world out' });

}));