
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
      if (i == 0 && !$(this).prevAll().find('.order__input-required').hasClass('not-valid') && $(this).prevAll().find('.order__input-required').hasClass('filled')) {
        nextStep();
      }
      Array.from($('.order__steps input')).forEach(function(input) {
        if ($(input).val() == '') {
          $(input).addClass('not-valid');
        } else {
          $(input).removeClass('not-valid');
        }
      });
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
    });
  }
  $('input[name="promocode"]').on('keydown', function(e) {
    if (e.key !== undefined) {
    if (e.key.length == 1 && e.key.match(/[^0-9a-zA-Z'".]/)) {
      return false;
    }
  }
  });
}
toggleOrderSteps();