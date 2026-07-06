/* ==========================================================================
   PHASE 15 — LIGHTWEIGHT SCROLL PARSING ANIMATION SYSTEM
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  // Element Detection Intersection Engine
  const revealTargets = document.querySelectorAll(".scroll-reveal");

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");

          // Custom Hook: Trigger Progress bars width loading when section surfaces
          if (entry.target.classList.contains("skills-bars-container")) {
            animateTechnicalProgressBars();
          }

          // Custom Hook: Trigger Numerical Count Up metrics when stats come into view
          if (entry.target.classList.contains("stats-counter-strip")) {
            triggerStatCounters();
          }
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -20px 0px",
    },
  );

  revealTargets.forEach((target) => revealObserver.observe(target));

  function animateTechnicalProgressBars() {
    const bars = document.querySelectorAll(".bar-fill");
    bars.forEach((bar) => {
      const targetWidth = bar.getAttribute("data-width");
      bar.style.width = targetWidth;
    });
  }

  function triggerStatCounters() {
    const counters = document.querySelectorAll(".counter");
    counters.forEach((counter) => {
      if (counter.classList.contains("counted")) return;

      const target = parseInt(counter.getAttribute("data-target"));
      const duration = 1800; // Count speed
      const stepTime = Math.max(Math.floor(duration / target), 15);
      let start = 0;

      const timer = setInterval(() => {
        start += 1;
        counter.textContent =
          start + (counter.getAttribute("data-target") === "100" ? "%" : "+");

        if (start >= target) {
          counter.textContent =
            target +
            (counter.getAttribute("data-target") === "100" ? "%" : "+");
          clearInterval(timer);
          counter.classList.add("counted");
        }
      }, stepTime);
    });
  }
});
