(function (factory) {
    !(typeof exports === 'object' && typeof module !== 'undefined') &&
    typeof define === 'function' && define.amd ? define(factory) :
    factory()
}(function () { 'use strict';

    var slate = {
        setFont: function (ctx, font, scale) {
            var height = 30;
            ctx.font = height * scale + 'px ' + font;
        },

        createDummy: function (canvas) {
            var dummy = document.createElement('canvas');
            var scale = 2;

            dummy.width = canvas.width * scale;
            dummy.height = canvas.height * scale;

            return dummy.getContext('2d');
        },

        clearBackground: function (ctx, color) {
            var w = ctx.canvas.width;
            var h = ctx.canvas.height;

            ctx.fillStyle = color;
            ctx.fillRect(0, 0, w, h);
        },

        drawText: function (ctx, color, text) {
            var mw = ctx.canvas.width / 2;
            var mh = ctx.canvas.height / 2;

            ctx.textAlign = 'center';
            ctx.fillStyle = color;
            ctx.fillText(text, mw, mh);
        },

        drawDummy: function (ctx, dummy) {
            var w = ctx.canvas.width;
            var h = ctx.canvas.height;

            ctx.drawImage(dummy.canvas, 0, 0, w, h);
        },

        render: function (canvas, options) {
            var ctx = canvas.getContext('2d');
            var dummy = this.createDummy(canvas);
            var w = canvas.width;
            var h = canvas.height;
            var bgColor = options.bgColor;
            var textColor = options.textColor;
            var gif = this.getGifCreator(canvas);
            var delay = 350;

            this.setFont(dummy, options.font, 2);

            var words = options.text.split(' ');
            for (var i = 0, l = words.length - 1; i < l; i++) {
                this.clearBackground(dummy, bgColor);
                this.drawText(dummy, textColor, words[i]);

                this.drawDummy(ctx, dummy);
                gif.addFrame(ctx, {
                    copy: true,
                    delay: delay
                });
            }

            this.clearBackground(dummy, bgColor);
            this.drawDummy(ctx, dummy);
            gif.addFrame(ctx, {
                copy: true,
                delay: delay
            });

            gif.render();
        },

        getGifCreator: function (canvas) {
            var gif = new GIF({
                workers: 2,
                quality: 10,
                width: canvas.width,
                height: canvas.height
            });

            gif.on('finished', function (blob) {
                window.open(URL.createObjectURL(blob));
            });

            return gif;
        }
    };

    var canvas = document.getElementById('canvas');
    slate.render(canvas, {
        element: '.result',
        text: 'There is another world out',
        bgColor: '#018790',
        textColor: '#fff',
        font: 'Roboto, Times New Roman, Times, serif'
    });

}));