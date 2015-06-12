export default {
    setFont(ctx, font, scale) {
        let height = 30;
        ctx.font = (height * scale) + "px " + font;
    },

    createDummy(canvas) {
        let dummy = document.createElement('canvas');
        let scale = 2;

        dummy.width = canvas.width * scale;
        dummy.height = canvas.height * scale;

        return dummy.getContext('2d');
    },

    clearBackground(ctx, color) {
        let w = ctx.canvas.width;
        let h = ctx.canvas.height;

        ctx.fillStyle = color;
        ctx.fillRect(0, 0, w, h);
    },

    drawText(ctx, color, text) {
        let mw = ctx.canvas.width / 2;
        let mh = ctx.canvas.height / 2;

        ctx.textAlign = 'center';
        ctx.fillStyle = color;
        ctx.fillText(text, mw, mh);
    },

    drawDummy(ctx, dummy) {
        let w = ctx.canvas.width;
        let h = ctx.canvas.height;

        ctx.drawImage(dummy.canvas, 0, 0, w, h);
    },

    render(canvas, options) {
        let ctx = canvas.getContext('2d');
        let dummy = this.createDummy(canvas);
        let w = canvas.width;
        let h = canvas.height;
        let bgColor = options.bgColor;
        let textColor = options.textColor;
        let gif = this.getGifCreator(canvas);
        let delay = 350;

        this.setFont(dummy, options.font, 2);

        var words = options.text.split(' ');
        for (let i = 0, l = words.length - 1; i < l; i++) {
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

    getGifCreator: function(canvas) {
        let gif = new GIF({
            workers: 2,
            quality: 10,
            width: canvas.width,
            height: canvas.height
        });

        gif.on('finished', function(blob) {
            window.open(URL.createObjectURL(blob));
        });

        return gif;
    }
}
