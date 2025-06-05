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
    document.getElementById("navbar").style.right = "-25  0px";
  }
});

let currentIndex = 0;
const slides = document.querySelectorAll(
  ".carousel-item, .carousel-item-Active"
);

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.style.display = i === index ? "flex" : "none";
  });
  currentIndex = index;
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  showSlide(currentIndex);
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  showSlide(currentIndex);
}

// Auto-slide every 5 seconds
setInterval(nextSlide, 3000);

// Initial Display
showSlide(currentIndex);

//   script for import part

function an_hidden() {
  let hidden = document.getElementsByClassName("over-view")[0];
  hidden.style.display = "block";
  let view = document.getElementsByClassName("hidden-text-part")[0];
  view.style.display = "flex";
  // document.getElementById("an-hidde").style.display = "block";
  // document.getElementById("an-hidde").style.backgroundColor = "block"
}
document.getElementById("close-btn").addEventListener("click", function () {
  // window.location.href = "Mainwork.html";
  document.querySelector(".hidden-text-part").style.display = "none";
  document.querySelector(".over-view ").style.display = "none";
});

let citydata = document.getElementsByClassName("city");
console.log(citydata);

for (let i = 0; i < citydata.length; i++) {
  let data = document.getElementsByTagName("h4")[i].innerHTML;
  citydata[i].addEventListener("click", function () {
    document.getElementById("ch-city").innerHTML = data;
    document.querySelector(".hidden-text-part").style.display = "none";
    document.querySelector(".over-view ").style.display = "none";
  });
}

function modal() {
  console.log("hi this is divyanshu patil ji");
  let hidden = document.getElementsByClassName("over-view")[0];
  hidden.style.display = "block";
  let view = document.getElementsByClassName("details-main-contain")[0];
  view.style.display = "flex";
}
function an_hidden2() {
  document.querySelector(".details-main-contain").style.display = "none";
  document.querySelector(".over-view ").style.display = "none";
}

// Card script
let currentFilter = "all";

function filterCards(type) {
  const cards = document.querySelectorAll(".transport-card");
  const fullLoadBtn = document.getElementById("full-load-btn");
  const halfLoadBtn = document.getElementById("half-load-btn");

  // Remove active class from both buttons
  fullLoadBtn.classList.remove("active");
  halfLoadBtn.classList.remove("active");

  if (currentFilter === type) {
    // If clicking the same filter, show all cards
    currentFilter = "all";
    cards.forEach((card) => {
      card.classList.remove("hidden");
    });
  } else {
    // Filter cards based on selected type
    currentFilter = type;

    // Add active class to clicked button
    if (type === "full") {
      fullLoadBtn.classList.add("active");
    } else {
      halfLoadBtn.classList.add("active");
    }

    cards.forEach((card) => {
      const loadType = card.getAttribute("data-load-type");
      if (loadType === type) {
        card.classList.remove("hidden");
      } else {
        card.classList.add("hidden");
      }
    });
  }
}

// service script

document.querySelectorAll(".service-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.querySelector(".read-more").style.color = "#ff5722";
    card.querySelector(".arrow").style.transform = "translateX(3px)";
  });

  card.addEventListener("mouseleave", () => {
    card.querySelector(".read-more").style.color = "#333";
    card.querySelector(".arrow").style.transform = "translateX(0)";
  });
});

// process part decribe

document.addEventListener("DOMContentLoaded", () => {
  const stepCards = document.querySelectorAll(".step-card");

  stepCards.forEach((card) => {
    card.addEventListener("click", () => {
      // Remove active class from all cards
      stepCards.forEach((c) => c.classList.remove("active"));

      // Add active class to clicked card
      card.classList.add("active");
    });

    // Hover effect for the arrow icon
    const stepLink = card.querySelector(".step-link");
    const arrowIcon = stepLink.querySelector(".arrow-icon");

    stepLink.addEventListener("mouseenter", () => {
      arrowIcon.style.transform = "translateX(4px)";
    });

    stepLink.addEventListener("mouseleave", () => {
      arrowIcon.style.transform = "translateX(0)";
    });
  });
});

// Footer script

// Animated counter for stats
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);

  function updateCounter() {
    start += increment;
    if (start < target) {
      element.textContent = Math.floor(start);
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target;
    }
  }
  updateCounter();
}

// Intersection Observer for stats animation
const observerOptions = {
  threshold: 0.5,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const statNumbers = entry.target.querySelectorAll(".stat-number");
      statNumbers.forEach((stat) => {
        const target = parseInt(stat.getAttribute("data-target"));
        animateCounter(stat, target);
      });
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe stats section
const statsSection = document.querySelector(".stats-section");
if (statsSection) {
  observer.observe(statsSection);
}

// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Add floating particles effect
function createParticle() {
  const particle = document.createElement("div");
  particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: radial-gradient(circle, #ff6b6b, transparent);
                border-radius: 50%;
                pointer-events: none;
                opacity: 0.6;
                animation: float 8s linear infinite;
            `;

  particle.style.left = Math.random() * 100 + "%";
  particle.style.animationDelay = Math.random() * 8 + "s";

  document.querySelector(".footer-container").appendChild(particle);

  setTimeout(() => {
    particle.remove();
  }, 8000);
}

// Create particles periodically
setInterval(createParticle, 3000);

// Start counter animation immediately
window.addEventListener("load", function () {
  const statNumbers = document.querySelectorAll(".stat-number");
  statNumbers.forEach((stat) => {
    const target = parseInt(stat.getAttribute("data-target"));
    animateCounter(stat, target);
  });
});
function redirectToBooking(event) {
  event.preventDefault(); // prevent form from submitting
  // Example: redirect to Parsal._Book.html
  window.location.href = "Truck.html";
}
function redirectToBookings(event) {
  event.preventDefault(); // prevent form from submitting
  // Example: redirect to Parsal._Book.html
  window.location.href = "Two-Wheelers.html";
}

// custom script
function viewTestimonials() {
  alert("View Testimonials clicked!");
}

// Simple hover effects
document.querySelectorAll(".testimonial-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
    this.style.transform = "translateY(-2px)";
    this.style.transition = "all 0.3s ease";
  });

  card.addEventListener("mouseleave", function () {
    this.style.boxShadow = "none";
    this.style.transform = "translateY(0)";
  });
});

// Animate numbers counting up
function animateNumbers() {
  const counters = document.querySelectorAll(".stat-number");

  counters.forEach((counter) => {
    const target = parseInt(counter.getAttribute("data-target"));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        counter.textContent = target;
        clearInterval(timer);
      } else {
        counter.textContent = Math.floor(current);
      }
    }, 16);
  });
}

