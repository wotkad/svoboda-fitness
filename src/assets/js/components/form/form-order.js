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
  $('input[name="email"]').on('input', function() {
    validatedEmail.call(this);
  });
  $('input[name="phone"]').on('input', function() {
    validatedPhone.call(this);
  });
  $('input[name="promocode"]').on('input', function() {
    validatedPromocode.call(this);
  });

  // Селекторы для нужных полей ввода
  let inputSelectors = '.order input[name="name"], .order input[name="email"], .order input[name="phone"]';

  $(inputSelectors).on('input', function() {
    // Создаем переменную, чтобы отслеживать наличие класса not-valid у всех элементов
    var allInputsValid = true;

    // Проходимся по всем выбранным элементам
    $(inputSelectors).each(function() {
      // Проверяем, есть ли у текущего элемента класс not-valid или значение пустое
      if ($(this).hasClass('not-valid') || $(this).val() == '') {
        // Если есть, устанавливаем переменную allInputsValid в false
        allInputsValid = false;
        return false; // Прерываем цикл, если найден невалидный элемент
      }
    });

    // После прохождения по всем элементам, проверяем значение переменной allInputsValid
    if (allInputsValid) {
      // Если все элементы валидны, удаляем класс у кнопки
      $('.order .order__button').removeClass('order__button-disabled');
    } else {
      // Иначе добавляем класс кнопке
      $('.order .order__button').addClass('order__button-disabled');
    }
  });

  $('input[type="tel"]').on('keydown', function(e) {
    if (e.key !== undefined) {
      if(e.key.length == 1 && e.key.match(/[^0-9'".]/)){
        return false;
      }
    }
  });

}
formBooking();
