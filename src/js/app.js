import SlateModel from './models/slate.js';
import SlateConfigView from './views/slateConfig.js';
import SlateView from './views/slate.js';

class SlateApp {
  render() {
    let model = new SlateModel();
    new SlateConfigView({
        model: model,
        el: $('.slate__config')
    });
    new SlateView({
        model: model,
        el: $('.slate__preview')
    });
  }

  upload() {
    var auth = 'Client-ID ' + '657bcd07877548f';

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
        success: function(result) {
            var id = result.data.id;
            // todo show box with sharing options
            // window.location = 'https://imgur.com/gallery/' + id;
        },
        error: function(e) {
            console.log(e);
        }
    });
  }
}

(new SlateApp()).render()