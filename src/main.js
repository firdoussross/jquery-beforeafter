/**
 * Copyright 2015 Firdouss Ross and other contributors
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

(function ($) {
    $.fn.beforeafter = function (options) {
        var settings = $.extend({
            touch: true,
            message: "Slide",
            hide_message: true,
            reset: true,
            reset_delay: 3000,
            drag_horizontal: true,
            split_horizontal: true
        }, options);

        this.each(function () {
            var container = $(this),
                imgobj = container.find('img'),
                aftersrc = imgobj.data('aftersrc'),
                container_width = container.width(),
                container_height = 0;

            imgobj.after('<div class="g-img-after"><img style="width: ' + container_width + 'px;" src="' + aftersrc + '"></div>');
            imgobj.addClass('g-img-before').width(container_width);

            container.append('<div class="g-img-divider"><span>' + settings.message + '</span></div>');

            container_height = container.height();

            if (!settings.split_horizontal) {
                container.addClass('g-vertical');
            }

            /**
                Events
            **/
            container
                .on('mouseenter touchstart', function (e) {
                    var timer = container.data('reset-timer');

                    if (timer) {
                        window.clearTimeout(timer);
                        container.data('reset-timer', false);
                    }
                })
                // end on mouseenter
                .on('mousemove touchmove', function (e) {
                    var mouse_position = 0,
                        percentage = 0,
                        message_obj = container.find('.g-img-divider span');

                    if (!settings.drag_horizontal) {
                        var screen_pos = container.offset().top - $(window).scrollTop();
                        mouse_position = e.clientY / screen_pos;
                        percentage = (e.clientY - screen_pos) / container_height * 100;
                    } else {
                        mouse_position = e.pageX - container.offset().left;
                        percentage = (mouse_position / container_width) * 100;
                    }

                    if (settings.touch && typeof (e.originalEvent.touches) !== 'undefined') {
                        var touch = e.originalEvent.touches[0];

                        if (!settings.drag_horizontal) {
                            percentage = ((touch.pageY - container.offset().top) / container_height) * 100;
                        } else {
                            percentage = ((touch.pageX - container.offset().left) / container_width) * 100;
                        }
                    }

                    if (settings.split_horizontal) {
                        container.find('.g-img-after').css("left", percentage + "%");
                        container.find('.g-img-divider').css("left", percentage + "%");
                    } else {
                        container.find('.g-img-after').css("top", percentage + "%");
                        container.find('.g-img-divider').css("top", percentage + "%");
                    }

                    if (settings.hide_message && message_obj.is(':visible')) {
                        message_obj.fadeOut();
                    }
                })
                // end on mousemove
                .on('mouseleave touchend touchcancel', function (e) {
                    var timer = container.data('reset-timer'),
                        message_obj = container.find('.g-img-divider span');

                    if (settings.reset) {
                        if (!timer) {
                            timer = window.setTimeout(function () {
                                if (settings.split_horizontal) {
                                    container.find('.g-img-after').animate({
                                        left: "50%"
                                    }, 500);
                                    container.find('.g-img-divider').animate({
                                        left: "50%"
                                    }, 500, function () {
                                        message_obj.fadeIn();
                                    });
                                } else {
                                    container.find('.g-img-after').animate({
                                        top: "50%"
                                    }, 500);
                                    container.find('.g-img-divider').animate({
                                        top: "50%"
                                    }, 500, function () {
                                        message_obj.fadeIn();
                                    });
                                }

                                container.data('reset-timer', false);

                            }, settings.reset_delay);

                            container.data('reset-timer', timer);
                        }
                    }
                });
                // end on mouseleave
        });

        return this;
    };
} (jQuery));
