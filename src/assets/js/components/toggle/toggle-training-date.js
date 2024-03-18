export default function toggleTrainingDate() {
  let button = $('.schedule-table__training');
  for (let i = 0; i < Array.from(button).length; i++) {
    $(button[i]).on('click', function () {
      let day = $(this).siblings('.schedule-table__head').find('.schedule-table__day').text();
      let date = $(this).siblings('.schedule-table__head').find('.schedule-table__date').text();
      let id = button[i].getAttribute('data-popup-button');
      let block = $('.popup[data-popup="' + id + '"]');
      $(block).attr('data-id', $(this).attr('data-id')).find('.popup__date').text(`${day} ${date}`);
    });
  }
}
toggleTrainingDate();