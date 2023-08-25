
// Define query selector
let in1 = document.getElementById('codeBox1'),
    ins = document.querySelectorAll('input[type="number"]'),
    input_phone = document.querySelector('input[name="phoneOtp"]'),
    confirm_btn = document.querySelector('.js-check-phone'),
    error_text = document.querySelector('input[name="phoneOtp"] + .lt-alert span'),
    send_otp = document.querySelector('.js-send-otp'),
    change_phone = document.querySelector('.js-change-back'),
    modal_phone = document.querySelector('#dangnhapsodienthoai'),
    modal_code = document.querySelector('#dangnhapotp');


const event_click = new Event('click');
const intRegex = /\d+/g;

// validate phone otp
function detect_phoneChange(number) {
    var split_number = number.slice(0, 2);
    var vnf_regex = /((^(\+84|84|0|0084){1})(3|5|7|8|9))+([0-9]{8})$/;
    if (split_number == '02') {
        input_phone.setAttribute("maxlength", "11")
    }
    return vnf_regex.test(number);
};

function validate_phone(e) {
    var value_phone = this.value;

    if (!intRegex.test(value_phone)) {
        this.value = this.value.replace(/\D/g, '');
    }

    if (!detect_phoneChange(value_phone) && this.value.length >= 1) {
        this.classList.add('is-invalid');
        error_text.innerHTML = 'Số điện thoại không hợp lệ';
        confirm_btn.classList.add('disable');
    } else {
        this.classList.remove('is-invalid');
        error_text.innerHTML = "";
        confirm_btn.classList.remove('disable');
        if (e.which == 13) {
            $('.js-check-phone').trigger('click');
            onFocusSuccess();
        }
    }
};

// First input focus when bypass phone check
function onFocusSuccess(e) {

    setTimeout(() => {
        $('.otp-item').val('').removeClass('complete is-invalid');
        ins[0].focus();
        ins[0].classList.add('complete');
    }, 300);
}

function eventClickConfirm() {
    if (input_phone.value.length == 0) {
        input_phone.classList.add('is-invalid');
        error_text.innerHTML = "Thông tin bắt buộc";
        this.classList.add('disable');
    } else {
        modal_phone.classList.remove('open');
        modal_code.classList.add('open');
        onFocusSuccess();
    }
};

function eventPhoneChange() {
    modal_code.classList.remove('open');
    modal_phone.classList.add('open');

    setTimeout(() => {
        input_phone.innerText = '';
        input_phone.focus();
    }, 300);
};

// handle timer countdown resend otp
function handle_countdown() {
    function startCountdown(seconds) {
        let counter = seconds;
        let timer = document.getElementById('timer');

        timer.style.display = "inline"

        const interval = setInterval(() => {
            timer.innerText = ` (sau ${counter} giây)`;
            counter--;

            if (counter < 0) {
                clearInterval(interval);
                send_otp.classList.remove('disable')
                timer.remove();
            }
        }, 1000);

        $(document).on('click', '.js-lt-modal-close', function (e) {
            clearInterval(interval);
            $('#timer').text('');
            $('.js-send-otp').removeClass('disable');
        });

        $(document).on('click', '.lt-modal-otp', function (e) {
            if ($(this).is(e.target) && $(this).has(e.target).length === 0) {
                clearInterval(interval);
                $('#timer').text('');
                $('.js-send-otp').removeClass('disable');
            }
        });
    };

    $('.js-send-otp').click(function () {
        var html_timer = "<span id='timer' class='txt-primary-700'></span>";
        onFocusSuccess();
        $(this).addClass('disable');
        $(this).append(html_timer);
        startCountdown(60);

    });
};

handle_countdown();

