function toggleFaq() {
  let button = $('.faq__button');
  let container = $('.faq__container');
  for (let i = 0; i < Array.from(button).length; i++) {
    $(button[i]).on('click', function () {
      let id = button[i].getAttribute('data-id');
      let block = $('.faq__container[data-id="' + id + '"]');
      container.removeClass('active');
      button.removeClass('active');
      $(block).attr('data-id', $(this).attr('data-id')).addClass('active');
      $(this).addClass('active');
    });
  }
}
toggleFaq();

function toggleFaqItem() {
  let button = $('.faq__header');
  button.on('click', function () {
    $(this).toggleClass('active');
    $(this).next().slideToggle();
  });
}
toggleFaqItem();