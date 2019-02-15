var formData = {};
var termsApproved = false;
var fields = [
    'phone',
    'mail',
    'course',
    'child',
    'parent'
];

$('.ajaxgo').click(function () {
    if (termsApproved) {
        checkFields();
    } else {
        notifyTerms();
    }
});

function notifyTerms() {
    $('.terms .desc').addClass('-alert');
}

function checkFields() {
    var fieldErrorCount = 0;

    fields.forEach(function (fieldname) {
        var field = $('.val-' + fieldname);

        if (field.val() !== '')
            formData[fieldname] = field.val();
        else {
            fieldErrorCount++;
            field.parent().addClass('-show-error');
        }
    });

    if ($('.age-input').val() !== '')
        formData.age = $('.age-picker li.picked').text();
    else {
        fieldErrorCount++;
        $('.age-picker').addClass('-alert');
    }

    if (fieldErrorCount === 0) {
        formData.course = $('.course-name_placeholder').text();
        if ($('.val-promo').val() !== '')
            checkPromo();
        else
            sendFormRequest();
    }
}

function checkPromo() {
    var code = $('.val-promo').val();

    $.ajax({
        url: 'https://banana-bot-vk.herokuapp.com/verify_code',
        type: "POST",
        data: JSON.stringify({promocode:code}),
        contentType:"application/json; charset=utf-8",
        dataType:"json",
        success: function(value){
            onPromoSuccess(value);
        }
    });
}

function onPromoSuccess(result) {
    if (result) {
        formData.promo = "Скидка от адаманта!";
        sendFormRequest();
    } else {
        $('.js-promocode input').val('');
        $('.js-promocode').addClass('-show-error');
    }
}

function sendFormRequest() {
    $.post({
        url: "./mail.php",
        data : formData,
        success: function () {
            onFormSendSuccess();
        }
    });
}

function onFormSendSuccess() {
    var form = $('.feedBackWrapper');
    form.addClass('is-closed');
    $(".successmsg").addClass('is-visible');
    form.find("input, select, textarea").val('');
    form.find(".picked").removeClass('picked');
    setTimeout(function () {
        $(".successmsg").removeClass('is-visible')
    }, 5000);
}


// ====================== AGE PICKER ===========================

$('.age-picker li').click(function () {
    $('.age-picker').removeClass('-alert');
    $('.age-picker li').removeClass('picked');
    $(this).addClass('picked');
    $('.age-input').val($(this).text());
});

$('.checkbox').click(function () {
    if (!termsApproved) {
        $('.terms .desc').removeClass('-alert');
        termsApproved = true;
        $('.check').prop('checked', true);
        $('.checkbox').addClass('clicked');
    } else {
        termsApproved = false;
        $('.check').prop('checked', false);
        $('.checkbox').removeClass('clicked');
    }
});

$('body').on('focus', '.fieldset', function () {
    $(this).removeClass('-show-error');
});

$('body').on('click', '.fieldset__error', function () {
    $(this).parent().removeClass('-show-error');
    $(this).parent().find('input').focus();
});

$(document.body).on("focus", "input", function () {
    $(this).css("border", "");
});