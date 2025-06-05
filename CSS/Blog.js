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
