function shbdp(settings) {

    function shbdp_selectable_date_range(checkin) {

        var before_unavailable = [];
        var after_unavailable = [];

        jQuery('.shbdp-cal-wrapper table tbody tr td').each(function () {

            var date = jQuery(this).attr('data-date');

            if (date < checkin) {
                if (jQuery(this).hasClass('shbdp-cal-unavailable')) {
                    before_unavailable.push(date);
                }
            }

            if (date > checkin) {
                if (jQuery(this).hasClass('shbdp-cal-unavailable')) {
                    after_unavailable.push(date);
                }
            }

        });

        before_unavailable_sorted = before_unavailable.sort();
        after_unavailable_sorted = after_unavailable.sort();

        var selectable_date_range = {};
        selectable_date_range["newest_date"] = before_unavailable_sorted.slice(-1)[0];
        selectable_date_range["oldest_date"] = after_unavailable_sorted[0];

        return selectable_date_range;

    }

    function shbdp_selectable_date_range_css(checkin) {

        var selectable_date_range = shbdp_selectable_date_range(checkin);

        var newest_date = selectable_date_range["newest_date"];
        var oldest_date = selectable_date_range["oldest_date"];

        jQuery('.shbdp-cal-wrapper table tbody tr td').each(function () {

            var date = jQuery(this).attr('data-date');
            var date_element = jQuery('.shbdp-cal-wrapper table tbody tr td[data-date="' + date + '"]');

            if (date == checkin) {
                date_element.addClass('shbdp-cal-selected-checkin');
            }
            // Disable reverse selection
            if (date < checkin) {
                if ((!date_element.hasClass('shbdp-cal-disabled')) && (!date_element.hasClass('shbdp-cal-unavailable'))) {
                    date_element.addClass('shbdp-cal-disabled shbdp-cal-disabled-temp');
                    date_element.removeClass('shbdp-cal-enabled shbdp-cal-available');
                }
            }

            if (date < newest_date) {

                if ((!date_element.hasClass('shbdp-cal-disabled')) && (!date_element.hasClass('shbdp-cal-unavailable'))) {
                    date_element.addClass('shbdp-cal-disabled shbdp-cal-disabled-temp');
                    date_element.removeClass('shbdp-cal-enabled shbdp-cal-available');
                }

            }

            if (date > oldest_date) {

                if ((!date_element.hasClass('shbdp-cal-disabled')) && (!date_element.hasClass('shbdp-cal-unavailable'))) {
                    date_element.addClass('shbdp-cal-disabled shbdp-cal-disabled-temp');
                    date_element.removeClass('shbdp-cal-enabled shbdp-cal-available');
                }

            }

            if (date == oldest_date) {
                date_element.addClass('shbdp-cal-available shbdp-cal-available-checkout-only');
                date_element.removeClass('shbdp-cal-unavailable');
            }

        });

    }

    function shbdp_live_selection_hover_css(checkin) {

        jQuery('.shbdp-cal-wrapper table tbody tr td.shbdp-cal-available').on('mouseover', function () {

            if ((!jQuery(this).hasClass('shbdp-cal-disable-min')) && (!jQuery(this).hasClass('shbdp-cal-disable-max')) && (!jQuery(this).hasClass('shbdp-cal-disabled-temp'))) {

                var checkin_selected = shbdp_checkin_selected();
                var checkout_selected = shbdp_checkout_selected();

                if ((checkin !== null) && (checkout_selected == false) && (checkin_selected !== false)) {

                    var date = jQuery(this).attr('data-date');

                    // shbdp_update_date_notice function causes bug where date must be clicked twice to be selected on mobile devices
                    if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                        shbdp_update_date_notice(date);
                    }

                    var parent = jQuery(this).closest(".shbdp-cal");
                    var availableChildren = parent.find(".shbdp-cal-available");
                    var checkInElement = parent.find('[data-date="' + checkin + '"]')[0];

                    var idxOfCurrent = availableChildren.index(jQuery(this));
                    var idxOfCheckIn = availableChildren.index(checkInElement);

                    var idxStart = idxOfCheckIn > idxOfCurrent ? idxOfCurrent : idxOfCheckIn;
                    var idxEnd = idxStart == idxOfCheckIn ? idxOfCurrent : idxOfCheckIn;
                    var hoverChildren = availableChildren.slice(idxStart, idxEnd + 1);

                    availableChildren.removeClass('shbdp-cal-selected-date-live');
                    hoverChildren.addClass('shbdp-cal-selected-date-live');

                }

            }

            if (jQuery(this).hasClass('shbdp-cal-selected-checkin')) {

                var checkin_selected = shbdp_checkin_selected();
                var checkout_selected = shbdp_checkout_selected();

                if ((checkin !== null) && (checkout_selected == false) && (checkin_selected !== false)) {

                    var parent = jQuery(this).closest(".shbdp-cal");
                    var availableChildren = parent.find(".shbdp-cal-available");
                    availableChildren.removeClass('shbdp-cal-selected-date-live');

                }

            }

        });

    }

    function shbdp_checkin_selected() {
        var elements = jQuery('.shbdp-cal-selected-checkin');
        return elements.length > 0;
    }

    function shbdp_checkout_selected() {
        var elements = jQuery('.shbdp-cal-selected-checkout');
        return elements.length > 0;
    }

    function shbdp_clear_date_selection() {

        jQuery('.shbdp-cal-wrapper table tbody tr td').each(function () {

            if (jQuery(this).hasClass('shbdp-cal-selected-checkin')) {
                jQuery(this).removeClass('shbdp-cal-selected-checkin');
            }

            if (jQuery(this).hasClass('shbdp-cal-selected-checkout')) {
                jQuery(this).removeClass('shbdp-cal-selected-checkout');
            }

            if (jQuery(this).hasClass('shbdp-cal-selected-date')) {
                jQuery(this).removeClass('shbdp-cal-selected-date');
            }

        });

    }

    function shbdp_reset_selectable_blocked_dates() {

        jQuery('.shbdp-cal-wrapper table tbody tr td').each(function () {

            if (jQuery(this).hasClass('shbdp-cal-available-checkout-only')) {
                jQuery(this).removeClass('shbdp-cal-available shbdp-cal-available-checkout-only shbdp-cal-enabled');
                jQuery(this).addClass('shbdp-cal-unavailable shbdp-cal-enabled');
            }

            if (jQuery(this).hasClass('shbdp-cal-disabled-temp')) {
                jQuery(this).removeClass('shbdp-cal-disabled shbdp-cal-disabled-temp');
                jQuery(this).addClass('shbdp-cal-enabled shbdp-cal-available');
            }

            if (jQuery(this).hasClass('shbdp-cal-selected-date-live')) {
                jQuery(this).removeClass('shbdp-cal-selected-date-live');
                jQuery(this).addClass('shbdp-cal-selected-date');
            }

            if (jQuery(this).hasClass('shbdp-cal-disable-min')) {
                jQuery(this).removeClass('shbdp-cal-disable-min');
            }

            if (jQuery(this).hasClass('shbdp-cal-disable-max')) {
                jQuery(this).removeClass('shbdp-cal-disable-max');
            }

        });

    }

    function shbdp_parse_date(str) {

        if (str) {
            var mdy = str.split('-');
            return new Date(mdy[0], mdy[1], mdy[2]);
        }

    }

    function shbdp_date_diff(first, second) {

        var date1 = new Date(first);
        var date2 = new Date(second);
        var difference_time = date2.getTime() - date1.getTime();
        var difference_days = difference_time / (1000 * 3600 * 24);

        return difference_days;

    }

    function shbdp_update_date_notice(date) {

        var checkin = jQuery('.shbdp-cal-selected-checkin').attr('data-date');


        if (date) {

            if (date == checkin) {
                var checkout = '...';
            }
            else {
                var checkout = date;
            }

        } else {

            if (jQuery('.shbdp-cal-selected-checkout').attr('data-date')) {
                var checkout = jQuery('.shbdp-cal-selected-checkout').attr('data-date');
                //++++++++++++++++++++++++++++++++++++++++++
                if (document.getElementById("myvar").value == 40 || document.getElementById("myvar").value == 910) {
                    var checkin = checkout;
                    var d = new Date(checkout);
                    d.setDate(d.getDate() + 1);
                    month = '' + (d.getMonth() + 1),
                        day = '' + d.getDate(),
                        year = d.getFullYear();

                    if (month.length < 2)
                        month = '0' + month;
                    if (day.length < 2)
                        day = '0' + day;
                    checkout = [year, month, day].join('-');
                }

            } else {
                var checkout = '...';
            }

        }

        if (document.getElementById("myvar").value == 40 || document.getElementById("myvar").value == 910)
            var nights = 1;
        else
            var nights = shbdp_date_diff(checkin, checkout);

        if (checkout == '...') {

            var date1 = checkin;
            var date2 = checkout;

        } else {

            if (checkin > checkout) {
                var date1 = checkout;
                var date2 = checkin;
            } else {
                var date1 = checkin;
                var date2 = checkout;
            }

        }

        if (nights) {
            var nights_val = '(' + Math.abs(nights) + ' ' + settings['i18n']['nights'] + ')';
        } else {
            var nights_val = '';
        }

        jQuery('.shbdp-cal-selected-dates').html('<p>' + shbdp_dateformat(date1) + ' - ' + shbdp_dateformat(date2) + ' ' + nights_val + '</p>');

        jQuery('.shbdp-checkin-display').val(shbdp_dateformat(date1));
        jQuery('.shbdp-checkout-display').val(shbdp_dateformat(date2));

        jQuery('.shbdp-checkin').val(date1);
        jQuery('.shbdp-checkout').val(date2);

    }

    function shbdp_dateformat(date) {

        var format = settings["dateformat"];
        var date_parts = date.split('-');

        if (format == 'DD/MM/YYYY') {
            var formatted_date = date_parts[2] + '/' + date_parts[1] + '/' + date_parts[0];
        }

        if (format == 'MM/DD/YYYY') {
            var formatted_date = date_parts[1] + '/' + date_parts[2] + '/' + date_parts[0];
        }

        if (format == 'YYYY/MM/DD') {
            var formatted_date = date_parts[0] + '/' + date_parts[1] + '/' + date_parts[2];
        }

        if (format == 'DD.MM.YYYY') {
            var formatted_date = date_parts[2] + '.' + date_parts[1] + '.' + date_parts[0];
        }

        if (format == 'MM.DD.YYYY') {
            var formatted_date = date_parts[1] + '.' + date_parts[2] + '.' + date_parts[0];
        }

        if (format == 'YYYY.MM.DD') {
            var formatted_date = date_parts[0] + '.' + date_parts[1] + '.' + date_parts[2];
        }

        if (date_parts[1] === undefined) {
            return '...';
        } else {
            return formatted_date;
        }

    }

    function shbdp_restricted_checkin_remove() {

        jQuery('.shbdp-cal-wrapper table tbody tr td').each(function () {

            if (jQuery(this).hasClass('shbdp-cal-checkin-disabled')) {
                jQuery(this).removeClass('shbdp-cal-checkin-disabled');
                jQuery(this).addClass('shbdp-cal-checkin-disabled-temp');
            }

        });

    }

    function shbdp_restricted_checkin_add() {

        jQuery('.shbdp-cal-wrapper table tbody tr td').each(function () {

            if (jQuery(this).hasClass('shbdp-cal-checkin-disabled-temp')) {
                jQuery(this).removeClass('shbdp-cal-checkin-disabled-temp');
                jQuery(this).addClass('shbdp-cal-checkin-disabled');
            }

        });

    }

    function shbdp_add_night_to_date(olddate, add) {

        var date = new Date(olddate);
        var newdate = new Date(date);

        newdate.setDate(newdate.getDate() + add);

        var dd = ("0" + newdate.getDate()).slice(-2)
        var mm = ("0" + (newdate.getMonth() + 1)).slice(-2)
        var y = newdate.getFullYear();

        var finaldate = y + '-' + mm + '-' + dd;

        return finaldate;

    }

    function shbdp_min_max_stay_check(checkin) {

        var checkin_element = jQuery('.shbdp-cal-wrapper table').find("[data-date='" + checkin + "']");
        var minbooking = Number(checkin_element.attr('data-min'));
        var maxbooking = Number(checkin_element.attr('data-max'));

        if ((minbooking !== 0) || (maxbooking !== 0)) {

            jQuery('.shbdp-cal-wrapper table tbody tr td').each(function () {

                var date = jQuery(this).attr('data-date');

                var diff = shbdp_date_diff(checkin, date);

                if (minbooking !== 0) {

                    if ((diff < minbooking) && (diff > (0 - minbooking))) {
                        jQuery(this).addClass('shbdp-cal-disable-min');
                    }

                }

                if (maxbooking !== 0) {

                    if ((diff > maxbooking) || diff < (0 - maxbooking)) {
                        jQuery(this).addClass('shbdp-cal-disable-max');
                    }

                }

            });

        }

    }

    function shbdp_min_max_stay_notice(checkin) {

        var checkin_element = jQuery('.shbdp-cal-wrapper table').find("[data-date='" + checkin + "']");
        var minbooking = Number(checkin_element.attr('data-min'));
        var maxbooking = Number(checkin_element.attr('data-max'));

        var min_max_text = settings['i18n']['min_max'];
        min_max_text = min_max_text.replace(/%a/, (minbooking)).replace(/%b/, (maxbooking));

        var min_only_text = settings['i18n']['min_only'];
        min_only_text = min_only_text.replace(/%a/, (minbooking));

        var max_only_text = settings['i18n']['max_only'];
        max_only_text = max_only_text.replace(/%b/, (maxbooking));

        if ((minbooking !== 0) && (maxbooking !== 0)) {
            jQuery('.shbdp-cal-notice').html('<p>' + min_max_text + '</p>');
        }

        if ((minbooking !== 0) && (maxbooking == 0)) {
            jQuery('.shbdp-cal-notice').html('<p>' + min_only_text + '</p>');
        }

        if ((minbooking == 0) && (maxbooking !== 0)) {
            jQuery('.shbdp-cal-notice').html('<p>' + max_only_text + '</p>');
        }

        if ((minbooking == 0) && (maxbooking == 0) || checkin == 'reset') {
            jQuery('.shbdp-cal-notice').html('');
        }

    }

    function shbdp_notice_reset() {

        var shbdp_msg_select_dates = settings['i18n']['select_dates'];
        jQuery('.shbdp-cal-selected-dates').html('<p>' + shbdp_msg_select_dates + '</p>');

    }

    function shbdp_notice_no_checkin() {

        var original_html = jQuery('.shbdp-cal-selected-dates').html();

        jQuery(".shbdp-cal-checkin-disabled").hover(function () {

            if (
                (!jQuery(this).hasClass('shbdp-cal-selected-date-live')) &&
                (!jQuery(this).hasClass('shbdp-cal-checkin-disabled-temp')) &&
                (!jQuery(this).hasClass('shbdp-cal-unavailable'))
            ) {
                var shbdp_msg_no_checkin = settings['i18n']['checkin_not_allowed'];
                jQuery('.shbdp-cal-selected-dates').html('<p>' + shbdp_msg_no_checkin + '</p>');
            }

        });

        jQuery(".shbdp-cal-checkin-disabled").mouseout(function () {

            if (
                (!jQuery(this).hasClass('shbdp-cal-selected-date-live')) &&
                (!jQuery(this).hasClass('shbdp-cal-checkin-disabled-temp')) &&
                (!jQuery(this).hasClass('shbdp-cal-unavailable'))
            ) {
                jQuery('.shbdp-cal-selected-dates').html('<p>' + original_html + '</p>');
            }

        });

    }

    function shbdp_open_datepicker() {
        jQuery(".shbdp-datepicker").on("click", function () {

            jQuery(".shbdp-hidden").fadeIn(300);
            shbdp_checkin_position();

            jQuery('html,body').animate({
                scrollTop: jQuery(".shbdp-datepicker").offset().top - 170
            });

        });

        jQuery(window).on('resize', function () {
            shbdp_checkin_position();
        });

    }

    function shbdp_close_datepicker() {

        jQuery(".shbdp-hidden").fadeOut(200);
        jQuery('.shbdp-hidden').removeClass('shbdp-datepicker-position');

    }

    function shbdp_checkout_position() {

        var pos_checkin = jQuery('.shbdp-checkin-display').position();
        var pos_checkout = pos_checkin + jQuery('.shbdp-checkout-display').position();

        var height = jQuery('.shbdp-checkout-display').outerHeight();

        if (pos_checkin.top !== pos_checkout.top) {

            jQuery('.shbdp-datepicker-position').css({
                position: "absolute",
                top: (pos_checkout.top + height) + "px",
                left: pos_checkout.left + "px"
            });

        }

        var position_right = (jQuery(window).width() - (jQuery('.shbdp-checkout-display').offset().left + jQuery('.shbdp-checkout-display').outerWidth()));

        // Off screen
        if (shbdp_off_screen('.shbdp-cal-wrapper') == true) {

            jQuery('.shbdp-datepicker-position').css({
                position: "absolute",
                top: (pos_checkout.top + height) + "px",
                right: position_right + "px",
                left: "inherit"
            });

        }

    }

    function shbdp_off_screen(input) {

        var elm = jQuery(input);
        var off = elm.offset();
        var l = off.left;
        var w = elm.width();
        var docW = jQuery("body").width();

        var isEntirelyVisible = (l + w <= docW);

        if (!isEntirelyVisible) {
            // off screen
            return true;
        } else {
            // not off screen
            return false;
        }

    }

    function shbdp_checkin_position() {

        if (jQuery('.shbdp-hidden').length !== 0) {

            jQuery('.shbdp-hidden').addClass('shbdp-datepicker-position');

            var pos = jQuery('.shbdp-checkin-display').position();
            var height = jQuery('.shbdp-checkin-display').outerHeight();

            jQuery('.shbdp-datepicker-position').css({
                position: "absolute",
                top: (pos.top + height) + "px",
                left: pos.left + "px"
            });

            var position_right = (jQuery(window).width() - (jQuery('.shbdp-checkin-display').offset().left + jQuery('.shbdp-checkin-display').outerWidth()));

            // Off screen
            if (shbdp_off_screen('.shbdp-cal-wrapper') == true) {

                jQuery('.shbdp-datepicker-position').css({
                    position: "absolute",
                    top: (pos.top + height) + "px",
                    right: position_right + "px",
                    left: "inherit"
                });

            }

        }

    }

    function shb_click_off() {

        jQuery(document).mouseup(function (e) {

            var container = jQuery('.shbdp-hidden');

            if (!container.is(e.target) && container.has(e.target).length === 0) {
                jQuery('.shbdp-hidden').fadeOut(200);
            }

        });

    }

    function shb_pre_load_dates() {
        var checkin = jQuery('.shbdp-checkin').val();
        var checkout = jQuery('.shbdp-checkout').val();
        if (jQuery('.shbdp-checkin').val() && jQuery('.shbdp-checkout').val()) {
            jQuery('td[data-date="' + checkin + '"]').click();
            jQuery('td[data-date="' + checkout + '"]').mouseenter().mouseleave();
            jQuery('td[data-date="' + checkout + '"]').click();
        }
    }

    function shbdp_load_all() {

        jQuery('.shbdp-datepicker').prop('readonly', true);

        var shbdp_msg_restricted_checkin = settings['i18n']['checkin_not_allowed'];

        jQuery(".shbdp-cal-next-btn").on("click", function () {

            if (jQuery(".shbdp-current-cal").next().length) {
                var current = jQuery(".shbdp-current-cal");
                jQuery(".shbdp-current-cal").next().addClass("shbdp-current-cal");
                current.removeClass("shbdp-current-cal");
            }

            return false;

        });

        jQuery(".shbdp-cal-prev-btn").on("click", function () {

            if (jQuery(".shbdp-current-cal").prev().length) {
                var current = jQuery(".shbdp-current-cal");
                jQuery(".shbdp-current-cal").prev().addClass("shbdp-current-cal");
                current.removeClass("shbdp-current-cal");
            }

            return false;

        });

        shb_click_off();
        shbdp_notice_no_checkin();
        shbdp_open_datepicker();

        if (jQuery('.shbdp-noselect').length == 0) {

            jQuery(".shbdp-cal-wrapper table tbody tr td").on("click", function () {

                if (jQuery(this).hasClass('shbdp-cal-checkin-disabled')) {
                    alert(shbdp_msg_restricted_checkin);
                }

                if (jQuery(this).hasClass('shbdp-cal-selected-checkin')) {

                    var checkin_selected = shbdp_checkin_selected();
                    var checkout_selected = shbdp_checkout_selected();

                    shbdp_clear_date_selection();
                    shbdp_reset_selectable_blocked_dates();
                    shbdp_min_max_stay_notice('reset');
                    shbdp_notice_reset();
                    shbdp_restricted_checkin_add();
                    shbdp_notice_no_checkin();

                    jQuery(this).removeClass('shbdp-cal-selected-date');

                    if ((checkin_selected == true) && (checkout_selected == true)) {

                        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {

                            jQuery('html,body').animate({
                                scrollTop: jQuery(".shbdp-checkout-display").offset().top - 40
                            });

                        }

                        var checkin = jQuery(this).attr('data-date');
                        jQuery(this).addClass('shbdp-cal-selected-checkin');
                        shbdp_checkout_position();
                        shbdp_selectable_date_range_css(checkin);
                        shbdp_live_selection_hover_css(checkin);
                        shbdp_update_date_notice('');
                        shbdp_restricted_checkin_remove();
                        shbdp_min_max_stay_check(checkin);
                        shbdp_min_max_stay_notice(checkin);
                        shbdp_notice_no_checkin();
                    }

                } else {

                    var checkin_selected = shbdp_checkin_selected();
                    //++++++++++++++++++++++++++++++++++++++++++++++++++++
                    if (document.getElementById("myvar").value == 40 || document.getElementById("myvar").value == 910)
                        checkin_selected = true;
                    if (checkin_selected == true) {

                        var checkout_selected = shbdp_checkout_selected();

                        if (checkout_selected == true) {

                            if ((jQuery(this).hasClass('shbdp-cal-available')) && (!jQuery(this).hasClass('shbdp-cal-checkin-disabled'))) {

                                if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {

                                    jQuery('html,body').animate({
                                        scrollTop: jQuery(".shbdp-checkout-display").offset().top - 40
                                    });

                                }

                                shbdp_clear_date_selection();
                                shbdp_reset_selectable_blocked_dates();
                                var checkin = jQuery(this).attr('data-date');
                                jQuery(this).addClass('shbdp-cal-selected-checkin');
                                shbdp_checkout_position();
                                shbdp_selectable_date_range_css(checkin);
                                shbdp_live_selection_hover_css(checkin);
                                shbdp_update_date_notice('');
                                shbdp_restricted_checkin_remove();
                                shbdp_min_max_stay_check(checkin);
                                shbdp_min_max_stay_notice(checkin);
                                shbdp_notice_no_checkin();
                            }

                        } else {

                            if ((jQuery(this).hasClass('shbdp-cal-available')) && (!jQuery(this).hasClass('shbdp-cal-disable-min')) && (!jQuery(this).hasClass('shbdp-cal-disable-max'))) {
                                jQuery(this).addClass('shbdp-cal-selected-checkout');
                                shbdp_reset_selectable_blocked_dates();
                                shbdp_update_date_notice('');
                                shbdp_restricted_checkin_add();
                                shbdp_min_max_stay_notice('reset');
                                shbdp_notice_no_checkin();
                                shbdp_close_datepicker();
                            }

                        }

                    } else {

                        if ((jQuery(this).hasClass('shbdp-cal-available')) && (!jQuery(this).hasClass('shbdp-cal-checkin-disabled'))) {

                            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {

                                jQuery('html,body').animate({
                                    scrollTop: jQuery(".shbdp-checkout-display").offset().top - 40
                                });

                            }

                            var checkin = jQuery(this).attr('data-date');
                            jQuery(this).addClass('shbdp-cal-selected-checkin');
                            shbdp_checkout_position();
                            shbdp_selectable_date_range_css(checkin);
                            shbdp_live_selection_hover_css(checkin);
                            shbdp_update_date_notice('');
                            shbdp_restricted_checkin_remove();
                            shbdp_min_max_stay_check(checkin);
                            shbdp_min_max_stay_notice(checkin);
                            shbdp_notice_no_checkin();
                        }

                    }

                }

            });

        }

    }

    shbdp_load_all();
    shb_pre_load_dates();

}