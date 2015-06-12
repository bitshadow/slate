export default {
    render(canvas, options = { element, bgColor, textColor, font, delay }) {
        let ctx = canvas.getContext('2d');
        let w = canvas.width;
        let h = canvas.height;
        let x = w / 2;
        let y = h / 2;
        let bgColor = bgColor || '#018790';
        let textColor = textColor || '#fff';
        let font = font || '100 30px/30px "Times New Roman", Times, serif';
        let delay = delay || 200;
        let fontHeight = 30;

        let gif = new GIF({
          workers: 2,
          quality: 10,
          width: 400,
          height: 400
        });

        ctx.fillStyle = bgColor;
        ctx.font = font;
        ctx.textAlign = 'center';
        ctx.fillRect(0, 0, w, h);

        let text = options.text || 'hello world';
        let splitArray = text.split(' ');

        let scale = 2;
        let ocanvas = document.createElement('canvas');
        let octx = ocanvas.getContext('2d');
        let ow = w * scale;
        let oh = h * scale;
        ocanvas.width = ow;
        ocanvas.height = oh;
        octx.font = (fontHeight * scale) + "px Times New Roman, Times, serif";

        octx.textAlign = 'center';
        gif.addFrame(ctx, {copy: true, delay: delay});

        for (let i = 0, l = splitArray.length; i < l; i++) {
            octx.fillStyle = bgColor;
            octx.fillRect(0, 0, ow, oh);
            octx.fillStyle = textColor;
            octx.fillText(splitArray[i], ow / 2, oh / 2);

            ctx.drawImage(ocanvas, 0, 0, w, h);
            gif.addFrame(ctx, {copy: true, delay: delay});

            octx.fillStyle = bgColor;
            octx.fillRect(0, 0, ow, oh);

            ctx.drawImage(ocanvas, 0, 0, w, h);
            gif.addFrame(ctx, {copy: true, delay: delay});
        }

        gif.on('finished', function(blob) {
            window.open(URL.createObjectURL(blob));
        });

        gif.render()
    }
}