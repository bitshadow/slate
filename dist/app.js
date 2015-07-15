(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('config/share')) :
    typeof define === 'function' && define.amd ? define(['config/share'], factory) :
    factory(global.config)
}(this, function (config) { 'use strict';

    var colors = ['#B7D438', '#1C747F', '#4B687C', '#5CB932', '#EF7409', '#F3D063', '#31B98E', '#6AA398', '#D55A29', '#B32B54', '#FBB30D', '#621239', '#315873', '#C12E01', '#671C41', '#22A1FF', '#621239', '#6CC08E', '#3B8187', '#D3192F', '#80A000', '#F48200', '#000C3B', '#3B8187', '#BE1E2D', '#1A2728', '#5F8964', '#EA5F61', '#BA4938', '#185546', '#4667B2', '#74A187', '#F10043', '#EEA623', '#3B5C79'];

    var quotes = ['The Shortest Answer Is Doing The Thing.', 'Don\'t Just Be Good To Others. Be Good To Yourself To.', 'Its Ok To Be Happy With A Calm Life', 'Stay True In Dark And Humble In Spotlight.', 'I DONT WANT PERFECT I WANT HONEST', 'Hard Days Are The Best Because That\'s When Champions Are Made', 'KEEP KALM AND LET IT GO', 'Weather You Think You Can Our You Can\'t You\'re Right', 'You know What\'s One Wrong Thing We Do When We Fall In Love?   WE EXPECT ☹ ', 'NOT TO SPOIL THE ENDING FOR YOU, BUT EVERYTHING IS GOING TO BE    OK ', 'TRUST ME YOU CAN DANCE    -VODKA'];

    var SlateModel___createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    function SlateModel___classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function SlateModel___inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

    var SlateModel___Backbone = Backbone;
    var Model = SlateModel___Backbone.Model;

    var SlateModel___default = (function (_Model) {
        var _class = function _default() {
            SlateModel___classCallCheck(this, _class);

            if (_Model != null) {
                _Model.apply(this, arguments);
            }
        };

        SlateModel___inherits(_class, _Model);

        SlateModel___createClass(_class, [{
            key: 'defaults',
            value: function defaults() {
                var bgColor = colors[Math.floor(Math.random() * colors.length)];
                var quote = quotes[Math.floor(Math.random() * quotes.length)];
                return {
                    bgColor: bgColor,
                    textColor: '#fff',
                    family: 'Georgia',
                    text: quote,
                    width: 360,
                    height: 400,
                    fontHeight: 35,
                    delay: 300
                };
            }
        }]);

        return _class;
    })(Model);

    var SlateModel = SlateModel___default;;

    var fonts = ['Andale Mono', 'Arial Black', 'Arial Narrow', 'Arial Rounded MT Bold', 'Arial', 'Avant Garde', 'Baskerville', 'Big Caslon', 'Bodoni MT', 'Book Antiqua', 'Brush Script MT', 'Calibri', 'Calisto MT', 'Cambria', 'Candara', 'Century Gothic', 'Consolas', 'Copperplate', 'Courier New', 'Didot', 'Franklin Gothic Medium', 'Futura', 'Garamond', 'Geneva', 'Georgia', 'Gill Sans', 'Goudy Old Style', 'Helvetica', 'Hoefler Text', 'Impact', 'Lucida Bright', 'Lucida Console', 'Lucida Grande', 'Lucida Sans Typewriter', 'Monaco', 'Optima', 'Palatino', 'Papyrus', 'Perpetua', 'Rockwell Extra Bold', 'Rockwell', 'Segoe UI', 'Tahoma', 'Times New Roman', 'Trebuchet MS', 'Verdana'];

    function Detector() {
        // a font will be compared against all the three default fonts.
        // and if it doesn't match all 3 then that font is not available.
        var baseFonts = ['monospace', 'sans-serif', 'serif'];

        //we use m or w because these two characters take up the maximum width.
        // And we use a LLi so that the same matching fonts can get separated
        var testString = 'mmmmmmmmmmlli';

        //we test using 72px font size, we may use any size. I guess larger the better.
        var testSize = '72px';

        var h = document.getElementsByTagName('body')[0];

        // create a SPAN in the document to get the width of the text we use to test
        var s = document.createElement('span');
        s.style.fontSize = testSize;
        s.innerHTML = testString;
        var defaultWidth = {};
        var defaultHeight = {};
        for (var index in baseFonts) {
            //get the default width for the three base fonts
            s.style.fontFamily = baseFonts[index];
            h.appendChild(s);
            //width for the default font
            defaultWidth[baseFonts[index]] = s.offsetWidth;
            //height for the defualt font
            defaultHeight[baseFonts[index]] = s.offsetHeight;
            h.removeChild(s);
        }

        var detect = function (font) {
            var detected = false;
            for (var index in baseFonts) {
                // name of the font along with the base font for fallback.
                s.style.fontFamily = font + ',' + baseFonts[index];
                h.appendChild(s);
                var matched = s.offsetWidth != defaultWidth[baseFonts[index]] || s.offsetHeight != defaultHeight[baseFonts[index]];
                h.removeChild(s);
                detected = detected || matched;
            }
            return detected;
        };

        this.detect = detect;
    };

    var d = new Detector();
    var supportedFonts = [];
    fonts.forEach(function (font) {
        if (d.detect(font)) {
            supportedFonts.push(font);
        }
    });

    var modules_fonts = supportedFonts;

    var SlateConfigView___createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    var SlateConfigView___get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return SlateConfigView__get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

    function SlateConfigView___classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function SlateConfigView___inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

    var SlateConfigView___Backbone = Backbone;
    var SlateConfigView__View = SlateConfigView___Backbone.View;

    var SlateConfigView___default = (function (_View) {
        var _class = function _default(options) {
            SlateConfigView___classCallCheck(this, _class);

            _.defaults(options, {
                events: {
                    'change .text-color': '_updateModel',
                    'change .bg-color': '_updateModel',
                    'keyup .text': 'setText',
                    'change .family': '_updateModel',
                    'keyup .delay': '_updateModel',
                    'keyup .font-height': '_updateModel',
                    'keydown .delay': '_updateInput',
                    'keydown .font-height': '_updateInput'
                }
            });

            SlateConfigView___get(Object.getPrototypeOf(_class.prototype), 'constructor', this).call(this, options);
            this.fonts = modules_fonts;
            this.template = _.template($('script.slate-config').html());
        };

        SlateConfigView___inherits(_class, _View);

        SlateConfigView___createClass(_class, [{
            key: 'initialize',
            value: function initialize() {
                this._setDebouncedText = _.debounce(_.bind(this.setDebouncedText, this), 300);
            }
        }, {
            key: 'render',
            value: function render() {
                this.$el.append(this.template({
                    model: this.model.attributes
                }));
                this.postRender();
            }
        }, {
            key: 'postRender',
            value: function postRender() {
                var _this = this;

                var select = this.$('.family');

                var str = '';
                this.fonts.forEach(function (font) {
                    var selected = font.name === _this.model.get('family') ? 'selected' : '';
                    str += '<option val="' + font + '"' + selected + '>' + font + '</option>';
                });

                select.append(str);

                var keys = ['bgColor', 'textColor', 'text'];
                keys.forEach(function (key) {
                    _this.$('[name="' + key + '"]').val(_this.model.get(key));
                });
            }
        }, {
            key: 'setDebouncedText',
            value: function setDebouncedText(text) {
                this.model.set({
                    text: text
                });
            }
        }, {
            key: 'setText',
            value: function setText(e) {
                var text = $(e.target).val();
                this._setDebouncedText(text);
            }
        }, {
            key: '_updateInput',
            value: function _updateInput(ev) {
                if (ev.keyCode != 38 && ev.keyCode != 40) return;

                var target = $(ev.currentTarget),
                    val = parseInt(target.val()),
                    increment = ev.keyCode == 38 ? 1 : -1,
                    multiply = ev.shiftKey ? 10 : 1,
                    newVal = val + increment * multiply;

                if (newVal < 0) newVal = 0;

                target.val(newVal);
            }
        }, {
            key: '_updateModel',
            value: function _updateModel(ev) {
                var target = $(ev.currentTarget),
                    val = target.val(),
                    attr = undefined;

                attr = target.attr('name');

                if (attr === 'fontHeight' || attr === 'delay') val = parseInt(val, 10);
                if (attr === 'textColor' || attr === 'bgColor') val = '#' + val;

                this.model.set(attr, val);
            }
        }, {
            key: 'setAttributes',
            value: function setAttributes(e) {
                var text = $('[name="text"]').val();
                this.model.set({
                    text: text
                });
            }
        }]);

        return _class;
    })(SlateConfigView__View);

    var SlateConfigView = SlateConfigView___default;

    var slate = {
        setFont: function (ctx) {
            var fontSize = this.fontHeight * this.scale + 'px';
            ctx.font = fontSize + '/' + fontSize + ' ' + this.family;
        },

        createDummy: function () {
            var dummy = document.createElement('canvas');
            dummy.width = this.width * this.scale;
            dummy.height = this.height * this.scale;

            return dummy.getContext('2d');
        },

        drawBackground: function (ctx) {
            var w = ctx.canvas.width;
            var h = ctx.canvas.height;

            ctx.fillStyle = this.bgColor;
            ctx.fillRect(0, 0, w, h);
        },

        drawText: function (ctx, text) {
            var mw = ctx.canvas.width / 2;
            var mh = ctx.canvas.height / 2;

            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = this.textColor;
            ctx.fillText(text, mw, mh);
        },

        drawDummy: function (ctx, dummy) {
            var w = ctx.canvas.width;
            var h = ctx.canvas.height;

            ctx.drawImage(dummy.canvas, 0, 0, w, h);
        },

        getCanvas: function (options) {
            var canvas = document.createElement('canvas');
            canvas.width = this.width;
            canvas.height = this.height;

            return canvas;
        },

        setProperties: function (options) {
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

        renderGif: function (element) {
            var _this = this;
            var ctx = _this.getCanvas().getContext('2d');
            var dummy = _this.createDummy();
            var gif = _this.getGifCreator(element);

            _this.setFont(dummy);

            var words = this.text.split(' ');
            for (var i = 0, l = words.length; i < l; i++) {
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

        getStyles: function (obj) {
            var str = '';

            for (var prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    str += prop + ':' + obj[prop] + ';';
                }
            }

            return str;
        },

        getSVG: function (dummy) {
            var outer = {
                display: 'table-cell',
                width: dummy.canvas.width + 'px',
                height: dummy.canvas.height + 'px',
                color: this.textColor,
                'font-size': this.fontHeight * this.scale + 'px',
                'font-family': this.family,
                'vertical-align': 'middle'
            };

            var width = dummy.canvas.width - 20;
            var inner = {
                margin: '0 auto',
                width: width + 'px',
                'word-wrap': 'break-word'
            };

            var data = 'data:image/svg+xml,' + '<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'720\' height=\'800\'>' + '<foreignObject width=\'100%\' height=\'100%\'>' + '<div xmlns=\'http://www.w3.org/1999/xhtml\' style=\'' + this.getStyles(outer) + '\'>' + '<div align=\'center\' style=\'' + this.getStyles(inner) + '\'>' + this.text.trim() + '</div>' + '</div>' + '</foreignObject>' + '</svg>';

            return data;
        },

        renderImage: function (element) {
            var _this = this;
            var ctx = _this.getCanvas().getContext('2d');
            var dummy = _this.createDummy();
            var gif = _this.getGifCreator(element);

            var DOMURL = window.URL || window.webkitURL || window;
            var img = new Image();
            // var svg = new Blob([data], {type: 'image/svg+xml;charset=utf-8'});
            // var url = DOMURL.createObjectURL(svg);

            img.onload = function () {
                _this.drawBackground(dummy);
                // _this.drawText(dummy, 'Hello world there is awesome thing to be learned');
                dummy.drawImage(img, 0, 0);
                _this.drawDummy(ctx, dummy);
                gif.addFrame(ctx, {
                    delay: 0
                });

                gif.render();
            };

            img.src = this.getSVG(dummy);
        },

        render: function (element) {
            if (this.delay > 0) {
                this.renderGif(element);
            } else {
                this.renderImage(element);
            }
        },

        getGifCreator: function (callback) {
            var _this = this;
            var gif = new GIF({
                workers: 2,
                quality: 10,
                width: _this.width,
                height: _this.height
            });

            gif.on('finished', function (blob, data) {
                var obj = btoa(String.fromCharCode.apply(null, data));
                callback(null, obj);
            });

            return gif;
        }
    };

    var SlateView___createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    var SlateView___get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return SlateView__get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

    function SlateView___classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function SlateView___inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

    var SlateView___Backbone = Backbone;
    var SlateView__View = SlateView___Backbone.View;

    var SlateView___default = (function (_View) {
        var _class = function _default(options) {
            SlateView___classCallCheck(this, _class);

            SlateView___get(Object.getPrototypeOf(_class.prototype), 'constructor', this).call(this, options);

            this.listenTo(this.model, 'change', this.render);
        };

        SlateView___inherits(_class, _View);

        SlateView___createClass(_class, [{
            key: 'render',
            value: function render() {
                slate.setProperties(this.model.toJSON());
                slate.render(function (err, data) {
                    var element = $('#result');
                    element.removeClass('hide');
                    element.attr('src', 'data:image/gif;base64,' + data);
                    localStorage.dataBase64 = data;
                });
            }
        }]);

        return _class;
    })(SlateView__View);

    var SlateView = SlateView___default;

    var ShareView___createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    var ShareView___get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return ShareView__get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

    function ShareView___classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function ShareView___inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

    var ShareView___Backbone = Backbone;
    var ShareView__View = ShareView___Backbone.View;

    var ShareView___default = (function (_View) {
        var _class = function _default(options) {
            ShareView___classCallCheck(this, _class);

            _.defaults(options, {
                events: {
                    'click .get-url': 'upload'
                }
            });

            ShareView___get(Object.getPrototypeOf(_class.prototype), 'constructor', this).call(this, options);

            var _this = this;
            _this.listenTo(_this.model, 'change', function () {
                if (_this.model.hasChanged('url')) {
                    _this.render();
                } else {
                    _this.render();
                    _this.hideLoading();
                    _this.model.unset('url');
                }
            });

            _this.template = _.template($('script.share-template').html());
        };

        ShareView___inherits(_class, _View);

        ShareView___createClass(_class, [{
            key: 'postRender',
            value: function postRender() {
                var url = this.model.get('url');
                if (url) {
                    this.$('.url').get(0).select();
                    this.$('.url-btn').addClass('hide');
                    this.showShare(url);
                }

                this.hideLoading();
            }
        }, {
            key: 'render',
            value: function render() {
                var $sharer = this.$('.sharer');
                var obj = {
                    model: this.model.attributes
                };

                $sharer.html('');
                $sharer.html(this.template(obj));
                this.postRender();
            }
        }, {
            key: 'showShare',
            value: function showShare(url) {
                this.$('.share-btn').hideshare({
                    link: url,
                    media: url + '.gif',
                    position: 'right',
                    linkedin: false,
                    title: 'Created with Slate. http://bitshadow.github.io/slate'
                });
            }
        }, {
            key: 'showLoading',
            value: function showLoading() {
                $('.spinner').removeClass('hide');
                this.$('.url-btn').addClass('hide');
            }
        }, {
            key: 'hideLoading',
            value: function hideLoading() {
                $('.spinner').addClass('hide');
            }
        }, {
            key: 'upload',
            value: function upload() {
                this.showLoading();
                var _this = this;
                var auth = 'Client-ID ' + 'f0972432933fc36';
                $.ajax({
                    url: 'https://api.imgur.com/3/image',
                    type: 'POST',
                    headers: {
                        Authorization: auth,
                        Accept: 'application/json'
                    },
                    data: {
                        image: localStorage.dataBase64,
                        type: 'base64'
                    },
                    success: function (result) {
                        var id = result.data.id;
                        _this.model.set('url', 'http://imgur.com/' + id);
                        console.log('image upload with this id', id);
                    },
                    error: function (e) {
                        console.log(e);
                    }
                });
            }
        }]);

        return _class;
    })(ShareView__View);

    var ShareView = ShareView___default;

    var app___createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    var app___get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return app__get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

    function app___classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function app___inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

    var app___Backbone = Backbone;
    var app__View = app___Backbone.View;

    var SlateApp = (function (_View) {
        function SlateApp(options) {
            app___classCallCheck(this, SlateApp);

            app___get(Object.getPrototypeOf(SlateApp.prototype), 'constructor', this).call(this, options);
            var model = new SlateModel();
            this.slateConfigView = new SlateConfigView({
                model: model,
                el: $('.slate__config')
            });

            this.slateView = new SlateView({
                model: model,
                el: $('.slate__preview')
            });

            this.shareView = new ShareView({
                model: model,
                el: $('.share-box')
            });
        }

        app___inherits(SlateApp, _View);

        app___createClass(SlateApp, [{
            key: 'render',
            value: function render() {
                this.slateConfigView.render();
                this.slateView.render();
            }
        }]);

        return SlateApp;
    })(app__View);

    new SlateApp().render();

}));