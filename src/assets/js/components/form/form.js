import sendMail from "./form-send";

export default function form() {
  let inputs = $('.footer__input')
  let policyInput = $('.footer__policy input')

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

  const validatedName = () => {
    const name = $('input[name="name"]').val();

    if (validateName(name)) {
      $('input[name="name"]').removeClass('not-valid').addClass('filled');
    } else {
      $('input[name="name"]').addClass('not-valid').addClass('filled');
    }
    if (name == '') {
      $('input[name="name"]').removeClass('not-valid').removeClass('filled');
    }
    return false;
  }

  const validatedEmail = () => {
    const email = $('input[name="email"]').val();

    if (validateEmail(email)) {
      $('input[name="email"]').removeClass('not-valid');
      $('input[name="email"]').addClass('filled');
    } else {
      $('input[name="email"]').addClass('filled');
      $('input[name="email"]').addClass('not-valid');
    }
    if (email == '') {
      $('input[name="email"]').removeClass('not-valid').removeClass('filled');
    }
    return false;
  }

  const validatedPhone = () => {
    const phone = $('input[name="phone"]').val();

    if (validatePhone(phone) && phone.length > 0) {
      $('input[name="phone"]').removeClass('not-valid');
      $('input[name="phone"]').addClass('filled');
    } else {
      $('input[name="phone"]').addClass('filled');
      $('input[name="phone"]').addClass('not-valid');
    }
    if (phone == '') {
      $('input[name="phone"]').removeClass('not-valid').removeClass('filled');
    }
    return false;
  }

  $('input[name="name"]').on('input', validatedName);
  $('input[name="email"]').on('input', validatedEmail);
  $('input[name="phone"]').on('input', validatedPhone);

  policyInput.on('input', function() {
    if ($(this).prop('checked')) {
      $(this).removeClass('not-valid');
    }
  });

  function sendPopupForm() {
    let form = $('.footer__form');
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
      form.submit(function(e) {
        e.preventDefault();
        if (
          !$('input[name="name"]').hasClass('not-valid') &&
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