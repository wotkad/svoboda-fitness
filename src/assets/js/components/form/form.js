import sendMail from "./form-send";

export default function form() {
  let inputs = $('input')
  let policyInput = $('input[name="policy"]')

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

  const validatedSurname = function() {
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

  const validatedPromocode = function() {
    const promocode = $(this).val();

    if (promocode.length > 0) {
      $(this).removeClass('not-valid');
      $(this).addClass('filled');
    } else {
      $(this).addClass('filled');
      $(this).addClass('not-valid');
    }
    if (promocode == '') {
      $(this).removeClass('not-valid').removeClass('filled');
    }
    return false;
  }

  $('input[name="name"]').on('input', function() {
    validatedName.call(this);
  });
  $('input[name="surname"]').on('input', function() {
    validatedSurname.call(this);
  });
  $('input[name="email"]').on('input', function() {
    validatedEmail.call(this);
  });
  $('input[name="phone"]').on('input', function() {
    validatedPhone.call(this);
  });
  $('input[name="promocode"]').on('input', function() {
    validatedPromocode.call(this);
  });

  policyInput.on('input', function() {
    if ($(this).prop('checked')) {
      $(this).removeClass('not-valid');
    }
  });

  function sendPopupForm() {
    let form = $('form');
    let button = $('.footer__button');
    button.on('click', function() {
      if (!policyInput.prop('checked')) {
        policyInput.addClass('not-valid');
      } else {
        policyInput.removeClass('not-valid');
      }
      Array.from(inputs).forEach(function(input) {
        if (!$(input).val()) {
          $(input).addClass('not-valid');
        }
      })
    });
    if (form) {
      form.on('submit', function(e) {
        $(this).find('input.not-valid').trigger('focus');
        e.preventDefault();
        if (
          !$('input[name="name"]').hasClass('not-valid') &&
          !$('input[name="surname"]').hasClass('not-valid') &&
          !$('input[name="email"]').hasClass('not-valid') &&
          !$('input[name="phone"]').hasClass('not-valid') &&
          !$('input[name="policy"]').hasClass('not-valid')) {
          sendMail(form).then(function() {
            form.get(0).reset();
            $('input').removeClass('not-valid');
          });
        }
      });
    }
  }
  sendPopupForm();

  $('input[type="tel"]').on('keydown', function(e) {
    if (e.key !== undefined) {
      if(e.key.length == 1 && e.key.match(/[^0-9'".]/)){
        return false;
      }
    }
  });

}
form();
