import Swiper from "swiper";
import { Mousewheel } from "swiper/modules";

export default function sliderPlans() {
  new Swiper('.plans__slider', {
    modules: [ Mousewheel ],
    speed: 800,
    slidesPerView: 3,
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
sliderPlans();