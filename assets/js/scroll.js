/* ==========================================================================
   PHASE 19 — CURSOR GLOW INTERACTION LAYER
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  // Performance-optimized global execution wrapper for fluid mouse track glowing effects
  if (window.innerWidth > 768) {
    const glowRing = document.createElement("div");
    glowRing.style.position = "fixed";
    glowRing.style.width = "400px";
    glowRing.style.height = "400px";
    glowRing.style.background =
      "radial-gradient(circle, rgba(167,141,120,0.08) 0%, rgba(0,0,0,0) 70%)";
    glowRing.style.borderRadius = "50%";
    glowRing.style.pointerEvents = "none";
    glowRing.style.zIndex = "1";
    glowRing.style.transform = "translate(-50%, -50%)";
    glowRing.style.transition = "transform 0.1s linear";

    document.body.appendChild(glowRing);

    document.addEventListener("mousemove", (e) => {
      glowRing.style.left = `${e.clientX}px`;
      glowRing.style.top = `${e.clientY}px`;
    });
  }
});
