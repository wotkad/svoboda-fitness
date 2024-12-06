function scrollToTop() {
  // Определяем начальную позицию скролла
  var startY = window.scrollY;
  // Определяем дистанцию до верха страницы
  var stopY = 0;
  // Определяем расстояние, на которое нужно проскроллить за определенное время
  var distance = stopY - startY;
  // Определяем время, за которое нужно проскроллить
  var duration = 500; // время в миллисекундах

  // Запускаем анимацию скролла
  var start_time = performance.now();

  function step(current_time) {
      var elapsed_time = current_time - start_time;
      var progress = Math.min(elapsed_time / duration, 1); // Прогресс скролла от 0 до 1
      window.scrollTo(0, startY + distance * easeInOutQuad(progress)); // Применяем скролл с учетом прогресса и ease функции
      if (elapsed_time < duration) {
          requestAnimationFrame(step); // Продолжаем анимацию, пока не достигнем конечной точки
      }
  }

  requestAnimationFrame(step);
}

// Функция easeInOutQuad для более плавного скролла
function easeInOutQuad(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}


function initLoadmore() {
  if (document.querySelector('#loadmore')) {
      let button = document.querySelector('#loadmore');
      let paged = button.getAttribute('data-paged');
      let maxPages = button.getAttribute('data-max_pages');
      let category = button.getAttribute('data-category');


      button.addEventListener('click', async function (event) {
          event.preventDefault();

          button.textContent = 'Загружаем...';

          var params = new URLSearchParams({
              paged: paged,
              action: 'loadmore'
          });

          if (category) {
              params.append('category', category);
          }

          var response = await fetch("/wp-admin/admin-ajax.php?"+ params, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
              },
          });

          if (response.ok) {
              paged++;

              button.parentNode.insertBefore(document.createRange().createContextualFragment(await response.text()), button);
              button.textContent = 'Загрузить ещё';

              if (paged == maxPages) {
                  button.remove();
              }
          } else {
              console.error('Ошибка загрузки данных: ' + response.status);
          }
      });
  }
}
if (document.querySelector('.ymap-container') !== null) {
window.initMap = initMap;
}
async function initMap() {
  await ymaps3.ready;

  const {
      YMap,
      YMapDefaultSchemeLayer,
      YMapDefaultFeaturesLayer,
      YMapFeature,
      YMapMarker
    } = ymaps3;
  
  const map = new YMap(document.getElementById('map-yandex'),
      {
          location: {
              center: [37.454654, 55.847826],
              zoom: 18,
          }
      },

      [
          // Add a map scheme layer
          new YMapDefaultSchemeLayer({}),
          // Add a layer of geo objects to display the line
          new YMapDefaultFeaturesLayer({})
      ]
  );

  map.addChild(new YMapDefaultSchemeLayer({
      theme: "dark", customization: []
  }));

  // State with line coordinates
  const lineCoordinates = [
      [37.440788, 55.849199],
      [37.440833, 55.849388],
      [37.451895, 55.850584],
      [37.452904, 55.847586],
      [37.454654, 55.847826]
  ]

  // Create a line object, set its coordinates and styles, and add it to the map
  const line = new YMapFeature({
    geometry: {
      type: 'LineString',
      coordinates: lineCoordinates
    },
    style: {
      stroke: [{color: '#000000', width: 3, dash: [8, 8]}]
    }
  });
  const line2 = new YMapFeature({
      geometry: {
        type: 'LineString',
        coordinates: lineCoordinates
      },
      style: {
        stroke: [{color: '#F7D90B', width: 6}]
      }
    });
  map.addChild(line);
  map.addChild(line2);
  
  const markerElement = document.createElement('img');
        markerElement.className = 'icon-marker';
        markerElement.src = '/wp-content/themes/svoboda_fitness/assets/images/marker.svg';
        map.addChild(new YMapMarker({coordinates: [37.454654, 55.847826]}, markerElement));
  
}

if (document.querySelector('.order__getcode') !== null) {
window.booking = booking;
}

