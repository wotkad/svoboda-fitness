import { gsap } from "gsap";
import { clearQueueScrollLocks, disablePageScroll, enablePageScroll } from "scroll-lock";

export default function togglePopup() {
  const buttons = $('.popup-trigger');
  const popupWrappers = $('.popup__wrapper');

  $(window).on('resize', function() {
    if ($(window).outerWidth() > 767) {
      gsap.to(popupWrappers, { y: 0, duration: 0});
    } else {
      gsap.to(popupWrappers, { x: 0, duration: 0});
    }
  });

  buttons.on('click', function() {
    let that = $(this);
    function openPopup() {
      const popupId = that.data('popup-button');
      const popup = $(`.popup[data-popup="${popupId}"]`);
      const bg = $('.popup__overlay');
      const wrapper = popup.find('.popup__wrapper');
      const close = $('.popup__close, .popup__button');
      const scrollableElement = document.querySelectorAll('.popup__content')
      popup.addClass('active');
      bg.addClass('active');

      if (wrapper.length > 0) {
        if ($(window).outerWidth() > 767) {
          gsap.to(wrapper, { x: 0, duration: 0.4, ease: "power2.out" });
        } else {
          gsap.to(wrapper, { y: 0, duration: 0.4, ease: "power2.out" });
        }
      }

      disablePageScroll(scrollableElement);

      close.off('click');
      close.on('click', function() {
        if ($(window).outerWidth() > 767) {
          gsap.to(wrapper, { x: '100%', duration: 0.4, ease: "power2.out", onComplete: () => {
            popup.removeClass('active');
            bg.removeClass('active');
          }});
          clearQueueScrollLocks();
        } else {
          gsap.to(wrapper, { y: '100%', duration: 0.4, ease: "power2.out", onComplete: () => {
            popup.removeClass('active');
            bg.removeClass('active');
          }});
        }
        enablePageScroll();
      });

      bg.off('click');
      bg.on('click', function() {
        if ($(window).outerWidth() > 767) {
          gsap.to(wrapper, { x: '100%', duration: 0.4, ease: "power2.out", onComplete: () => {
            popup.removeClass('active');
            bg.removeClass('active');
          }});
        } else {
          gsap.to(wrapper, { y: '100%', duration: 0.4, ease: "power2.out", onComplete: () => {
            popup.removeClass('active');
            bg.removeClass('active');
          }});
        }
        if (!$('.header__burger').hasClass('active')) {
          enablePageScroll();
        }
      });

      function handleKeyDown(e) {
        if ($(window).outerWidth() > 1240) {
          if (e.key == 'Escape' && wrapper.length !== 0) {
            gsap.to(wrapper, { x: '100%', duration: 0.4, ease: "power2.out", onComplete: () => {
                popup.removeClass('active');
                bg.removeClass('active');
            }});
            enablePageScroll();
            $('.popup-select__button').find('.button__input').attr('data-selected', '');
            document.removeEventListener('keydown', handleKeyDown);
          }
        }
      }
      document.addEventListener('keydown', handleKeyDown);
    }
    openPopup();
  });

}

togglePopup();