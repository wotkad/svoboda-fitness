import sendMail from "./form-send";

export default function formBooking() {

  const validateName = (name) => {
    if (name.length >= 2 && name.length < 50) {
      return name.match(
        /^[а-яА-Яa-zA-Z]/
      );
    }
  }

  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  const validatePhone = (phone) => {
    return phone.match(
      /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/
    );
  }

  const validatedName = function() {
    const name = $(this).val();

    if (validateName(name)) {
      $(this).removeClass('not-valid').addClass('filled');
    } else {
      $(this).addClass('not-valid').addClass('filled');
    }
    if (name == '') {
      $(this).removeClass('not-valid').removeClass('filled');
    }
    return false;
  }

  const validatedEmail = function() {
    const email = $(this).val();

    if (validateEmail(email)) {
      $(this).removeClass('not-valid');
      $(this).addClass('filled');
    } else {
      $(this).addClass('filled');
      $(this).addClass('not-valid');
    }
    if (email == '') {
      $(this).removeClass('not-valid').removeClass('filled');
    }
    return false;
  }

  const validatedPhone = function() {
    const phone = $(this).val();

    if (validatePhone(phone) && phone.length > 0) {
      $(this).removeClass('not-valid');
      $(this).addClass('filled');
    } else {
      $(this).addClass('filled');
      $(this).addClass('not-valid');
    }
    if (phone == '') {
      $(this).removeClass('not-valid').removeClass('filled');
    }
    return false;
  }

  const validatedCode = function() {
    const code = $(this).val();

    if (code.length > 0) {
      $(this).removeClass('not-valid');
      $(this).addClass('filled');
    } else {
      $(this).addClass('filled');
      $(this).addClass('not-valid');
    }
    if (code == '') {
      $(this).removeClass('not-valid').removeClass('filled');
    }
    return false;
  }

  $('input[name="name"]').on('input', function() {
    validatedName.call(this);
  });
  $('input[name="email"]').on('input', function() {
    validatedEmail.call(this);
  });
  $('input[name="phone"]').on('input', function() {
    validatedPhone.call(this);
  });
  $('input[name="code"]').on('input', function() {
    validatedCode.call(this);
  });

  function getCode() {
    let timer = 0;
    let count = 60;
    
    function updateButtonText() {
        if (count > 0) {
            $('.order__getcode span').text(count + ' сек');
            count--;
            timer = setTimeout(updateButtonText, 1000);
        } else {
            $('.order__getcode span').text('Отправить код');
            $('.order__getcode').css('pointer-events', 'all');
            clearTimeout(timer);
        }
    }

    $('.order__getcode').on('click', function() {
        $('input[name="code"]').val('');
        $('input[name="code"]').removeClass('filled');
        $('.order__label-code').removeClass('order__label-code-hidden');
        count = 60;
        updateButtonText();
        $(this).css('pointer-events', 'none');
    });
    
    $('.order__input[name="phone"]').on('input', function() {
      if (!$(this).hasClass('not-valid') && !$(this).val() == '') {
        $('.order__getcode').removeClass('order__getcode-hidden');
      } else {
        $('.order__getcode').addClass('order__getcode-hidden');
        $('.order__label-code').addClass('order__label-code-hidden');
        $('.order__getcode span').text('Отправить код');
        clearTimeout(timer);
      }
    });
  }
  getCode();

  $('input[type="tel"]').on('keydown', function(e) {
    if (e.key !== undefined) {
      if(e.key.length == 1 && e.key.match(/[^0-9'".]/)){
        return false;
      }
    }
  });

}
formBooking();
