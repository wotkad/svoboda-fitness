function animationLogo() {
  if ($(".loader").length > 0) {
    let svg = $('.loader svg').drawsvg({
      duration: 1000,
      easing: 'easeInOutQuad'
    });
    setTimeout(function() {
      svg.drawsvg('animate');
    }, 200);
  }
}
animationLogo();