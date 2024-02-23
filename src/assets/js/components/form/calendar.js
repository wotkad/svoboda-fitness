import { easepick } from "@easepick/bundle";
import { AmpPlugin } from '@easepick/amp-plugin';
import { LockPlugin } from '@easepick/lock-plugin';

export default function calendar() {
  let birthday = document.getElementById('birthday-picker');
  let startday = document.getElementById('startday-picker');

  function formatDate(date) {
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    return (day < 10 ? '0' : '') + day + '.' + (month < 10 ? '0' : '') + month + '.' + year;
  }

  function getDates() {
      let today = new Date();
      let futureDate = new Date();
      futureDate.setDate(today.getDate() + 7);
      return [today, futureDate];
  }

  let dates = getDates();
  let todayDate = formatDate(dates[0]);
  let futureDate = formatDate(dates[1]);

  if (birthday) {
    new easepick.create({
      element: birthday,
      css: [
        '/assets/styles/datepicker.min.css',
        '/assets/styles/datepicker.css',
      ],
      plugins: [AmpPlugin],
      format: "DD.MM.YYYY",
      lang: "ru-RU",
      AmpPlugin: {
        resetButton: true,
        dropdown: {
          years: true,
          minYear: 1930,
        },
        locale: {
          resetButton: 'Очистить'
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
            $('.order__calendar .order__input').addClass('selected');
          }, 0);
        });
        picker.on('clear', () => {
          setTimeout(function() {
            $('.order__calendar .order__input').addClass('selected');
          }, 10);
        });
      },
    });
  }
  if (startday) {
    new easepick.create({
      element: startday,
      css: [
        '../datepicker.min.css',
        '../datepicker.css',
      ],
      plugins: [
        AmpPlugin,
        LockPlugin
      ],
      format: "DD.MM.YYYY",
      lang: "ru-RU",
      AmpPlugin: {
        resetButton: true,
        locale: {
          resetButton: 'Очистить'
        }
      },
      LockPlugin: {
        minDate: todayDate,
        maxDate: futureDate
      },
      zIndex: 10,
      locale: {
        previousMonth: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.7049 7.41L14.2949 6L8.29492 12L14.2949 18L15.7049 16.59L11.1249 12L15.7049 7.41Z" fill="#7A7A7A"/></svg>',
        nextMonth: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.70492 6L8.29492 7.41L12.8749 12L8.29492 16.59L9.70492 18L15.7049 12L9.70492 6Z" fill="#7A7A7A"/></svg>',
      },
      setup(picker) {
        picker.on('select', () => {
          setTimeout(function() {
            $('.order__calendar .order__input').addClass('selected');
          }, 0);
        });
        picker.on('clear', () => {
          setTimeout(function() {
            $('.order__calendar .order__input').addClass('selected');
          }, 10);
        });
      },
    });
  }
}
calendar();