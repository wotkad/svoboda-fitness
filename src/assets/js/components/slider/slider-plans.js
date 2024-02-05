import Swiper from "swiper";

export default function sliderPlans() {
  new Swiper('.plans__slider', {
    speed: 300,
    slidesPerView: 3,
    spaceBetween: 24,
    grabCursor: true,
  });
}
sliderPlans();