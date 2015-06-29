export default {
    setFont(ctx) {
            var fontSize = (this.fontHeight * this.scale) + 'px';
            ctx.font = fontSize + '/' + fontSize + ' ' + this.font;
        },

        createDummy() {
            let dummy = document.createElement('canvas');
            dummy.width = this.width * this.scale;
            dummy.height = this.height * this.scale;

            return dummy.getContext('2d');
        },

        drawBackground(ctx) {
            let w = ctx.canvas.width;
            let h = ctx.canvas.height;

            ctx.fillStyle = this.bgColor;
            ctx.fillRect(0, 0, w, h);
        },

        drawText(ctx, text) {
            let mw = ctx.canvas.width / 2;
            let mh = ctx.canvas.height / 2;

            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = this.textColor;
            ctx.fillText(text, mw, mh);
        },

        drawDummy(ctx, dummy) {
            let w = ctx.canvas.width;
            let h = ctx.canvas.height;

            ctx.drawImage(dummy.canvas, 0, 0, w, h);
        },

        getCanvas(options) {
            var canvas = document.createElement('canvas');
            canvas.width = this.width;
            canvas.height = this.height;

            return canvas;
        },

        setProperties(options) {
            this.bgColor = options.bgColor;
            this.height = options.height;
            this.width = options.width;
            this.text = options.text || '';
            this.textColor = options.textColor;
            this.delay = options.delay || 350;
            this.fontHeight = options.fontHeight || 40;
            this.font = options.font || 'Georgia, serif';
            this.scale = 2;
        },

        render(element) {
            let _this = this;
            let ctx = _this.getCanvas().getContext('2d');
            let dummy = _this.createDummy();
            let gif = _this.getGifCreator(element);

            _this.setFont(dummy);

            var words = this.text.trim().split(' ');
            for (let i = 0, l = words.length; i < l; i++) {
                _this.drawBackground(dummy);
                _this.drawText(dummy, words[i]);

                _this.drawDummy(ctx, dummy);
                gif.addFrame(ctx, {
                    copy: true,
                    delay: _this.delay
                });
            }

            _this.drawBackground(dummy);
            _this.drawDummy(ctx, dummy);
            gif.addFrame(ctx, {
                copy: true,
                delay: 2 * _this.delay
            });

            gif.render();
        },

        getGifCreator(callback) {
            let _this = this;
            let gif = new GIF({
                workers: 2,
                quality: 10,
                width: _this.width,
                height: _this.height
            });

            gif.on('finished', function(blob, data) {
                let obj = btoa(String.fromCharCode.apply(null, data));
                callback(null, obj);
            });

            return gif;
        }
}
