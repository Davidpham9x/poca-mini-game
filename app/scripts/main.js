'use strict';
var pocaMiniGame = window.pocaMiniGame || {}; //global namespace for YOUR pocaMiniGame, Please change pocaMiniGame to your pocaMiniGame name

var isMobile = {
    isAndroid: function () {
        return navigator.userAgent.match(/Android/i);
    },
    isBlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    isiOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    isOpera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    isWindows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (isMobile.isAndroid() || isMobile.isBlackBerry() || isMobile.isiOS() || isMobile.isOpera() || isMobile.isWindows());
    }
};

(function($) {
    pocaMiniGame.Global = {
        init: function() { //initialization code goes here
            $.support.cors = true;
            this.initFormElements();
            this.initToogleMenuMobile();
            this.initHandlerWebsiteResize();
        },

        initFormElements: function() {
            $('input, textarea').placeholder(); //enable placeholder support for all browsers

            //Radio Wrapper
            $(".radio-wrapper .input-radio").each(function() {
                if ($(this).is(":checked")) {
                    $('.input-radio[name="' + $(this).attr('name') + '"]').parents(".radio-selected").removeClass("radio-selected");
                    $(this).parents('.radio-wrapper').addClass("radio-selected");
                }
            });

            $(document).on('change', ".radio-wrapper .input-radio", function() {

                $('input[name="' + $(this).attr('name') + '"]').each(function() {
                    if ($(this).not(':checked')) {
                        $(this).parent().removeClass("radio-selected");
                    }
                });

                if ($(this).is(":checked")) {
                    $(this).parents('.radio-wrapper').addClass("radio-selected");
                }
            });

            //Checkbox Wrapper
            $('.checkbox-wrapper .input-checkbox').each(function() {
                if ($(this).is(':checked')) {
                    $(this).parents('.checkbox-wrapper').addClass('checked');
                }
            });

            $(document).on('click', '.checkbox-wrapper .input-checkbox', function() {

                if ($(this).is(':checked')) {
                    $(this).parents('.checkbox-wrapper').addClass('checked');
                } else if ($(this).not(':checked')) {
                    $(this).parents('.checkbox-wrapper').removeClass('checked');
                }
            });

            //Select Wrapper
            $('.select-wrapper').each(function() {
                if ($(this).find('span').length <= 0) {
                    $(this).prepend('<span>' + $(this).find('select option:selected').text() + '</span>');
                }
            });

            $(document).on('change', '.select-wrapper select', function() {
                $(this).prev('span').replaceWith('<span>' + $(this).find('option:selected').text() + '</span>');
            });
        },

        initToogleMenuMobile: function () {
            var menuMobile = $('#toggle-menu-mobile'),
                contentMenuMobile = $('.nav-header');

                menuMobile.off('click').on('click', function (e) {
                    e.preventDefault();
                    if ( !$(this).hasClass('active') ) {
                        contentMenuMobile.slideDown();
                        $(this).addClass('active');
                    } else {
                        contentMenuMobile.slideUp();
                        $(this).removeClass('active');
                    }
                });
        },

        initHandlerWebsiteResize: function () {
            $( window ).resize(function() {
                window.width = $(window).width();
                /*console.log( window.width );*/
                if ( window.width <= 480 ) {/*console.log(2);*/
                    $(".ranking-content").mCustomScrollbar("destroy");
                    $(".history-content.type-list").mCustomScrollbar("destroy");
                } else {/*console.log(3);*/
                    $(".ranking-content").mCustomScrollbar();
                    $(".history-content.type-list").mCustomScrollbar();
                }

                /*if ( isMobile.any() ) {
                } else {
                }*/
            }).trigger('resize');
        }
    };
})(jQuery);

$(document).ready(function($) {
    pocaMiniGame.Global.init();
});