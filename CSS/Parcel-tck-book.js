// Global variables for OTP system
let userMobile = "";
let generatedOTP = "";

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

let currentIndex = 0;
const slide = document.querySelectorAll(
  ".carousel-item, .carousel-item-Active"
);

// Truck Dropdown functionality
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

    // Truck selection
    document.querySelectorAll(".dropdown-item").forEach((item) => {
      item.addEventListener("click", function () {
        const truckName = this.querySelector(".truck-name").textContent;
        if (selectedTruck) {
          selectedTruck.textContent = truckName;
        }
        truckDropdownMenu.classList.remove("show");
        truckDropdownBtn.classList.remove("active");
        if (dropdownArrow) {
          dropdownArrow.classList.remove("rotated");
        }

        truckDropdownBtn.dataset.selected = this.dataset.value;
        if (typeof checkFormCompletion === "function") {
          checkFormCompletion();
        }
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

  // Goods type selection
  document.querySelectorAll(".goods-option").forEach((option) => {
    option.addEventListener("click", function () {
      document
        .querySelectorAll(".goods-option")
        .forEach((opt) => opt.classList.remove("selected"));
      this.classList.add("selected");
      if (typeof checkFormCompletion === "function") {
        checkFormCompletion();
      }
    });
  });

  // Form validation for booking form (if exists)
  const bookingForm = document.getElementById("bookingForm");
  if (bookingForm) {
    bookingForm.addEventListener("submit", function (event) {
      const selectedTruckElement = document.getElementById("selectedTruck");
      if (
        selectedTruckElement &&
        selectedTruckElement.textContent === "Select Truck"
      ) {
        alert("Please select a truck type.");
        event.preventDefault();
        return;
      }

      const selectedGoods = document.querySelector(".goods-option.selected");
      if (!selectedGoods) {
        alert("Please select a goods type.");
        event.preventDefault();
        return;
      }
    });
  }
});

function goBack() {
  window.history.back();
}

// OTP System Functions
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function showError(elementId, message) {
  const errorElement = document.getElementById(elementId);
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.style.display = "block";
    setTimeout(() => {
      errorElement.style.display = "none";
    }, 5000);
  }
}

function showSuccess(elementId, message) {
  const successElement = document.getElementById(elementId);
  if (successElement) {
    successElement.textContent = message;
    successElement.style.display = "block";
    setTimeout(() => {
      successElement.style.display = "none";
    }, 3000);
  }
}

function validateMobile(mobile) {
  // Remove any non-digit characters
  const cleanMobile = mobile.replace(/\D/g, "");

  // Check if it's exactly 10 digits
  if (cleanMobile.length === 10) {
    return cleanMobile;
  }

  // Check if it's 12 digits starting with 91
  if (cleanMobile.length === 12 && cleanMobile.startsWith("91")) {
    return cleanMobile.substring(2);
  }

  return null;
}

// Mobile form submission
document.addEventListener("DOMContentLoaded", function () {
  const mobileForm = document.getElementById("mobileForm");
  if (mobileForm) {
    mobileForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const mobileInput = document.getElementById("mobileNumber");
      if (!mobileInput) return;

      const mobile = mobileInput.value.trim();

      // Validate mobile number
      const validMobile = validateMobile(mobile);

      if (!validMobile) {
        showError("mobileError", "Please enter a valid 10-digit mobile number");
        return;
      }

      // Store mobile number and generate OTP
      userMobile = validMobile;
      generatedOTP = generateOTP();

      // Update display elements
      const displayMobileElement = document.getElementById("displayMobile");
      const generatedOtpElement = document.getElementById("generatedOtp");

      if (displayMobileElement) {
        displayMobileElement.textContent = "+91 " + userMobile;
      }
      if (generatedOtpElement) {
        generatedOtpElement.textContent = generatedOTP;
      }

      // Hide mobile section and show OTP section
      const mobileSection = document.getElementById("mobileSection");
      const otpSection = document.getElementById("otpSection");

      if (mobileSection && otpSection) {
        mobileSection.style.display = "none";
        otpSection.style.display = "flex";
      }

      // Clear mobile input
      mobileInput.value = "";

      // Focus on OTP input
      const otpInput = document.getElementById("otpInput");
      if (otpInput) {
        setTimeout(() => otpInput.focus(), 100);
      }
    });
  }

  // OTP form submission
  const otpForm = document.getElementById("otpForm");
  if (otpForm) {
    otpForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const otpInput = document.getElementById("otpInput");
      if (!otpInput) return;

      const enteredOTP = otpInput.value.trim();

      // Validate OTP length
      if (enteredOTP.length !== 6) {
        showError("otpError", "Please enter a 6-digit OTP");
        return;
      }

      // Check if OTP matches
      if (enteredOTP === generatedOTP) {
        showSuccess("otpSuccess", "OTP verified successfully! Redirecting...");
        document.getElementById("Booking-Done-hai").style.display = "flex";
        document.getElementById("Booking-Done-hai").style.marginTop = "3rem";
        document.getElementById("otpSection").style.display = "none";
        document.getElementById("mobileSection").style.display = "none";

        // Clear any error messages
        const otpError = document.getElementById("otpError");
        if (otpError) {
          otpError.style.display = "none";
        }

        // Simulate redirect after 2 seconds
        setTimeout(() => {
          alert(
            "Verification successful! You can now proceed to the next step."
          );
          // Here you can redirect to the next page
          // window.location.href = 'next-page.html';
        }, 2000);
      } else {
        showError("otpError", "Invalid OTP. Please try again.");
        otpInput.value = "";
        otpInput.focus();
      }
    });
  }

  // Restrict OTP input to 6 digits
  const otpInput = document.getElementById("otpInput");
  if (otpInput) {
    otpInput.addEventListener("input", function (e) {
      const value = e.target.value;
      if (value.length > 6) {
        e.target.value = value.slice(0, 6);
      }
    });
  }

  // Auto-focus on mobile number input when page loads
  const mobileNumberInput = document.getElementById("mobileNumber");
  if (mobileNumberInput) {
    mobileNumberInput.focus();
  }
});

// Back to mobile number section
function backToMobile() {
  const otpSection = document.getElementById("otpSection");
  const mobileSection = document.getElementById("mobileSection");

  if (otpSection && mobileSection) {
    otpSection.style.display = "none";
    mobileSection.style.display = "flex";
  }

  // Clear OTP input
  const otpInput = document.getElementById("otpInput");
  if (otpInput) {
    otpInput.value = "";
  }

  // Clear any error/success messages
  const otpError = document.getElementById("otpError");
  const otpSuccess = document.getElementById("otpSuccess");

  if (otpError) {
    otpError.style.display = "none";
  }
  if (otpSuccess) {
    otpSuccess.style.display = "none";
  }

  // Focus back on mobile input
  const mobileInput = document.getElementById("mobileNumber");
  if (mobileInput) {
    setTimeout(() => mobileInput.focus(), 100);
  }

  // Reset stored values
  userMobile = "";
  generatedOTP = "";
}

// bookin confirm work


