import Swiper from "swiper";
import { Mousewheel } from "swiper/modules";

export default function sliderPlans() {
  new Swiper('.plans__slider', {
    modules: [ Mousewheel ],
    speed: 800,
    slidesPerView: 3,
    spaceBetween: 24,
    grabCursor: true,
    mousewheel: {
      forceToAxis: true,
    }
  });
}
sliderPlans();