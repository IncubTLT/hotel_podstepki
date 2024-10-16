// Add/Remove Rooms For Booking Form Function
function shb_add_remove_rooms() {

    var i = '';
    var selectedVal = jQuery('#shb-room-selection').val();
    jQuery('.shb-rooms-wrapper').children().hide();

    for (i = 1; i <= selectedVal; i++) {
        jQuery('.shb-room-' + i).show();
    }

    jQuery('#shb-room-selection').change(function (e) {
        jQuery('.shb-rooms-wrapper div[class^="shb-room-"]').hide();
        e.preventDefault();
        var selectedVal = jQuery(this).val();

        if (selectedVal > 1) {
            for (i = 1; i <= selectedVal; i++) {
                jQuery('.shb-room-' + i).show();
            }
        }
        else {
            jQuery('div.shb-room-1').show();
        }
    });

}

function shb_email_validation(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

function shb_email_field_validation() {

    var sh_validation_error = false;

    jQuery('.shb-email-validation').each(function () {

        if (shb_email_validation(jQuery(this).val()) == false) {
            sh_validation_error = true;
        }

    });

    if (sh_validation_error == true) {
        return true;
    } else {
        return false;
    }

}

function shb_number_field_validation() {

    var sh_validation_error = false;

    jQuery('.shb-phone-validation').each(function () {

        if (!jQuery.isNumeric(jQuery(this).val())) {
            sh_validation_error = true;
        }

    });

    if (sh_validation_error == true) {
        return true;
    } else {
        return false;
    }

}

jQuery(document).ready(function ($) {

    shb_add_remove_rooms();

});

// Load prettyPhoto
function shb_prettyphoto() {

    jQuery("a[data-gal^='prettyPhoto']").prettyPhoto({
        hook: 'data-gal',
        animation_speed: 'fast',
        slideshow: 5000,
        autoplay_slideshow: false,
        opacity: 0.80,
        show_title: true,
        allow_resize: true,
        default_width: 500,
        default_height: 344,
        counter_separator_label: '/',
        theme: 'pp_default',
        horizontal_padding: 20,
        hideflash: false,
        wmode: 'opaque',
        autoplay: true,
        modal: false,
        deeplinking: false,
        overlay_gallery: true,
        keyboard_shortcuts: true,
        changepicturecallback: function () { },
        callback: function () { },
        ie6_fallback: true,
        markup: '<div class="pp_pic_holder"> \
					<div class="ppt">&nbsp;</div> \
					<div class="pp_top"> \
						<div class="pp_left"></div> \
						<div class="pp_middle"></div> \
						<div class="pp_right"></div> \
					</div> \
					<div class="pp_content_container"> \
						<div class="pp_left"> \
							<div class="pp_right"> \
								<div class="pp_content"> \
									<div class="pp_loaderIcon"></div> \
									<div class="pp_fade"> \
										<a href="#" class="pp_expand" title="Expand the image">Expand</a> \
										<div class="pp_hoverContainer"> \
											<a class="pp_next" href="#">next</a> \
											<a class="pp_previous" href="#">previous</a> \
										</div> \
										<div id="pp_full_res"></div> \
										<div class="pp_details"> \
											<div class="pp_nav"> \
												<a href="#" class="pp_arrow_previous">Previous</a> \
												<p class="currentTextHolder">0/0</p> \
												<a href="#" class="pp_arrow_next">Next</a> \
											</div> \
											<p class="pp_description"></p> \
											{pp_social} \
											<a class="pp_close" href="#"><i class="fa fa-close"></i></a> \
										</div> \
									</div> \
								</div> \
							</div> \
							</div> \
						</div> \
						<div class="pp_bottom"> \
							<div class="pp_left"></div> \
							<div class="pp_middle"></div> \
							<div class="pp_right"></div> \
						</div> \
					</div> \
					<div class="pp_overlay"></div>',
        gallery_markup: '<div class="pp_gallery"> \
								<a href="#" class="pp_arrow_previous">Previous</a> \
								<div> \
									<ul> \
										{gallery} \
									</ul> \
								</div> \
								<a href="#" class="pp_arrow_next">Next</a> \
							</div>',
        image_markup: '<img id="fullResImage" src="{path}" />',
        flash_markup: '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="{width}" height="{height}"><param name="wmode" value="{wmode}" /><param name="allowfullscreen" value="true" /><param name="allowscriptaccess" value="always" /><param name="movie" value="{path}" /><embed src="{path}" type="application/x-shockwave-flash" allowfullscreen="true" allowscriptaccess="always" width="{width}" height="{height}" wmode="{wmode}"></embed></object>',
        quicktime_markup: '<object classid="clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B" codebase="http://www.apple.com/qtactivex/qtplugin.cab" height="{height}" width="{width}"><param name="src" value="{path}"><param name="autoplay" value="{autoplay}"><param name="type" value="video/quicktime"><embed src="{path}" height="{height}" width="{width}" autoplay="{autoplay}" type="video/quicktime" pluginspage="http://www.apple.com/quicktime/download/"></embed></object>',
        iframe_markup: '<iframe src ="{path}" width="{width}" height="{height}" frameborder="no"></iframe>',
        inline_markup: '<div class="pp_inline">{content}</div>',
        custom_markup: '',
        social_tools: '<div class="pp_social"><div class="twitter"><a href="http://twitter.com/share" class="twitter-share-button" data-count="none">Tweet</a><script type="text/javascript" src="http://platform.twitter.com/widgets.js"></script></div><div class="facebook"><iframe src="http://www.facebook.com/plugins/like.php?locale=en_US&href=' + location.href + '&amp;layout=button_count&amp;show_faces=true&amp;width=500&amp;action=like&amp;font&amp;colorscheme=light&amp;height=23" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:500px; height:23px;" allowTransparency="true"></iframe></div></div>'
    });

}

// Payment method accordion
function shb_accordion() {

    jQuery('div.shb-payment-method').accordion({ event: 'mouseup', heightStyle: 'content' });
    jQuery('div.shb-payment-method h3').on('click', function () {
        jQuery('input', this).prop('checked', true);
    });
    jQuery('div.shb-payment-method h3 input').on('click', function () {
        jQuery(this).prop('checked', true);
    });
    jQuery('div.shb-payment-method h3 input').first().prop('checked', true);

}

jQuery(document).ready(function ($) {

    $(document).on("click", '.shb-guest-selection-wrapper', function (e) {
        $(".shb-guest-selection-dropdown").fadeIn(300);

        jQuery('html,body').animate({
            scrollTop: jQuery(".shb-guest-selection-wrapper").offset().top - 170
        });

        return false;
    });

    $(document).on("click", '.shb-save-room-selection', function (e) {
        $(".shb-guest-selection-dropdown").fadeOut(200);
        return false;
    });

    $(document).mouseup(function (e) {
        var container = $('.shb-guest-selection-dropdown');
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            $('.shb-guest-selection-dropdown').fadeOut(200);
        }
    });

    function shb_calculate_guests() {

        var arr = new Array();

        $(".shb-guest-selection-dropdown select").each(function () {
            arr.push(parseInt(this.value));
        });

        function shb_get_array_sum(total, num) {
            return total + num;
        }

        function myFunction(item) {
            return arr.reduce(shb_get_array_sum);
        }

        $('.shb-guest-value').text(myFunction());

    }

    function shb_validation_required() {

        var shb_validation_error = false;

        $('.shb-validation-required').each(function () {
            if ($.trim($(this).val()) == '') {
                shb_validation_error = true;
            }
        });

        if (shb_validation_error == true) {
            return true;
        } else {
            return false;
        }

    }

    if ($('.shb-booking-form-1,.shb-booking-form-2,.shb-booking-form-3').length == 1) {

        shb_calculate_guests();

        $(".shb-guest-selection-dropdown select").on('change', function () {
            shb_calculate_guests();
        });

    }

    $(document).on("click", '.shb-select-guests-button', function (e) {

        if ($(".shbdp-checkin").val() == '' || $(".shbdp-checkout").val() == '' || $(".shbdp-checkin").val() == '...' || $(".shbdp-checkout").val() == '...') {

            alert(shb_error_msg_dates);
            return false;

        } else {

            $(".shb-booking-form-step-1").css('display', 'none');
            $(".shb-booking-form-step-2").css('display', 'block');
            return false;

        }

    });

    $(document).on("click", '.shb-change-dates-button', function (e) {

        $(".shb-booking-form-step-1").css('display', 'block');
        $(".shb-booking-form-step-2").css('display', 'none');
        return false;

    });

    $(document).on("click", '.shb-single-page-booking-form button[type="submit"]', function (e) {

        if ($(".shbdp-checkin").val() == '' || $(".shbdp-checkout").val() == '') {
            alert(shb_error_msg_dates);
            return false;
        }

    });

    var shbdp_settings = {
        dateformat: shbdp_dateformat,
        i18n: {
            nights: shbdp_nights,
            select_dates: shbdp_select_dates,
            checkin_not_allowed: shbdp_checkin_not_allowed,
            min_max: shbdp_min_max,
            min_only: shbdp_min_only,
            max_only: shbdp_max_only
        }
    };

    shbdp(shbdp_settings);

    $(document).on("click", '#shb-submit-booking-1, .shb-select-room-button, .shb-edit-room-guest-button, .shb-edit-room-button, .shb-continue-payment-button, .shb-apply-coupon-button, .shb-edit-booking-3-button, .shb-booking-3-pay-button', function (e) {

        if ($(this).attr("class") == 'shb-booking-3-pay-button') {

            if (shb_terms_set == 'true') {

                if ($('#sh-terms-and-conditions').is(':checked') == false) {
                    alert(shb_terms_msg);
                    return false;
                }

            }

        }

        if ($(".shbdp-checkin").val() == '' || $(".shbdp-checkout").val() == '' || $(".shbdp-checkin").val() == '...' || $(".shbdp-checkout").val() == '...') {
            alert(shb_error_msg_dates);
            return false;
        }

        if ($(this).attr("class") == 'shb-booking-3-pay-button') {

            if (shb_validation_required() == true) {
                alert(shb_error_msg_required);
                return false;
            }

            if (shb_email_field_validation() == true) {
                alert(shb_invalid_email_msg);
                return false;
            }

            if (shb_number_field_validation() == true) {
                alert(shb_invalid_phone_msg);
                return false;
            }

        }

        if ($(this).attr("class") == 'shb-submit-btn-lrg') {

            var arr = new Array();

            $(".shb-rooms-wrapper select").each(function () {
                arr.push(parseInt(this.value));
            });

            function shb_get_array_sum(total, num) {
                return total + num;
            }

            function myFunction(item) {
                return arr.reduce(shb_get_array_sum);
            }

            if (myFunction() < $("#shb-room-selection").val()) {
                alert(shb_error_msg_guests);
                return false;
            }

        }

        // Booking Step 2, get the selected room button value and add it to an input field for submission
        if ($(this).attr("class") == 'shb-select-room-button') {
            $(".shb-selected-room").val($(this).val());
        }

        if ($(this).attr("class") == 'shb-edit-room-guest-button') {
            $(".shb-edit-room-guest").val($(this).val());
        }

        if ($(this).attr("class") == 'shb-edit-room-button') {
            $(".shb-edit-room").val($(this).val());
        }

        if ($(this).attr("class") == 'shb-continue-payment-button') {
            $(".shb-continue-payment").val($(this).val());
        }

        if ($(this).attr("class") == 'shb-apply-coupon-button') {
            $(".shb-apply-coupon-hidden").val($(this).val());
        }

        if ($(this).attr("class") == 'shb-edit-booking-3-button') {
            $(".shb-edit-booking-3").val($(this).val());
        }

        if ($(this).attr("class") == 'shb-booking-3-pay-button') {
            $(".shb-booking-3-pay").val($(this).val());
        }

        $.ajax({
            type: 'POST',
            url: shb_AJAX_URL,
            data: $('#shb-booking-process').serialize(),
            dataType: 'json',
            success: function (response) {
                if (response.status == 'success') {
                    $('#shb-booking-process')[0].reset();
                }
                $('#shb-booking-process').html(response.content);
                $('#shb-booking-process').css('opacity', '1');
                shb_prettyphoto();
                shb_add_remove_rooms();
                shbdp(shbdp_settings);
                shb_accordion();

                // Scroll to top for each booking step
                $('html,body').animate({
                    scrollTop: $(".shb-booking-step-wrapper").offset().top - 30
                });

            }
        });


        $('#shb-booking-process').css('opacity', '0.3');
        return false;

    });

    $(document).on("click", '.shb-booking-form-1 button,.shb-booking-form-2 button,.shb-booking-form-3 button', function (e) {

        if ($(".shbdp-checkin").val() == '' || $(".shbdp-checkout").val() == '' || $(".shbdp-checkin").val() == '...' || $(".shbdp-checkout").val() == '...') {
            alert(shb_error_msg_dates);
            return false;
        }

        if ($('.shb-guest-value').text() == '0') {
            alert(shb_error_msg_guests);
            return false;
        }

    });

    $(document).on("click", '.shb-booking-form-4 .shb-booking-form-step-2 button', function (e) {

        var arr = new Array();

        $(".shb-booking-form-step-2 select").each(function () {
            arr.push(parseInt(this.value));
        });

        function shb_get_array_sum(total, num) {
            return total + num;
        }

        function myFunction(item) {
            return arr.reduce(shb_get_array_sum);
        }

        if (myFunction() < 1) {
            alert(shb_error_msg_guests);
            return false;
        }

    });

    // Accommodation Carousel 1
    $('.sohohotel-owl-carousel-3').owlCarousel({
        loop: false,
        margin: 30,
        nav: false,
        pagination: true,
        navText: "",
        responsive: {
            0: {
                items: 1
            },
            730: {
                items: 2
            },
            1070: {
                items: 3
            },
        }
    });

    // Accommodation Carousel 2
    $('.sohohotel-owl-carousel-4').owlCarousel({
        loop: false,
        margin: 0,
        nav: true,
        pagination: true,
        navText: "",
        responsive: {
            0: {
                items: 1
            },
            490: {
                items: 1
            },
            710: {
                items: 1
            },
            920: {
                items: 1
            },
        }
    })

});