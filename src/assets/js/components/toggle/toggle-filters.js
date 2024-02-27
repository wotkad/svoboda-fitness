import { disablePageScroll, enablePageScroll } from "scroll-lock";

export default function toggleFilters() {
  let items = $('.schedule__list__item');
  let labels = $('.schedule__selected');
  let clear = $('.schedule__clear');
  let values = $('.schedule__value');
  Array.from(items).forEach(function(item) {
    $(item).on('click', function() {
      $(this).parent().siblings('.schedule__input').val($(this).text());
      $(this).parent().siblings('.schedule__input').addClass('filled');
      $(this).parent().siblings('.schedule__selected').children('.schedule__value').text($(this).text());
      $(this).parent().siblings('.schedule__input').removeClass('active');
    });
  });
  Array.from(labels).forEach(function(item) {
    $(item).on('click', function() {
      $('.schedule__input').not($(this).prevAll('.schedule__input')).removeClass('active');
      $(this).prevAll('.schedule__input').toggleClass('active');
    });
  });
  clear.on('click', function() {
    $('.schedule__input').removeClass('active');
    $('.schedule__input').val('');
    $('.schedule__input').removeClass('filled');
    Array.from(values).forEach(function(item) {
      $(item).text($(item).attr('data-text'));
    });
  });
  $(document).on('mouseup', function(e) {
    if (!labels.is(e.target) && labels.has(e.target).length === 0 && $('.schedule__filter').has(e.target).length === 0) {
      $('.schedule__input').removeClass('active');
    }
  });
  function scheduleFiltersToggle() {
    let button = $('.schedule__mobfilter');
    let filters = $('.schedule-filters-mob');
    let close = $('.schedule__close');
    let main = $('main');
    let footer = $('footer');
    button.on('click', function() {
      filters.toggleClass('active');
      main.addClass('active');
      footer.addClass('active');
      disablePageScroll();
    });
    close.on('click', function() {
      filters.removeClass('active');
      main.removeClass('active');
      footer.removeClass('active');
      enablePageScroll();
    });
    $(window).on('resize', function() {
      if ($(window).width() > 768) {
        enablePageScroll();
        filters.removeClass('active');
        main.removeClass('active');
        footer.removeClass('active');
      }
    });
  }
  scheduleFiltersToggle();
}
toggleFilters();