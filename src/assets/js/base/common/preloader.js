import gsap from "gsap";

function renderPage() {
  const render = $(".render");
  const loader = $(".loader");
  gsap
    .fromTo(
      render,
      0.5,
      { opacity: "1", zIndex: "99999" },
      { opacity: "0", zIndex: "-1", onComplete: () => {
        render.remove();
      }}
    )
    .delay(0.4);
  if (localStorage.getItem('loader') !== undefined && localStorage.getItem('loader') !== 'false') {
    gsap
      .fromTo(
        loader,
        0.5,
        { opacity: "1", zIndex: "99998" },
        { opacity: "0", zIndex: "-1", onComplete: () => {
          loader.remove();
          localStorage.setItem('loader', 'false');
        }}
      )
      .delay(1.5);
  } else {
    loader.remove();
  }
}
renderPage();