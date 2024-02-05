export default function scrollHeader() {
  let header = $('.header');
  $(window).on('scroll', function() {
    if ($(window).scrollTop() > 0) {
      header.addClass('active');
    } else {
      header.removeClass('active');
    }
  });
  if ($(window).scrollTop() > 0) {
    header.addClass('active');
  } else {
    header.removeClass('active');
  }
}
scrollHeader();