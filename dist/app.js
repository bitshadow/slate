(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('config/share')) :
    typeof define === 'function' && define.amd ? define(['config/share'], factory) :
    factory(global.config)
}(this, function (config) { 'use strict';

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
                return {
                    bgColor: '#018790',
                    textColor: '#fff',
                    font: 'Georgia, serif',
                    text: 'Generate your text here',
                    width: 400,
                    height: 400,
                    fontHeight: 50,
                    delay: 250
                };
            }
        }]);

        return _class;
    })(Model);

    var SlateModel = SlateModel___default;;

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
                    'change .text-color': 'setTextColor',
                    'change .bg-color': 'setBgColor',
                    'keyup .height': 'setFontHeight',
                    'keyup .text': 'setText',
                    'keyup .delay': 'setDelay'
                }
            });

            SlateConfigView___get(Object.getPrototypeOf(_class.prototype), 'constructor', this).call(this, options);
            this.$('.text-color').val(this.model.get('textColor'));
            this.$('.bg-color').val(this.model.get('bgColor'));
        };

        SlateConfigView___inherits(_class, _View);

        SlateConfigView___createClass(_class, [{
            key: 'initialize',
            value: function initialize() {
                this._setDebouncedText = _.debounce(_.bind(this.setDebouncedText, this), 300);
            }
        }, {
            key: 'setDebouncedText',
            value: function setDebouncedText(text) {
                this.model.set({ text: text });
            }
        }, {
            key: 'setDelay',
            value: function setDelay(e) {
                this.model.set({ delay: parseInt($(e.target).val(), 10) });
            }
        }, {
            key: 'setText',
            value: function setText(e) {
                var text = $(e.target).val();
                this._setDebouncedText(text);
            }
        }, {
            key: 'setFontHeight',
            value: function setFontHeight(e) {
                this.model.set({ fontHeight: parseInt($(e.target).val(), 10) });
            }
        }, {
            key: 'setTextColor',
            value: function setTextColor(e) {
                this.model.set({ textColor: '#' + $(e.target).val() });
            }
        }, {
            key: 'setBgColor',
            value: function setBgColor(e) {
                this.model.set({ bgColor: '#' + $(e.target).val() });
            }
        }, {
            key: 'setAttributes',
            value: function setAttributes(e) {
                var text = $('[name="text"]').val();
                this.model.set({ text: text });
            }
        }]);

        return _class;
    })(SlateConfigView__View);

    var SlateConfigView = SlateConfigView___default;

    var slate = {
        setFont: function (ctx) {
            var fontSize = this.fontHeight * this.scale + 'px';
            ctx.font = fontSize + '/' + fontSize + ' ' + this.font;
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
            this.delay = options.delay || 350;
            this.fontHeight = options.fontHeight || 40;
            this.font = options.font || 'Georgia, serif';
            this.scale = 2;
        },

        render: function (element) {
            var _this = this;
            var ctx = _this.getCanvas().getContext('2d');
            var dummy = _this.createDummy();
            var gif = _this.getGifCreator(element);

            _this.setFont(dummy);

            var words = this.text.trim().split(' ');
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
                copy: true,
                delay: 2 * _this.delay
            });

            gif.render();
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
                    var element = document.getElementById('result');
                    element.src = 'data:image/gif;base64,' + data;
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

    // this is small template so we can use it here.
    var shareTemplate = '     <a class="url-btn get-url" href="#">Get Url</a>     <% if (model.url) { %>          <input class="url" value="<%= model.url %>"></input>         <div class="share-btn">Share Me</div>     <% } %> ';

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
                if (this.model.hasChanged('url')) {
                    _this.render();
                } else {
                    _this.hideLoading();
                    _this.model.unset('url');
                }
            });

            _this.template = _.template(shareTemplate);
            _this.render();
        };

        ShareView___inherits(_class, _View);

        ShareView___createClass(_class, [{
            key: 'postRender',
            value: function postRender() {
                var url = this.model.get('url');
                if (url) {
                    this.$('.url').get(0).select();
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
                    position: 'bottom',
                    linkedin: false
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

                this.$('.url-btn').removeClass('hide');
            }
        }, {
            key: 'upload',
            value: function upload() {
                var auth = 'Client-ID ' + 'f0972432933fc36';
                var _this = this;

                this.showLoading();
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
                        _this.model.set('url', 'https://i.imgur.com/' + id + '.gif');
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