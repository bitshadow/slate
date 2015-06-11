export default {
    render(canvas, options = {}) {
        let ctx = canvas.getContext('2d');
        let w = canvas.width;
        let h = canvas.height;
        let x = canvas.width / 2;
        let y = canvas.height / 2;
        let bgColor = options.bgColor || 'yellow';
        let textColor = options.textColor || 'red';
        let font = 'bold 30px Helvetica';
        let delay = 300;

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

        var text = options.text || 'hello world';
        let splitArray = text.split(' ');


        for (let i = 0, l = splitArray.length; i < l; i++) {
            ctx.fillStyle = textColor;
            ctx.fillText(splitArray[i], x, y);
            gif.addFrame(ctx, {copy: true, delay: delay})

            ctx.fillStyle = bgColor;
            ctx.fillRect(0, 0, w, h);
            gif.addFrame(ctx, {copy: true, delay: delay})
        }

        gif.on('finished', function(blob) {
            window.open(URL.createObjectURL(blob));
        });

        gif.render()
    }
}