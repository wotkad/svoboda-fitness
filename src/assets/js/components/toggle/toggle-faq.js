import gsap from "gsap";

export default function toggleFaq() {
  let button = $('.faq__button');
  let container = $('.faq__container');
  for (let i = 0; i < Array.from(button).length; i++) {
    $(button[i]).on('click', function () {
      let id = button[i].getAttribute('data-id');
      let block = $('.faq__container[data-id="' + id + '"]');
      button.removeClass('active');
      gsap.to(container, {opacity: 0, duration: 0.3, onComplete: () => {
        gsap.to(container, {display: 'none', duration: 0});
        gsap.to($(block).attr('data-id', $(this).attr('data-id')), {display: 'block', duration: 0, onComplete: () => {
          gsap.to($(block).attr('data-id', $(this).attr('data-id')), {opacity: 1, duration: 0.3});
        }});
      }});
    });
  }

  let header = $('.faq__header');
  header.on('click', function () {
    $(this).toggleClass('active');
    $(this).next().slideToggle();
  });
}
toggleFaq();