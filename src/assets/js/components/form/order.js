export default function order() {
  let items = $('.order__list__item');
  let labels = $('.order__selected');
  Array.from(items).forEach(function(item) {
    $(item).on('click', function() {
      $(this).parent().siblings('.order__input').val($(this).text());
      $(this).parent().siblings('.order__input').addClass('filled');
      $(this).parent().siblings('.order__selected').children('.order__value').text($(this).text());
      $(this).parent().siblings('.order__input').removeClass('active');
    });
  });
  Array.from(labels).forEach(function(item) {
    $(item).on('click', function() {
      $('.order__input').not($(this).prevAll('.order__input')).removeClass('active');
      $(this).prevAll('.order__input').toggleClass('active');

      $('.easepick-wrapper').toggleClass('active');

      if (!$('.easepick-wrapper').hasClass('active')) {
        if ($('.easepick-wrapper')[0] !== undefined) {

          let easepickCalendar = $('.easepick-wrapper')[0].shadowRoot;
          let easepickCalendarContainer = $(easepickCalendar).find('.container.amp-plugin');
          easepickCalendarContainer.removeClass('show');
        }
      }

    });
  });
  $('.order__calendar').on('click', function() {
    $(this).children('.order__input').toggleClass('active');

    $('.easepick-wrapper').toggleClass('active');

    if (!$('.easepick-wrapper').hasClass('active')) {
      if ($('.easepick-wrapper')[0] !== undefined) {

        let easepickCalendar = $('.easepick-wrapper')[0].shadowRoot;
        let easepickCalendarContainer = $(easepickCalendar).find('.container.amp-plugin');
        easepickCalendarContainer.removeClass('show');
        $('.order__calendar').children('.order__input').removeClass('active');
      }
    }

  });
  $(document).on('mouseup', function(e) {
    if (!labels.is(e.target) && labels.has(e.target).length === 0) {
      $('.order__input').removeClass('active');
    }
    if ($('#birthday-picker').val() == '') {
      $('#birthday-picker').removeClass('selected');
    }
    if ($('#startday-picker').val() == '') {
      $('#startday-picker').removeClass('selected');
    }
    $('.order__calendar').children('.order__input').removeClass('active');
  });
  let buttons = $('.plans__button');
  Array.from(buttons).forEach(function(button) {
    $(button).on('click', function() {
      localStorage.planId = $(this).data('plan-id');
    });
  });
  function selectedPlanChecker() {
    if (localStorage.planId !== undefined) {
      $(`.order__plans .order__input`).val($(`.order__plans .order__list__item[data-plan-id=${localStorage.planId}]`).text()).addClass('filled');
      $(`.order__plans .order__value`).text($(`.order__plans .order__list__item[data-plan-id=${localStorage.planId}]`).text());
    }
  }
  selectedPlanChecker();
}
order();