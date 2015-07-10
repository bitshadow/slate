export default {
    setFont(ctx) {
            var fontSize = (this.fontHeight * this.scale) + 'px';
            ctx.font = fontSize + '/' + fontSize + ' ' + this.family;
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
            this.delay = options.delay || 0;
            this.fontHeight = options.fontHeight || 0;
            this.family = options.family || 'Georgia, serif';
            this.scale = 2;
        },

        renderGif(element) {
            let _this = this;
            let ctx = _this.getCanvas().getContext('2d');
            let dummy = _this.createDummy();
            let gif = _this.getGifCreator(element);

            _this.setFont(dummy);

            var words = this.text.split(' ');
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
                delay: 2 * _this.delay
            });

            gif.render();
        },

        getStyles(obj) {
            let str = '';

            for (let prop in obj) {
                if(obj.hasOwnProperty(prop)) {
                    str += prop + ':' + obj[prop] + ';';
                }
            }

            return str;
        },

        getSVG(dummy) {
            let outer = {
                display: 'table-cell',
                width: dummy.canvas.width + 'px',
                height: dummy.canvas.height + 'px',
                color: this.textColor,
                'font-size': (this.fontHeight * this.scale) + 'px',
                'font-family': this.family,
                'vertical-align': 'middle'
            };

            let width = (dummy.canvas.width) - 20;
            let inner = {
                margin: '0 auto',
                width: width + 'px',
                'word-wrap': 'break-word'
            };

            let data = "data:image/svg+xml," +
                "<svg xmlns='http://www.w3.org/2000/svg' width='720' height='800'>" +
                "<foreignObject width='100%' height='100%'>" +
                "<div xmlns='http://www.w3.org/1999/xhtml' style='" + this.getStyles(outer) + "'>" +
                    "<div align='center' style='"+ this.getStyles(inner) + "'>" + this.text.trim() +"</div>" +
                "</div>" +
                "</foreignObject>" +
                "</svg>";

            return data;
        },

        renderImage(element) {
            let _this = this;
            let ctx = _this.getCanvas().getContext('2d');
            let dummy = _this.createDummy();
            let gif = _this.getGifCreator(element);

            var DOMURL = window.URL || window.webkitURL || window;
            var img = new Image();
            // var svg = new Blob([data], {type: 'image/svg+xml;charset=utf-8'});
            // var url = DOMURL.createObjectURL(svg);

            img.onload = function() {
                _this.drawBackground(dummy);
                // _this.drawText(dummy, 'Hello world there is awesome thing to be learned');
                dummy.drawImage(img, 0, 0);
                _this.drawDummy(ctx, dummy);
                gif.addFrame(ctx, {
                    delay: 0
                });

                gif.render();
            }

            img.src = this.getSVG(dummy);
        },

        render(element) {
            if (this.delay > 0) {
                this.renderGif(element);
            } else {
                this.renderImage(element);
            }

        },

        getGifCreator(callback) {
            let _this = this;
            let gif = new GIF({
                workers: 2,
                quality: 10,
                width: _this.width,
                height: _this.height
            });

            gif.on('finished', (blob, data) => {
                let obj = btoa(String.fromCharCode.apply(null, data));
                callback(null, obj);
            });

            return gif;
        }
}
