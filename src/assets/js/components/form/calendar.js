import { easepick } from "@easepick/bundle";
import { AmpPlugin } from '@easepick/amp-plugin';

export default function calendar() {
  
  let container = $('.hero-filter__list');
  
  function isAnyElementOutOfViewport($els) {
    const screenBottom = window.innerHeight;
    for (let i = 0; i < $els.length; i++) {
      const rect = $els[i].getBoundingClientRect();
      if (rect.bottom > screenBottom) {
        return true;
      }
    }
    return false;
  }
  
  if (isAnyElementOutOfViewport(container)) {
    container.addClass('hero-filter__list-bottom');
    container.removeClass('hero-filter__list-top');
  } else {
    container.removeClass('hero-filter__list-bottom');
    container.addClass('hero-filter__list-top');
  }
  
  function recalculateCalendarPosition() {
    if ($('.easepick-wrapper').length > 0) {
      let easepickCalendar = $('.easepick-wrapper')[0].shadowRoot;
      let easepickCalendarContainer = $(easepickCalendar).find('.container.amp-plugin');
      let calendarOffset = easepickCalendarContainer.height();
  
      if (isAnyElementOutOfViewport(container)) {
        easepickCalendarContainer.css('top', -calendarOffset-80+'px');
      } else {
        easepickCalendarContainer.css('top', 22+'px');
      }
    }
  }
  
  function toggleFilter() {
    let button = $('.hero-filter__container');
    let items = $('.hero-filter__item');
  
    items.on('click', function() {
      let text = $(this).text();
      items.removeClass('active');
      $(this).addClass('active');
      $(this).parent().parent().prev().find('.hero-filter__input input').val(text);
      $(this).parent().parent().prev().find('.hero-filter__input span').text(text).addClass('selected');
      container.removeClass('active');
      container.removeClass('hero-filter__list-top');
      container.removeClass('hero-filter__list-bottom');
      button.removeClass('active');
    });
    for (let i = 0; i < Array.from(button).length; i++) {
      $(button[i]).on('click', function () {
        let id = button[i].getAttribute('data-filter');
        let block = $('.hero-filter__list[data-filter="' + id + '"]');
  
        $(block).attr('data-filter', $(this).attr('data-filter')).toggleClass('active');
        $(this).toggleClass('active');
  
        container.removeClass('hero-filter__list-top');
        container.removeClass('hero-filter__list-bottom');
  
        button.not(this).removeClass('active');
        container.not($(block).attr('data-filter', $(this).attr('data-filter'))).removeClass('active');
  
        if ($(button[i]).hasClass('hero-filter__container-calendar')) {
          $('.easepick-wrapper').toggleClass('active');
        } else {
          $('.easepick-wrapper').removeClass('active');
          $('.hero-filter__container-calendar').removeClass('active');
        }
  
        if (!$('.easepick-wrapper').hasClass('active')) {
          if ($('.easepick-wrapper')[0] !== undefined) {
            let easepickCalendar = $('.easepick-wrapper')[0].shadowRoot;
            let easepickCalendarContainer = $(easepickCalendar).find('.container.amp-plugin');
            easepickCalendarContainer.removeClass('show');
          }
        }
      });
  
      $(button[i]).on('click', function () {
        recalculateCalendarPosition();
      });
  
      $(button[i]).not('.hero-filter__container-calendar').on('click', function () {
        if (isAnyElementOutOfViewport(container)) {
          container.addClass('hero-filter__list-bottom');
          container.removeClass('hero-filter__list-top');
        } else {
          container.removeClass('hero-filter__list-bottom');
          container.addClass('hero-filter__list-top');
        }
      });
  
    }
    $(document).mouseup(function(e) {
      if (
          !container.is(e.target) &&
          !button.is(e.target) &&
          !$('#datepicker').is(e.target)
        ) {
        container.removeClass('active');
        container.removeClass('hero-filter__list-top');
        container.removeClass('hero-filter__list-bottom');
        button.removeClass('active');
        $('.easepick-wrapper').removeClass('active');
      }
    });
    document.addEventListener('keydown', function(e) {
      if (e.key == 'Escape') {
        container.removeClass('active');
        container.removeClass('hero-filter__list-top');
        container.removeClass('hero-filter__list-bottom');
        button.removeClass('active');
        $('.easepick-wrapper').removeClass('active');
      }
    });
  }
  toggleFilter();
  
  function filterCalendar() {
    let datepicker = document.getElementById('datepicker');
    if (datepicker) {
      new easepick.create({
        element: datepicker,
        css: [
          '../datepicker.min.css',
          '../datepicker.css',
        ],
        plugins: [AmpPlugin],
        format: "DD.MM.YYYY",
        AmpPlugin: {
          resetButton: true,
          dropdown: {
            years: true,
            minYear: 2023,
            maxYear: 2025
          },
          locale: {
            resetButton: '<svg width="83" height="22" viewBox="0 0 83 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.862 15.668C4.89133 15.668 4.05133 15.458 3.342 15.038C2.642 14.6087 2.10067 14.016 1.718 13.26C1.33533 12.4947 1.144 11.6127 1.144 10.614C1.144 9.606 1.33533 8.724 1.718 7.968C2.10067 7.20267 2.642 6.60533 3.342 6.176C4.05133 5.74667 4.89133 5.532 5.862 5.532C7.01 5.532 7.948 5.812 8.676 6.372C9.404 6.932 9.866 7.716 10.062 8.724H8.41C8.27933 8.15467 7.99933 7.702 7.57 7.366C7.14067 7.03 6.56667 6.862 5.848 6.862C4.868 6.862 4.09333 7.198 3.524 7.87C2.95467 8.53267 2.67 9.44733 2.67 10.614C2.67 11.7713 2.95467 12.6813 3.524 13.344C4.09333 14.0067 4.868 14.338 5.848 14.338C6.56667 14.338 7.14067 14.1793 7.57 13.862C7.99933 13.5447 8.27933 13.1107 8.41 12.56H10.062C9.866 13.5307 9.404 14.2913 8.676 14.842C7.948 15.3927 7.01 15.668 5.862 15.668ZM11.6932 15.5V5.7H13.1772V14.324H17.6292V15.5H11.6932ZM19.2264 15.5V5.7H25.4564V6.904H20.7104V9.956H25.0364V11.132H20.7104V14.296H25.4564V15.5H19.2264ZM26.5945 15.5L30.2065 5.7H31.8305L35.4145 15.5H33.8465L33.0065 13.106H29.0025L28.1625 15.5H26.5945ZM29.4225 11.93H32.5865L31.0045 7.464L29.4225 11.93ZM36.7811 15.5V5.7H40.1551C40.9298 5.7 41.5644 5.83067 42.0591 6.092C42.5631 6.35333 42.9364 6.708 43.1791 7.156C43.4218 7.59467 43.5431 8.08467 43.5431 8.626C43.5431 9.23267 43.3798 9.78333 43.0531 10.278C42.7358 10.7727 42.2364 11.1273 41.5551 11.342L43.6411 15.5H41.9191L40.0151 11.552H38.2651V15.5H36.7811ZM38.2651 10.432H40.0711C40.7431 10.432 41.2331 10.2687 41.5411 9.942C41.8584 9.61533 42.0171 9.19067 42.0171 8.668C42.0171 8.14533 41.8631 7.73 41.5551 7.422C41.2471 7.10467 40.7478 6.946 40.0571 6.946H38.2651V10.432ZM48.826 15.5V5.7H52.004C53.152 5.7 54.0947 5.90067 54.832 6.302C55.5787 6.70333 56.1294 7.27267 56.484 8.01C56.848 8.738 57.03 9.606 57.03 10.614C57.03 11.6127 56.848 12.4807 56.484 13.218C56.1294 13.946 55.5787 14.5107 54.832 14.912C54.0947 15.304 53.152 15.5 52.004 15.5H48.826ZM50.31 14.24H51.948C52.8347 14.24 53.5347 14.0953 54.048 13.806C54.5707 13.5167 54.944 13.1013 55.168 12.56C55.4014 12.0187 55.518 11.37 55.518 10.614C55.518 9.858 55.4014 9.20467 55.168 8.654C54.944 8.10333 54.5707 7.68333 54.048 7.394C53.5347 7.09533 52.8347 6.946 51.948 6.946H50.31V14.24ZM57.3699 15.5L60.9819 5.7H62.6059L66.1899 15.5H64.6219L63.7819 13.106H59.7779L58.9379 15.5H57.3699ZM60.1979 11.93H63.3619L61.7799 7.464L60.1979 11.93ZM68.7861 15.5V6.904H65.8881V5.7H73.1541V6.904H70.2701V15.5H68.7861ZM74.5428 15.5V5.7H80.7728V6.904H76.0268V9.956H80.3528V11.132H76.0268V14.296H80.7728V15.5H74.5428Z" fill="#004155"/><rect x="0.5" y="20.5" width="82" height="1" fill="#004155"/></svg>'
          }
        },
        zIndex: 10,
        locale: {
          previousMonth: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.7049 7.41L14.2949 6L8.29492 12L14.2949 18L15.7049 16.59L11.1249 12L15.7049 7.41Z" fill="#7A7A7A"/></svg>',
          nextMonth: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.70492 6L8.29492 7.41L12.8749 12L8.29492 16.59L9.70492 18L15.7049 12L9.70492 6Z" fill="#7A7A7A"/></svg>',
        },
        setup(picker) {
          picker.on('select', () => {
            setTimeout(function() {
              $('#datepicker').addClass('selected');
              $('.easepick-wrapper').removeClass('active');
              $('.hero-filter__label-calendar .hero-filter__container').removeClass('active');
            }, 0);
          });
          picker.on('clear', () => {
            setTimeout(function() {
              $('#datepicker').addClass('selected');
              $('.easepick-wrapper').removeClass('active');
              $('.hero-filter__label-calendar .hero-filter__container').removeClass('active');
            }, 0);
          });
          picker.on('view', (e) => {
            recalculateCalendarPosition();
          })
        },
      });
    }
  }
  filterCalendar();
  
  function toggleFilterMob() {
    let button = $('.hero-filter__next, .hero-filter__prev');
    let container = $('.hero-filter__label');
    for (let i = 0; i < Array.from(button).length; i++) {
      $(button[i]).on('click', function (e) {
        if ($(this).attr('data-filter-step') !== 'success') {
          let id = button[i].getAttribute('data-filter-step');
          let block = $('.hero-filter__label[data-filter-step="' + id + '"]');
          container.removeClass('active');
          $('.easepick-wrapper').removeClass('active');
          $(block).attr('data-filter-step', $(this).attr('data-filter-step')).addClass('active');
        }
      });
    }
  }
  if ($(window).outerWidth() <= 1240) {
    toggleFilterMob();
  }
}
calendar();