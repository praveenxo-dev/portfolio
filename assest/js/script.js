// Floating nav behavior
const nav = document.querySelector(".floating-nav");
const indicator = document.querySelector(".nav-indicator");
let lastScroll = 0;

// On page load → nav is visible
nav.classList.remove("hide");

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll > lastScroll && currentScroll > 50) {
    nav.classList.add("hide");
    indicator.classList.add("show");
  } else {
    nav.classList.remove("hide");
    indicator.classList.remove("show");
  }
  lastScroll = currentScroll;
});

// Show nav when mouse goes near top
document.addEventListener("mousemove", (e) => {
  if (e.clientY < 50) {
    nav.classList.remove("hide");
    indicator.classList.remove("show");
  }
});

// Simple particle background
const canvas = document.getElementById("particles");
if (canvas) {
  const ctx = canvas.getContext("2d");
  let particles = [];
  let w, h;

  function initCanvas() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    particles = [];
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 2 + 1,
        dx: (Math.random() - 0.5) * 0.5,
        dy: (Math.random() - 0.5) * 0.5,
      });
    }
  }
  function drawParticles() {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "rgba(255,255,255,0.6)";
    particles.forEach((p) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
      p.x += p.dx;
      p.y += p.dy;
      if (p.x < 0 || p.x > w) p.dx *= -1;
      if (p.y < 0 || p.y > h) p.dy *= -1;
    });
    requestAnimationFrame(drawParticles);
  }
  window.addEventListener("resize", initCanvas);
  initCanvas();
  drawParticles();
}
