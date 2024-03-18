import Swiper from "swiper";
import { FreeMode, Mousewheel, Navigation } from "swiper/modules";

export default function sliderSchedule() {
  let currentDay = new Date().getDay();
  if (currentDay === 0) {
    currentDay = 7;
  }
  currentDay--;
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
        autoHeight: false
      },
      769: {
        spaceBetween: 16,
        slidesPerView: 3.67,
        autoHeight: false
      },
      1536: {
        spaceBetween: 16,
        slidesPerView: 5,
        autoHeight: false
      }
    }
  });
  if ($('.swiper-schedule').length > 0) {
    if (currentDay > 3) {
      swiper.slideTo(6, 0);
    }
    $(window).on('resize', function() {
      if ($(window).width() < 768) {
        swiper.slideTo(currentDay, 0);
      } else if (currentDay > 3) {
        swiper.slideTo(6, 0);
      } else {
        swiper.slideTo(0, 0);
      }
    });
    if ($(window).width() < 768) {
      swiper.slideTo(currentDay, 0);
    } else if (currentDay > 3) {
      swiper.slideTo(6, 0);
    } else {
      swiper.slideTo(0, 0);
    }
  }

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
      let hasTrainings = false;
      let hasVisibleTrainings = false;
      training.each(function() {
        if (buttonIndex == $(this).index()) {
          let slideId = $(this).closest('.swiper-slide').index();
          if (slideId > 0) {
            hasTrainings = true;
          }
          if (slideId > 0 && slideId < 4) {
            hasVisibleTrainings = true;
          }
        }
      });
      if (hasVisibleTrainings) {
        that.hide();
      }
      if (!hasTrainings) {
        that.addClass('no-trainings').text('В это время занятий нет')
      }
    });
  }
  scheduleFunctional();
}
sliderSchedule();