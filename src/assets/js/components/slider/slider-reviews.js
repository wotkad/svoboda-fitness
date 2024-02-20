import Swiper from "swiper";
import { Mousewheel } from "swiper/modules";

export default function sliderReviews() {
  new Swiper('.reviews__slider', {
    modules: [ Mousewheel ],
    speed: 800,
    slidesPerView: 2.5,
    spaceBetween: 20,
    grabCursor: true,
    mousewheel: {
      forceToAxis: true,
    },
    breakpoints: {
      1224: {
        spaceBetween: 24,
      }
    }
  });
}
sliderReviews();