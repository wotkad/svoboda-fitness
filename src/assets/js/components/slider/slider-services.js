import Swiper from "swiper";
import { EffectFade } from "swiper/modules"

export default function sliderServices() {
  var swiper = new Swiper('.services__texts', {
  });
  var swiper = new Swiper('.services__images', {
    modules: [EffectFade],
    effect: "fade",
    speed: 400,
    allowTouchMove: false,
    fadeEffect: {
      crossFade: true,
    },
  });

  let thumbnailItems = $('.services__texts .swiper-slide');
  Array.from(thumbnailItems).forEach((item, index) => {
    $(item).on('mouseenter', function() {
      swiper.slideTo(index);
      thumbnailItems.removeClass('swiper-slide-active');
      $(this).addClass('swiper-slide-active');
    });
  });
}
sliderServices();