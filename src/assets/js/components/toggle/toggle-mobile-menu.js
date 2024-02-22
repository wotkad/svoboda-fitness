import { disablePageScroll, enablePageScroll } from "scroll-lock";

export default function toggleMobileMenu() {
  let button = $('.header__burger');
  let menu = $('.header__menu');
  let main = $('main');
  let items = $('.header__link');
  let footer = $('footer');
  function closeMenu() {
    button.removeClass('active');
    menu.removeClass('active');
    main.removeClass('active');
    footer.removeClass('active');
    enablePageScroll();
  }
  button.on('click', function() {
    if (button.hasClass('active')) {
      closeMenu()
    } else {
      button.addClass('active');
      menu.addClass('active');
      main.addClass('active');
      footer.addClass('active');
      disablePageScroll();
    }
  });
  $(window).on('resize', function() {
    if ($(window).width() > 768) {
      closeMenu()
    }
  });
  Array.from(items).forEach((item) => {
    $(item).on('click', function() {
      setTimeout(function() {
        closeMenu()
      }, 300);
    });
  });
}
toggleMobileMenu();