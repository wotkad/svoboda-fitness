
import gsap from "gsap";

export default function toggleOrderSteps() {
  let button = $('.order__button');
  let container = $('.order__step');
  let action = $('.order__action');
  for (let i = 0; i < Array.from(button).length; i++) {
    $(button[i]).on('click', function () {
      let id = button[i].getAttribute('data-id');
      let block = $('.order__step[data-id="' + id + '"]');
      button.removeClass('active');
      $(this).addClass('active');
      Array.from($('.order__step[data-id="1"] input')).forEach(function(input) {
        if (!$(input).hasClass('filled') && $(input).val() == '') {
          $(input).addClass('not-valid');
        } else {
          $(input).removeClass('not-valid');
        }
      });
      if (i == 0 && !$(this).prevAll().find('.order__input-required').hasClass('not-valid') && $(this).prevAll().find('.order__input-required').hasClass('filled')) {
        nextStep();
      }
      if (i == 1 && !$(this).prevAll().find('.order__input-required').hasClass('not-valid') && $(this).prevAll().find('.order__input-required').hasClass('filled') && !$(this).prevAll().find('.order__input-required[name="plan"]').val() == '') {
        nextStep();
      }
      function nextStep() {
        gsap.to(container, {opacity: 0, duration: 0.3, onComplete: () => {
          gsap.to(container, {display: 'none', duration: 0});
          gsap.to($(block).attr('data-id', $(this).attr('data-id')), {display: 'block', duration: 0, onComplete: () => {
            action.removeClass('active');
            $('.order__action[data-id="' + id + '"]').addClass('active');
            gsap.to($(block).attr('data-id', $(this).attr('data-id')), {opacity: 1, duration: 0.3});
          }});
        }});
      }
      function updateSendLink() {
        let link = $('.order__send');
        link.on('mouseover', function() {
          let name = $('input[name="name"]').val();
          let phone = $('input[name="phone"]').val();
          let email = $('input[name="email"]').val();
          let plan = $('input[name="plan"]').val();
          let dateStart = $('#startday-picker').val() ? $('#startday-picker').val() : 'Не указано';
          let sex = $('input[name="sex"]').val() ? $('input[name="sex"]').val() : 'Не указано';
          let experience = $('input[name="experience"]').val() ? $('input[name="experience"]').val() : 'Не указано';
          let birthday = $('#birthday-picker').val() ? $('#birthday-picker').val() : 'Не указано';
          link.attr('href', `https://wa.me/79032006300/?text=Здравствуйте, меня зовут ${name}, интересует абонемент ${plan}, готов(а) приступить к занятиям с ${dateStart}. Информация обо мне: Телефон: ${phone}, Email: ${email}, Пол: ${sex}, Опыт в фитнесе: ${experience}, Дата рождения: ${birthday}.`);
        });
        link.on('click', function() {
          gsap.to($('.order__step'), {opacity: 0, duration: 0.3, onComplete: () => {
            gsap.to($('.order__step'), {display: 'none', duration: 0});
            gsap.to($('.order__step[data-id="3"]'), {display: 'block', duration: 0, onComplete: () => {
              $('.order__action').removeClass('active');
              $('.order__action[data-id="3"]').addClass('active');
              gsap.to($('.order__step[data-id="3"]'), {opacity: 1, duration: 0.3});
            }});
            setTimeout(function() {
              gsap.to($('.order__spinner'), {opacity: 0, duration: 0.3, onComplete: () => {
                gsap.to($('.order__spinner'), {display: 'none', duration: 0});
                gsap.to($('.order__alert'), {display: 'block', duration: 0, onComplete: () => {
                  gsap.to($('.order__alert'), {opacity: 1, duration: 0.3});
                }});
              }});
            }, 2000);
          }});
        });
      }
      updateSendLink();
    });
  }
}
toggleOrderSteps();