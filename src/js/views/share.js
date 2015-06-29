import slate from '../modules/slate';
import config from '../config/share';

let {
    View
} = Backbone;

// this is small template so we can use it here.
var shareTemplate = ' \
    <input class="url" value="<%= url %>"></input> \
    <div class="share-btn">Share Me</div> \
';

export default class extends View {
    constructor(options) {
        _.defaults(options, {
            events: {
                'click .get-url': 'upload'
            }
        });

        super(options);

        var _this = this;
        _this.listenTo(_this.model, 'change', function() {
            if (this.model.hasChanged('url')) {
                _this.render();
            } else {
                $('.url-btn').removeClass('hide');
                _this.$('.sharer').html('');
            }
        });

        _this.template = _.template(shareTemplate);
    }

    postRender() {
        this.$('.url').get(0).select();
        this.showShare()
    }

    render() {
        this.$('.sharer').html('');
        this.$('.sharer').html(this.template(this.model.attributes));
        this.postRender();
        this.hideLoading();
    }

    showShare() {
        this.$('.share-btn').hideshare({
            link: "http://natearnold.me/hideshare/example",
            media: "http://farm7.staticflickr.com/6213/6243090894_8b8dd862cd.jpg",
            position: "bottom",
            linkedin: false
        });

        // config.url = 'https//www.google.com';
        // config.protocol = 'https';
        // var share = new Share(".share-button", config);
    }

    showLoading() {

    }

    hideLoading() {

    }

    showLoading() {
        $('.spinner').removeClass('hide');
        $('.url-btn').addClass('hide');
    }

    hideLoading() {
        $('.spinner').addClass('hide');
    }

    upload() {
        let auth = 'Client-ID ' + '657bcd07877548f';
        let _this = this;
        _this.showLoading();

        // $.ajax({
        //     url: 'https://api.imgur.com/3/image',
        //     type: 'POST',
        //     headers: {
        //         Authorization: auth,
        //         Accept: 'application/json'
        //     },
        //     data: {
        //         image: localStorage.dataBase64,
        //         type: 'base64'
        //     },
        //     success: function(result) {
        //         let id = result.data.id;
        //         _this.model.set('url', 'https://i.imgur.com/' + id);
        //         console.log('image upload with this id', id);
        //         // todo show box with sharing options
        //         // window.location = 'https://imgur.com/gallery/' + id;
        //     },
        //     error: function(e) {
        //         console.log(e);
        //     }
        // });
    }
}
