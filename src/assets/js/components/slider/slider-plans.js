import Swiper from "swiper";
import { Mousewheel } from "swiper/modules";

export default function sliderPlans() {
  new Swiper('.plans__slider', {
    modules: [ Mousewheel ],
    speed: 800,
    slidesPerView: 1.3,
    centeredSlides: true,
    spaceBetween: 40,
    grabCursor: true,
    mousewheel: {
      forceToAxis: true,
    },
    breakpoints: {
      768: {
        spaceBetween: 20,
        centeredSlides: false,
        slidesPerView: 3,
      },
      1224: {
        centeredSlides: false,
        spaceBetween: 24,
        slidesPerView: 3,
      }
    }
  });
}
sliderPlans();