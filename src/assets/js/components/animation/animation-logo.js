export default function animationLogo() {
  if ($(".loading").length > 0) {
    let svg = $('.loading svg').drawsvg({
      duration: 1000,
      easing: 'easeInOutQuad'
    });
    setTimeout(function() {
      svg.drawsvg('animate');
    }, 200);
  }
}
animationLogo();