function booking() {
  
  function sanitizePhoneNumber(phoneNumber) {
      return phoneNumber.replace(/\s/g, '').replace(/[()+-]/g, '');
  }
  
  let sanitizedPhoneNumber;
          
  function getCode() {
      if (document.querySelector('.order__getcode') !== null) {
          const getCodeButton = document.querySelector('.order__getcode');
          
          function sendCodeByClick() {
              const phoneInput = document.querySelector('.order__input[name="phone"]');
              let phoneNumber = phoneInput.value;
              sanitizedPhoneNumber = sanitizePhoneNumber(phoneNumber);
              
              let url = '/wp-content/themes/svoboda_fitness/handlers/get-code.php';
              let requestData = JSON.stringify({
                  phone: sanitizedPhoneNumber,
              });
          
              fetch(url, {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: requestData
              })
              .then(function(response) {
                  if (!response.ok) {
                      throw new Error('Ошибка: ' + response.status);
                  }
                  return response.text();
              })
              .then(function(data) {
              })
              .catch(function(error) {
                  console.error(error);
              });
          }
          getCodeButton.addEventListener('click', sendCodeByClick);
      }
  }
  getCode();
  
  function checkCode() {
      if (document.querySelector('.order__getcode') !== null) {
          var form = document.querySelector('.order__steps');
          const nameInput = document.querySelector('.booking .order__input[name="name"]');
          const phoneInput = document.querySelector('.booking .order__input[name="phone"]');
          const emailInput = document.querySelector('.booking .order__input[name="email"]');
          const codeInput = document.querySelector('.booking .order__input[name="code"]');
          const appointmentInput = document.querySelector('.booking input[name="appointment_id"]');
          
          const inputs = document.querySelectorAll('.booking .order__input');
          const submitButton = document.querySelector('.booking .order__button');
          submitButton.addEventListener('click', checkInputs);
          function checkInputs() {
              inputs.forEach(function(input) {
                 if (input.value == '') {
                     input.classList.add('not-valid');
                 } 
              });
          }
          form.addEventListener('submit', function(event) {
              event.preventDefault();
      
              let phoneNumber = phoneInput.value;
              sanitizedPhoneNumber = sanitizePhoneNumber(phoneNumber);
              
              let formData = JSON.stringify({
                  name: nameInput.value,
                  phone: sanitizedPhoneNumber,
                  email: emailInput.value,
                  code: codeInput.value,
                  appointment_id: appointmentInput.value
              });
      
              let url = '/wp-content/themes/svoboda_fitness/handlers/reg-and-auth.php';

              fetch(url, {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: formData
              })
              .then(function(response) {
                  setTimeout(function() {
                      response.json().then(function(json) {
                          if (json.status == 'no_pass_token') {
                              document.querySelector('input[name="code"]').classList.add('not-valid');
                              document.querySelector('.order__label-code span').innerHTML = 'Неверный код';
                          } else if (json.status == 'later') {
                              document.querySelector('input[name="code"]').classList.add('not-valid');
                              document.querySelector('.order__label-code span').innerHTML = 'Повторите попытку позже';
                          } else if (json.status == 'not_valid') {
                              document.querySelector('input[name="code"]').classList.add('not-valid');
                              document.querySelector('.order__label-code span').innerHTML = 'Неверный код';
                          } else if (json.status == 'too_many') {
                              document.querySelector('input[name="code"]').classList.add('not-valid');
                              document.querySelector('.order__label-code span').innerHTML = 'Слишком много попыток отправки';
                          } else if (json.status == 'timeout') {
                              document.querySelector('.order__spinner').style.opacity = "0";
                              document.querySelector('.order__alert-error .order__subtext').innerHTML = "Запись на занятие закончена.";
                              setTimeout(function() {
                                  document.querySelector('.order__spinner').style.display = "none";
                                  document.querySelector('.order__alert-error').style.display = "block";
                                  scrollToTop();
                                  setTimeout(function() {
                                     document.querySelector('.order__alert-error').style.opacity = "1"; 
                                  }, 150);
                              }, 150); 
                          } else if (json.status == 'already_booked') {
                              document.querySelector('.order__spinner').style.opacity = "0";
                              document.querySelector('.order__alert-error .order__subtext').innerHTML = "Вы уже записаны на это занятие.";
                              setTimeout(function() {
                                  document.querySelector('.order__spinner').style.display = "none";
                                  document.querySelector('.order__alert-error').style.display = "block";
                                  scrollToTop();
                                  setTimeout(function() {
                                     document.querySelector('.order__alert-error').style.opacity = "1"; 
                                  }, 150);
                              }, 150); 
                          } else {
                              document.querySelector('input[name="code"]').classList.remove('not-valid');
                              document.querySelector('.order__label-code span').innerHTML = '';
                              
                              document.querySelector('.order__spinner').style.opacity = "0";
                              setTimeout(function() {
                                  document.querySelector('.order__spinner').style.display = "none";
                                  document.querySelector('.order__alert-success').style.display = "block";
                                  scrollToTop();
                                  setTimeout(function() {
                                     document.querySelector('.order__alert-success').style.opacity = "1"; 
                                  }, 150);
                              }, 150); 
                          } 
                      });
                  }, 150); 
              })
              .catch(function(error) {
                  setTimeout(function() {
                      document.querySelector('.order__spinner').style.opacity = "0";
                      setTimeout(function() {
                          document.querySelector('.order__spinner').style.display = "none";
                          document.querySelector('.order__alert-error').style.display = "block";
                          scrollToTop();
                          setTimeout(function() {
                             document.querySelector('.order__alert-error').style.opacity = "1"; 
                          }, 150);
                      }, 150); 
                      console.log('Произошла ошибка:', error);
                  }, 150); 
              });
              
              document.querySelector('.order__step[data-id="1"]').style.opacity = "0";
              setTimeout(function() {
                  document.querySelector('.order__step[data-id="1"]').style.display = "none";
                  document.querySelector('.order__step[data-id="2"]').style.display = "block";
                  scrollToTop();
                  setTimeout(function() {
                     document.querySelector('.order__step[data-id="2"]').style.opacity = "1"; 
                  }, 150);
              }, 150); 
          });
      }
  }
  checkCode();
}


