document.addEventListener("DOMContentLoaded", function () {
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileLinks = mobileMenu.querySelectorAll("a");
  const indicator = mobileMenu.querySelector(".mobile-indicator");

  let activeIndex = 0;

  hamburgerBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // zabrání zavření hned
    mobileMenu.classList.toggle("active");

    moveIndicator(activeIndex);
  });

  document.addEventListener("click", function (event) {
    if (
      !mobileMenu.contains(event.target) &&
      !hamburgerBtn.contains(event.target)
    ) {
      mobileMenu.classList.remove("active");
    }
  });

  function moveIndicator(index) {
    const link = mobileLinks[index];
    if (link) {
      indicator.style.top = link.offsetTop + "px";
      indicator.style.width = link.offsetWidth + "px";
    }
  }

  mobileLinks.forEach((link, index) => {
    link.addEventListener("mouseenter", () => {
      moveIndicator(index);
    });

    link.addEventListener("mouseleave", () => {
      moveIndicator(activeIndex);
    });

    link.addEventListener("click", () => {
      activeIndex = index;
      moveIndicator(index);
    });
  });
});