splitNumber = function (e) {
    let data = e.data || e.target.value;

    if (!data) return; // Shouldn't happen, just in case.

    if (data.length === 1) {
        data = data.slice(0, 1);
        return;
    };

    if (e.inputType === "insertFromPaste") {
        $('.otp-item').addClass('complete');
    }

    // Here is a normal behavior, not a paste action.
    popuNext(e.target, data);

},

    popuNext = function (el, data) {

        el.value = data[0]; // Apply first item to first input

        data = data.substring(1); // remove the first char.

        if (el.nextElementSibling && data.length) {
            // Do the same with the next element and next data
            popuNext(el.nextElementSibling, data);
        }
    };

ins.forEach(function (input, index) {
    // console.log(input);

    input.addEventListener('keydown', function (e) {
        if ((e.keyCode === 8 || e.keyCode === 37) && this.previousElementSibling && this.previousElementSibling.tagName === "INPUT") {

            if (!this.value) {
                this.previousElementSibling.select();
                this.classList.remove('complete');
                this.classList.remove('is-invalid');
            } else {
                this.value = "";
                // this.classList.remove('complete');
            }
        }
    })

    // console.log("input", input.value);

    input.addEventListener('keyup', function (e) {
        var key = e.keyCode;

        this.value = this.value.slice(0, 1);

        if (e.keyCode == 13) {
            $('.btnLogin').trigger('click');
        }

        if (input.value.length > 1) {
            $('.otp-item').addClass('complete');
        }

        $('.otp-item').removeClass('is-invalid');
        $('.alertOTP').hide();

        if (!intRegex.test(this.value)) {
            this.value = this.value.replace(/\D/g, '');
        }

        // Break if Shift, Tab, CMD, Option, Control.
        if (e.keyCode === 16 || e.keyCode == 9 || e.keyCode == 224 || e.keyCode == 18 || e.keyCode == 17 || e.keyCode == 46 || e.keyCode == 69) {
            return;
        }

        if (e.keyCode !== 8 && this.nextElementSibling) {

            if (this.value) {
                this.nextElementSibling.focus();
                this.classList.add('complete');
                this.nextElementSibling.classList.add('complete');

                this.classList.remove('is-invalid');
                this.nextElementSibling.classList.remove('is-invalid');
            }
        }

        if (e.target.value.length > 1) {
            splitNumber(e);
            e.target.value = e.target.value.slice(0, 1);
        }


    });

    input.addEventListener('focus', function (e) {
        this.select();

        if (this === in1) return;

        if (in1.value == '') {
            in1.focus();
        }

        if (this.previousElementSibling.value == '') {
            this.previousElementSibling.focus();
            this.previousElementSibling.select();
        }
    });
});

/*** Binding event to element **/
in1.addEventListener('input', splitNumber);

confirm_btn.addEventListener('click', eventClickConfirm);
change_phone.addEventListener('click', eventPhoneChange);

input_phone.addEventListener('keyup', validate_phone);
input_phone.addEventListener('keydown', validate_phone);
input_phone.addEventListener('keypress', validate_phone);





// Modal Event

function otpModalEvent() {
    var previousScrollY = 0;
    // click button
    $(document).on('click', '.js-open-otp', function (e) {

        previousScrollY = window.scrollY;

        $('html').css({

            marginTop: -previousScrollY,

        }).addClass('disable-scroll');
        $('.otp-item').val('').removeClass('complete is-invalid');
        $('#' + $(this).attr('aria-controls')).addClass('open');
    });

    function enableScroll() {
        $('html').css({ marginTop: 0 }).removeClass('disable-scroll');

        $('.lt-modal-otp.js-lt-modal-otp').removeClass('open');

        window.scrollTo(0, previousScrollY);
    }

    $(document).on('click', '.lt-modal-otp .js-lt-modal-close', function (e) {
        enableScroll();
    });

    function outside_remove_scroll(e) {
        if ($('.lt-modal.lt-modal-otp').is(e.target) && $('.lt-modal.lt-modal-otp').has(e.target).length === 0) {
            enableScroll();
        }
    }
    //click outside
    // $(document).on('click', '.modal-otp', function (e) {
    //   console.log(1111);
    //   outside_remove_scroll(e);
    // });
};

otpModalEvent();