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
      $(this).prev('.order__input').addClass('active');
    });
  });
  $(document).on('mouseup', function(e) {
    if (!labels.is(e.target) && labels.has(e.target).length === 0) {
      $('.order__input').removeClass('active');
    }
  });
}
order();