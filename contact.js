$(document).ready(function() {

    if ($('.contact-form').length > 0) {
        $.validate({
            borderColorOnError: '#ff0000'
        });
    }

    var onloadCallback = function() {
        grecaptcha.render('captcha_element', {
            'sitekey': '6LcYYREUAAAAAGdeyREbl1qxmrkDTm0WbyymbZO_',
            'theme': 'light'
        });
    };
    onloadCallback();

    $('#contact-form').on('submit', function(e) {
        var error = false;
        var frm = $('#contact-form');
        $.each($('input, textarea'), function() {
            if (!$.trim($(this).val())) {
                error = true;
            }
        });
        if (error || grecaptcha.getResponse().length === 0) {
            e.preventDefault();
            swal("Please check form fields and verify that you're not a robot!");
        } else {
            $.ajax({
                type: frm.attr('method'),
                url: frm.attr('action'),
                data: frm.serialize(),
                success: function(data) {
                    $(frm).find('input[type=text], input[type=tel], input[type=email], textarea').val('');
                    grecaptcha.reset();
                    swal('Message sent!');
                }
            });

            return false;
        }

    });
});