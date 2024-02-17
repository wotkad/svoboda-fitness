import SmoothScroll from "smooth-scroll";

function smoothScroll() {
  new SmoothScroll('a[href*="#"]', {
    speed: 400,
    after: function () {
      $("body").css("overflow", "");
    },
    offset: 100
  });
}
smoothScroll();