import Swiper from "swiper";
import { FreeMode, Mousewheel } from "swiper/modules";

export default function sliderSchedule() {
  let swiper = new Swiper('.swiper-schedule', {
    modules: [ Mousewheel, FreeMode ],
    speed: 800,
    slidesPerView: 3.67,
    spaceBetween: 16,
    freeMode: true,
    grabCursor: true,
    mousewheel: {
      forceToAxis: true,
    }
  });

  let button = $('.schedule-table__button');
  let training = $('.schedule-table__slider .swiper-slide .schedule-table__training');
  let ids = [];
  button.on('click', function() {
    let buttonIndex = $(this).parent().index();
    training.each(function() {
      if (buttonIndex == $(this).index()) {
        let slideId = $(this).closest('.swiper-slide').index();
        if (slideId !== 0) {
          ids.push(slideId);
          swiper.slideTo(ids[0]);
        }
      }
    });
    ids = [];
  });
  button.each(function() {
    let that = $(this);
    let buttonIndex = $(this).parent().index();
    training.each(function() {
      if (buttonIndex == $(this).index()) {
        let slideId = $(this).closest('.swiper-slide').index();
        if (slideId !== 0 && slideId > 0 && slideId < 4) {
          that.hide();
        }
      }
    });
  })
}
sliderSchedule();