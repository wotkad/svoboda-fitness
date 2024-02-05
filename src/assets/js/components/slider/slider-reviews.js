import Swiper from "swiper";

export default function sliderReviews() {
  new Swiper('.reviews__slider', {
    speed: 400,
    slidesPerView: 2.5,
    spaceBetween: 24,
    grabCursor: true,
  });
}
sliderReviews();