import Swiper from "swiper";
import { Pagination, Autoplay, EffectFade } from "swiper/modules"

export default function sliderGallery() {
  new Swiper('.gallery__slider', {
    modules: [Pagination, Autoplay, EffectFade],
    speed: 1000,
    grabCursor: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    autoplay: {
      delay: 3000,
      disableOnInteraction: false
    },
    loop: true,
    watchSlidesProgress: true,
    fadeEffect: {
      crossFade: true,
    },
    effect: "fade",
  });
  document.addEventListener('resize', event => {
    const el = event.target;
    if (el && el.matches && el.matches('.swiper-container')) {
      el.swiper.autoplay.start();
      el.classList.remove('swiper-paused');
    }
  });
}
sliderGallery();