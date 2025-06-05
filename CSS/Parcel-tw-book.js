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

// Two Wheeler Dropdown functionality
document.addEventListener("DOMContentLoaded", function () {
  const truckDropdownBtn = document.getElementById("truckDropdownBtn");
  const truckDropdownMenu = document.getElementById("truckDropdownMenu");
  const selectedTruck = document.getElementById("selectedTruck");
  const dropdownArrow = document.querySelector(".dropdown-arrow");

  // Only add event listeners if elements exist
  if (truckDropdownBtn && truckDropdownMenu) {
    truckDropdownBtn.addEventListener("click", function () {
      truckDropdownMenu.classList.toggle("show");
      truckDropdownBtn.classList.toggle("active");
      if (dropdownArrow) {
        dropdownArrow.classList.toggle("rotated");
      }
    });

    // Vehicle selection
    document.querySelectorAll(".dropdown-item").forEach((item) => {
      item.addEventListener("click", function () {
        const vehicleName = this.querySelector(".vehicle-name").textContent;
        if (selectedTruck) {
          selectedTruck.textContent = vehicleName;
        }
        truckDropdownMenu.classList.remove("show");
        truckDropdownBtn.classList.remove("active");
        if (dropdownArrow) {
          dropdownArrow.classList.remove("rotated");
        }

        truckDropdownBtn.dataset.selected = this.dataset.value;
      });
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", function (event) {
      if (!event.target.closest(".dropdown")) {
        truckDropdownMenu.classList.remove("show");
        truckDropdownBtn.classList.remove("active");
        if (dropdownArrow) {
          dropdownArrow.classList.remove("rotated");
        }
      }
    });
  }

  // Parcel type selection
  document.querySelectorAll(".goods-option").forEach((option) => {
    option.addEventListener("click", function () {
      document
        .querySelectorAll(".goods-option")
        .forEach((opt) => opt.classList.remove("selected"));
      this.classList.add("selected");
    });
  });

  // Form validation for booking form
  const bookingForm = document.getElementById("bookingForm");
  if (bookingForm) {
    bookingForm.addEventListener("submit", function (event) {
      const selectedVehicleElement = document.getElementById("selectedTruck");
      if (
        selectedVehicleElement &&
        selectedVehicleElement.textContent === "Select Two Wheeler"
      ) {
        alert("Please select a two wheeler type.");
        event.preventDefault();
        return;
      }

      const selectedParcel = document.querySelector(".goods-option.selected");
      if (!selectedParcel) {
        alert("Please select a parcel type.");
        event.preventDefault();
        return;
      }

      const weightInput = document.getElementById("parcelNumber");
      if (weightInput && (weightInput.value <= 0 || weightInput.value > 30)) {
        alert("Please enter a valid weight between 0.1 and 30 KG");
        event.preventDefault();
        return;
      }
    });
  }
});

function goBack() {
  window.history.back();
}
