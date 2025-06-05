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
const slide = document.querySelectorAll(
  ".carousel-item, .carousel-item-Active"
);

// image slideshow functionality
let currentSlideIndex = 0;
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".nav-dot");
const totalSlides = slides.length;

// Auto-slide functionality
function nextSlideAuto() {
  currentSlideIndex = (currentSlideIndex + 1) % totalSlides;
  showSlide(currentSlideIndex);
}

// Show specific slide
function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });

  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });
}

// Go to specific slide when dot is clicked
function currentSlide(index) {
  currentSlideIndex = index - 1;
  showSlide(currentSlideIndex);
}

// Auto-slide every 4 seconds
setInterval(nextSlideAuto, 3000);

// Footer some script part
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

// Location modal script

// Get DOM elements
const pickupInput = document.getElementById("pickup-input");
const dropInput = document.getElementById("drop-input");
const modal = document.getElementById("locationModal");
const modalHeader = document.getElementById("modal-header");
const modalTitle = document.getElementById("modal-title");
const closeModal = document.getElementById("closeModal");
const searchBox = document.getElementById("searchBox");
const locationList = document.getElementById("locationList");
const locationItems = document.querySelectorAll(".location-item");

let currentInput = null;

// Open modal for pickup
pickupInput.addEventListener("click", function () {
  currentInput = "pickup";
  modalTitle.textContent = "Select Pickup Location";
  modalHeader.className = "modal-header pickup-header";
  searchBox.placeholder = "Search pickup locations...";
  modal.style.display = "block";
  document.body.style.overflow = "hidden";
});

// Open modal for drop
dropInput.addEventListener("click", function () {
  currentInput = "drop";
  modalTitle.textContent = "Select Drop Location";
  modalHeader.className = "modal-header drop-header";
  searchBox.placeholder = "Search drop locations...";
  modal.style.display = "block";
  document.body.style.overflow = "hidden";
});

// Close modal
function closeModalFunction() {
  modal.style.display = "none";
  document.body.style.overflow = "auto";
  searchBox.value = "";
  showAllLocations();
}

closeModal.addEventListener("click", closeModalFunction);

// Close modal when clicking outside
window.addEventListener("click", function (event) {
  if (event.target === modal) {
    closeModalFunction();
  }
});

// Handle location selection
locationItems.forEach((item) => {
  item.addEventListener("click", function () {
    const location = this.getAttribute("data-location");

    if (currentInput === "pickup") {
      pickupInput.value = location;
    } else if (currentInput === "drop") {
      dropInput.value = location;
    }

    closeModalFunction();
  });
});

// Enhanced search functionality
searchBox.addEventListener("input", function () {
  const searchTerm = this.value.toLowerCase().trim();
  let visibleCount = 0;

  locationItems.forEach((item) => {
    const locationText = item.textContent.toLowerCase();

    // Check if the search term matches at the beginning of any word
    const words = locationText.split(/[\s,]+/);
    const startsWithMatch = words.some((word) => word.startsWith(searchTerm));

    // Also check if it's contained anywhere in the text
    const containsMatch = locationText.includes(searchTerm);

    if (searchTerm === "" || startsWithMatch || containsMatch) {
      item.style.display = "block";
      visibleCount++;

      // Highlight matching text
      if (searchTerm !== "") {
        const regex = new RegExp(`(${searchTerm})`, "gi");
        const highlightedText = item
          .getAttribute("data-location")
          .replace(regex, "<mark>$1</mark>");
        item.innerHTML = highlightedText;
      } else {
        item.innerHTML = item.getAttribute("data-location");
      }
    } else {
      item.style.display = "none";
    }
  });

  // Show "No results found" message if no matches
  updateNoResultsMessage(visibleCount, searchTerm);
});

function showAllLocations() {
  locationItems.forEach((item) => {
    item.style.display = "block";
    item.innerHTML = item.getAttribute("data-location");
  });
  document.getElementById("noResults").style.display = "none";
}

function updateNoResultsMessage(visibleCount, searchTerm) {
  const noResults = document.getElementById("noResults");
  if (visibleCount === 0 && searchTerm !== "") {
    noResults.style.display = "block";
  } else {
    noResults.style.display = "none";
  }
}

// Form submission
document.querySelector(".formpage").addEventListener("submit", function (e) {
  e.preventDefault();

  if (!pickupInput.value || !dropInput.value) {
    alert("Please select both pickup and drop locations");
    return;
  }

  if (pickupInput.value === dropInput.value) {
    alert("Pickup and drop locations cannot be the same");
    return;
  }

  // alert(`Checking fare from ${pickupInput.value} to ${dropInput.value}`);
});

// Escape key to close modal
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && modal.style.display === "block") {
    closeModalFunction();
  }
});

// another page sift
function redirectToBooking(event) {
  event.preventDefault(); // prevent form from submitting
  // Example: redirect to Parsal._Book.html
  window.location.href = "Parcel._Book.html";
}
