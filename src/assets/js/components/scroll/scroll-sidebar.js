export default function scrollSidebar() {
  let sidebar = $('.popup__inner');
  let container = $('.popup__container');
  if (sidebar.scrollTop() > sidebar.height()) {
    container.addClass('no-fade');
  } else {
    container.removeClass('no-fade');
  }
  if (sidebar.scrollTop == 0) {
    container.removeClass('no-fade');
  }
}
scrollSidebar();

$('.popup__inner').on("scroll", scrollSidebar);