import slate from '../modules/slate';
import config from '../config/share';

let { View } = Backbone;

// this is small template so we can use it here.
let shareTemplate = ' \
    <a class="url-btn get-url" href="#">Get Url</a> \
    <% if (model.url) { %>  \
        <input class="url" value="<%= model.url + ".gif" %>"></input> \
        <div class="share-btn"><i class="fa fa-share-alt"></i></div> \
    <% } %> \
';

export default class extends View {
    constructor(options) {
        _.defaults(options, {
            events: {
                'click .get-url': 'upload'
            }
        });

        super(options);

        let _this = this;
        _this.listenTo(_this.model, 'change', () => {
            if (_this.model.hasChanged('url')) {
                _this.render();
            } else {
                _this.render();
                _this.hideLoading();
                _this.model.unset('url');
            }
        });

        _this.template = _.template(shareTemplate);
    }

    postRender() {
        let url = this.model.get('url');
        if (url) {
            this.$('.url').get(0).select();
            this.$('.url-btn').addClass('hide');
            this.showShare(url)
        }

        this.hideLoading();
    }

    render() {
        let $sharer = this.$('.sharer');
        let obj = {
            model: this.model.attributes
        };

        $sharer.html('');
        $sharer.html(this.template(obj));
        this.postRender();
    }

    showShare(url) {
        this.$('.share-btn').hideshare({
            link: url,
            media: url + '.gif',
            position: 'right',
            linkedin: false,
            title: this.model.get('text')
        });
    }

    showLoading() {
        $('.spinner').removeClass('hide');
        this.$('.url-btn').addClass('hide');
    }

    hideLoading() {
        $('.spinner').addClass('hide');
    }

    upload() {
        this.showLoading();
        let _this = this;
        let auth = 'Client-ID ' + 'f0972432933fc36';

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
            success(result) {
                let id = result.data.id;
                _this.model.set('url', 'http://imgur.com/' + id);
                console.log('image upload with this id', id);
            },
            error(e) {
                console.log(e);
            }
        });
    }
}
