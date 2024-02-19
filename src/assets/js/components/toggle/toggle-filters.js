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
      let input = $(this).prev();
      if (input.hasClass('active')) {
        input.removeClass('active');
      } else {
        $('.schedule__input').removeClass('active');
        input.addClass('active');
      }
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
    if (!labels.is(e.target) && labels.has(e.target).length === 0) {
      $('.schedule__input').removeClass('active');
    }
  });
}
toggleFilters();