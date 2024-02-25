import gsap from "gsap";

function renderPage() {
  const render = $(".render");
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
  if ($(".loading").length > 0) {
    const loading = $(".loading");
    if (localStorage.getItem('loading') !== undefined && localStorage.getItem('loading') !== 'false') {
      gsap
        .fromTo(
          loading,
          0.5,
          { opacity: "1", zIndex: "99998" },
          { opacity: "0", zIndex: "-1", onComplete: () => {
            loading.remove();
            localStorage.setItem('loading', 'false');
          }}
        )
        .delay(1.5);
    } else {
      loading.remove();
    }
  }
}
renderPage();