if (document.querySelector('.footer__form') !== null) {
window.callback = callback;
}

function callback() {
  
  let policyInput = document.querySelector('input[name="policy"]');

    policyInput.addEventListener('input', function() {
      if (this.checked) {
        this.classList.remove('not-valid');
      }
    });
  
  function sanitizePhoneNumber(phoneNumber) {
      return phoneNumber.replace(/\s/g, '').replace(/[()+-]/g, '');
  }
  
  let sanitizedPhoneNumber;
  
  function checkCode() {
      if (document.querySelector('.footer__form') !== null) {
          const form = document.querySelector('.footer__form');
          const nameInput = document.querySelector('.footer__input[name="name"]');
          const phoneInput = document.querySelector('.footer__input[name="phone"]');
          const emailInput = document.querySelector('.footer__input[name="email"]');
          
          const inputs = document.querySelectorAll('.footer__input');
          const submitButton = document.querySelector('.footer__button');
          
          const policyInput = document.querySelector('.footer__policy input[name="policy"]');
          let timer = 0;
          submitButton.addEventListener('click', checkInputs);
          function checkInputs() {
              inputs.forEach(function(input) {
                 if (input.value == '') {
                     input.classList.add('not-valid');
                 } 
              });
              
              if (!policyInput.checked) {
                  policyInput.classList.add('not-valid');
              } else {
                  policyInput.classList.remove('not-valid');
              }
              
              document.querySelectorAll('.footer input:not([name="policy"])').forEach(function(input) {
                  if (input.value === '') {
                    input.classList.add('not-valid');
                  } else {
                    input.classList.remove('not-valid');
                  }
              });
          }
          form.addEventListener('submit', function(event) {
              event.preventDefault();
      
              let phoneNumber = phoneInput.value;
              sanitizedPhoneNumber = sanitizePhoneNumber(phoneNumber);
              
              let formData = JSON.stringify({
                  name: nameInput.value,
                  phone: sanitizedPhoneNumber,
                  email: emailInput.value
              });
      
              let url = '/wp-content/themes/svoboda_fitness/handlers/callback.php';
              if (
                !document.querySelector('input[name="name"]').classList.contains('not-valid') &&
                !document.querySelector('input[name="email"]').classList.contains('not-valid') &&
                !document.querySelector('input[name="phone"]').classList.contains('not-valid') &&
                !document.querySelector('input[name="policy"]').classList.contains('not-valid')
              ) {
                  fetch(url, {
                      method: 'POST',
                      headers: {
                          'Content-Type': 'application/json'
                      },
                      body: formData
                  })
                  .then(function() {
                      form.reset();
                      policyInput.checked = false;
                      document.querySelectorAll('input').forEach(function(input) {
                        input.classList.remove('not-valid');
                        input.classList.remove('filled');
                      });
                      submitButton.textContent = 'Отправлено!';
                      timer = setTimeout(function() {
                        submitButton.textContent = 'Отправить';
                        clearTimeout(timer);
                      }, 2000);
                  })
                  .catch(function(error) {
                      console.error(error);
                  });
              }
          });
      }
  }
  checkCode();
}

afterBundleLoads(() => {
  initLoadmore();
  if (document.querySelector('.ymap-container') !== null) {
      initMap();
  }
  barba.hooks.enter(initLoadmore);
  barba.hooks.enter(initMap);
  barba.hooks.afterEnter(booking);
  barba.hooks.afterEnter(callback);
});