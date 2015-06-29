/*! hideshare - v0.1.0 - 2013-09-11
* https://github.com/arnonate/jQuery-FASS-Widget
* Copyright (c) 2013 Nate Arnold; Licensed MIT */
/* ========================================================================
 * HIDESHARE v1.0.0
 * https://github.com/arnonate/hideshare
 * ========================================================================

  Copyright (c) 2013 Nate Arnold

  Permission is hereby granted, free of charge, to any person
  obtaining a copy of this software and associated documentation
  files (the "Software"), to deal in the Software without
  restriction, including without limitation the rights to use,
  copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the
  Software is furnished to do so, subject to the following
  conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
  OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
  HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
  WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
  OTHER DEALINGS IN THE SOFTWARE.
 */

/*global jQuery:false, window:false, document:false */

;(function(window, $) {

  "use strict";

  // HIDESHARE PUBLIC CLASS DEFINITION
  // =================================

  var Hideshare = function (elem, options) {
    this.elem = elem;
    this.$elem = $(elem);
    this.options = options;
  };

  Hideshare.prototype = {
    defaults: {
      link: document.URL,
      title: document.title,
      description: '',
      media: null,
      facebook: true,
      twitter: true,
      pinterest: true,
      googleplus: true,
      linkedin: true,
      position: "bottom",
      speed: 100
    },

    init: function() {
      this.config = $.extend({}, this.defaults, this.options);
      this.wrapHideshare();
      return this;
    },

    wrapHideshare: function() {
      var output = output,
          width = this.$elem.outerWidth(),
          height = this.$elem.outerHeight(),
          liWidth = 0,
          placement = this.config.position,
          transition = this.config.speed,
          shareTitle = this.config.title,
          shareLink = this.config.link,
          shareMedia = this.config.media,
          shareDescription = this.config.description,
          facebookTemplate = '<li><a class="hideshare-facebook" href="#"><i class="fa fa-facebook-square fa-2x"></i><span>Facebook</span></a></li>',
          twitterTemplate = '<li><a class="hideshare-twitter" href="#"><i class="fa fa-twitter-square fa-2x"></i><span>Twitter</span></a></li>',
          pinterestTemplate = '<li><a class="hideshare-pinterest" href="#" data-pin-do="buttonPin" data-pin-config="above"><i class="fa fa-pinterest-square fa-2x"></i><span>Pinterest</span></a></li>',
          googleplusTemplate = '<li><a class="hideshare-google-plus" href="#"><i class="fa fa-google-plus-square fa-2x"></i><span>Google Plus</span></a></li>',
          linkedinTemplate = '<li><a class="hideshare-linkedin" href="#"><i class="fa fa-linkedin-square fa-2x"></i><span>Linked In</span></a></li>';

      if (this.config.facebook) {
        output = facebookTemplate;
        liWidth += 40;
      } else {
        output = "";
        liWidth = liWidth;
      }
      if (this.config.twitter) {
        output += twitterTemplate;
        liWidth += 40;
      } else {
        output = output;
        liWidth = liWidth;
      }
      if (this.config.pinterest) {
        output += pinterestTemplate;
        liWidth += 40;
      } else {
        output = output;
        liWidth = liWidth;
      }
      if (this.config.googleplus) {
        output += googleplusTemplate;
        liWidth += 40;
      } else {
        output = output;
        liWidth = liWidth;
      }
      if (this.config.linkedin) {
        output += linkedinTemplate;
        liWidth += 40;
      } else {
        output = output;
        liWidth = liWidth;
      }
      if (liWidth < width) {
        liWidth = width;
      }

      // Construct sharing list
      var hideshareList = '<ul class="hideshare-list" style="display: none; width: ' + liWidth + 'px' + '">' + output + '</ul>';

      // Wrap button
      this.$elem.addClass("hideshare-btn").wrap("<div class='hideshare-wrap' style='width:" + width + "px; height:" + height + "px;' />");
      this.$wrap = this.$elem.parent();

      // Insert sharing button list
      $(hideshareList).insertAfter(this.$elem);

      // Get placement of share buttons
      var getPlacement = function(placement, width, height, speed, $wrap) {

        var styles = {};

        if (placement === "right") {
          styles = {
            "left"    : width + 10 + "px",
            "right"   : -(width + 10) + "px",
            "opacity" : "toggle"
          };
        } else if (placement === "left") {
          styles = {
            "left"    : -(width + 10) + "px",
            "right"   : width + 10 + "px",
            "opacity" : "toggle"
          };
        } else if (placement === "top") {
          styles = {
            "top"     : -(height + 10) + "px",
            "bottom"  : height + 10 + "px",
            "opacity" : "toggle"
          };
        } else /* placement === "bottom" */ {
          styles = {
            "top"     : height + 10 + "px",
            "bottom"  : -(height + 10) + "px",
            "left"    : "0px",
            "opacity" : "toggle"
          };
        }

        $wrap.find(".hideshare-list").animate(styles, speed).addClass("shown");
      };

      // Return to original position
      var returnPlacement = function(speed, $wrap) {
        var styles = {
          "top"     : "0px",
          "left"    : "0px",
          "opacity" : "toggle"
        };

        $wrap.find(".hideshare-list").animate(styles, speed).removeClass("shown");
      };

      // Toggle sharing on button click
      this.$elem.click(function(e) {
        var $wrap = $(e.currentTarget).parent();
        var list = $wrap.find(".hideshare-list");
        if (list.hasClass("shown")){
          returnPlacement(transition, $wrap);
        } else {
          getPlacement(placement, width, height, transition, $wrap);
        }
        return false;
      });


      // SHARING FUNCTIONS
      var shareFacebook = function() {
        window.open('//www.facebook.com/share.php?m2w&s=100&p[url]=' + encodeURIComponent(shareLink) + '&p[images][0]=' + encodeURIComponent(shareMedia) + '&p[title]=' + encodeURIComponent(shareTitle) + '&p[summary]=' + encodeURIComponent(shareDescription),'Facebook','menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
      };
      var shareTwitter = function() {
        window.open('https://twitter.com/intent/tweet?original_referer=' + encodeURIComponent(shareLink) + '&text=' + encodeURIComponent(shareTitle) + '%20' + encodeURIComponent(shareLink),'Twitter','menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
      };
      var sharePinterest = function() {
        window.open('//pinterest.com/pin/create/button/?url=' + encodeURIComponent(shareLink) + '&media=' + encodeURIComponent(shareMedia) + '&description=' + encodeURIComponent(shareTitle),'Pinterest','menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
      };
      var shareGooglePlus = function() {
        window.open('//plus.google.com/share?url=' + encodeURIComponent(shareLink),'GooglePlus','menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
      };
      var shareLinkedIn = function() {
        window.open('//www.linkedin.com/shareArticle?mini=true&url=' + encodeURIComponent(shareLink) + '&title=' + encodeURIComponent(shareTitle) + '&source=' + encodeURIComponent(shareLink),'LinkedIn','menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');
      };


      this.$wrap.find(".hideshare-facebook").click(function() {
        shareFacebook();
        return false;
      });

      this.$wrap.find(".hideshare-twitter").click(function() {
        shareTwitter();
        return false;
      });

      this.$wrap.find(".hideshare-pinterest").click(function() {
        sharePinterest();
        return false;
      });

      this.$wrap.find(".hideshare-google-plus").click(function() {
        shareGooglePlus();
        return false;
      });

      this.$wrap.find(".hideshare-linkedin").click(function() {
        shareLinkedIn();
        return false;
      });

    }
  };

  Hideshare.defaults = Hideshare.prototype.defaults;

  $.fn.hideshare = function(options) {
    return this.each(function() {
      new Hideshare(this, options).init();
    });
  };

  window.Hideshare = Hideshare;

})(window, jQuery);