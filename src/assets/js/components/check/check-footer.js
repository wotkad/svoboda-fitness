export default function checkFooter() {
  let inputs = $('.contact__input')
  let policyInput = $('.contact__policy input')

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

  const validatedName = () => {
    const name = $('input[name="name"]').val();

    if (validateName(name)) {
      $('input[name="name"]').removeClass('not-valid');
    } else {
      $('input[name="name"]').addClass('not-valid');
    }
    if (name == '') {
      $('input[name="name"]').removeClass('not-valid');
    }
    return false;
  }

  const validatedEmail = () => {
    const email = $('input[name="email"]').val();

    if (validateEmail(email)) {
      $('input[name="email"]').removeClass('not-valid');
    } else {
      $('input[name="email"]').addClass('not-valid');
    }
    if (email == '') {
      $('input[name="email"]').removeClass('not-valid');
    }
    return false;
  }

  $('input[name="name"]').on('input', validatedName);
  $('input[name="email"]').on('input', validatedEmail);

  $('.contact__input').on('input', function() {
    if ($(this).val()) {
      $(this).addClass('active');
    } else {
      $(this).removeClass('active');
    }
  });

  policyInput.on('input', function() {
    if ($(this).prop('checked')) {
      $(this).removeClass('not-valid');
    }
  });

  function sendPopupForm() {
    let form = $('.contact__form');
    let button = $('.contact__submit button');
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
checkFooter();