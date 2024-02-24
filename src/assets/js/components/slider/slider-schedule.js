import Swiper from "swiper";
import { FreeMode, Mousewheel, Navigation } from "swiper/modules";

export default function sliderSchedule() {
  let swiper = new Swiper('.swiper-schedule', {
    modules: [ Mousewheel, FreeMode, Navigation ],
    speed: 800,
    slidesPerView: 1,
    grabCursor: true,
    mousewheel: {
      forceToAxis: true,
    },
    autoHeight: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      767: {
        autoHeight: false,
        spaceBetween: 16,
        slidesPerView: 3.1,
      },
      769: {
        spaceBetween: 16,
        slidesPerView: 3.67,
      },
      1536: {
        spaceBetween: 16,
        slidesPerView: 5,
      }
    }
  });

  function scheduleFunctional() {
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
    });
  }
  scheduleFunctional();
}
sliderSchedule();