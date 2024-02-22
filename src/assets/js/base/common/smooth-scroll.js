import SmoothScroll from "smooth-scroll";

function smoothScroll() {
  let offset;
  function checkWidth() {
    let width = $(window).width();
    if (width > 768) {
      offset = 140;
    }
    if (width > 1224) {
      offset = 100;
    }
    if (width > 1536) {
      offset = 160;
    }
  }
  checkWidth();
  $(window).on('resize', function() {
    checkWidth();
  })
  new SmoothScroll('a[href*="#"]', {
    speed: 400,
    after: function () {
      $("body").css("overflow", "");
    },
    offset: offset
  });
}
smoothScroll();