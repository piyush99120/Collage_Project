function toggleMenu() {
  const navbar = document.getElementById("navbar");
  if (navbar.style.right === "0px") {
    navbar.style.right = "-250px";
  } else {
    navbar.style.right = "0px";
  }
}

// Close menu automatically when resizing to larger screen
window.addEventListener("resize", function () {
  if (window.innerWidth > 800) {
    document.getElementById("navbar").style.right = "-250px";
  }
});
// Add smooth scrolling and interactive effects
document.addEventListener("DOMContentLoaded", function () {
  // Animate statistics when they come into view
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = "running";
      }
    });
  }, observerOptions);

  // Observe all service cards for animation
  document.querySelectorAll(".service-card").forEach((card) => {
    observer.observe(card);
  });

  // Add floating effect to city badges
  document.querySelectorAll(".city-badge").forEach((badge, index) => {
    badge.style.animationDelay = `${index * 0.1}s`;
  });
});
