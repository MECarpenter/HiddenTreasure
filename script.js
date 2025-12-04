"use strict";

document.addEventListener("DOMContentLoaded", () => {

    /* ============================================
         THEME TOGGLE
    ============================================= */
    const toggle = document.getElementById("modeToggle");
    toggle.addEventListener("click", () => {
        const currentTheme = document.documentElement.getAttribute("data-theme");
        document.documentElement.setAttribute(
            "data-theme",
            currentTheme === "dark" ? "light" : "dark"
        );
    });

    /* ============================================
         CONTACT FORM VALIDATION
    ============================================= */
    const form = document.getElementById("contactForm");
    const formMessage = document.getElementById("formMessage");

    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();
            formMessage.innerHTML = "";

            const errorElements = form.querySelectorAll(".error-message");
            errorElements.forEach(el => el.remove());

            let isValid = true;

            const firstName = form.firstName.value.trim();
            const lastName = form.lastName.value.trim();
            const phone = form.phone.value.trim();
            const email = form.email.value.trim();
            const contactMethod = form.querySelector("input[name='contactMethod']:checked");
            const comments = form.comments.value.trim();

            const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
            const phonePattern = /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;

            function showError(fieldId, message) {
                isValid = false;
                const field = document.getElementById(fieldId);
                const error = document.createElement("div");
                error.classList.add("error-message");
                error.textContent = message;
                field.parentNode.appendChild(error);
            }

            if (firstName === "") showError("firstName", "First name is required.");
            if (lastName === "") showError("lastName", "Last name is required.");
            if (comments === "") showError("comments", "Please enter your comments.");

            if (!contactMethod) {
                showError("phone", "Please select how you'd like to be contacted.");
            } else {
                if (contactMethod.value === "phone" && !phonePattern.test(phone)) {
                    showError("phone", "Please enter a valid phone number.");
                }
                if (contactMethod.value === "email" && !emailPattern.test(email)) {
                    showError("email", "Please enter a valid email address.");
                }
            }

            if (isValid) {
                const customer = {
                    name: `${firstName} ${lastName}`,
                    phone,
                    email,
                    preferredContact: contactMethod.value,
                    comments
                };

                formMessage.innerHTML = `
          <div class="success-box">
            <strong>Thank you for your submission!</strong><br>
            Name: ${customer.name}<br>
            Preferred Contact: ${customer.preferredContact}<br>
            ${customer.preferredContact === "phone" ? `Phone: ${customer.phone}` : `Email: ${customer.email}`}<br>
            Message: ${customer.comments}
          </div>
        `;

                form.reset();
            }
        });
    }

    /* ============================================
         LOGO ROTATION — 90s Color Logo Effect
    ============================================= */
    const logoImages = [
        "images/logo.png",
        "images/logo1.png",
        "images/logo2.png",
        "images/logo3.png",
        "images/logo4.png",
        "images/logo5.png"
    ];

    let logoIndex = 0;
    const logoElement = document.getElementById("animatedLogo");

    function rotateLogo() {
        logoElement.classList.add("fade-out");

        setTimeout(() => {
            logoIndex = (logoIndex + 1) % logoImages.length;
            logoElement.src = logoImages[logoIndex];
            logoElement.classList.remove("fade-out");
        }, 500);
    }

    setInterval(rotateLogo, 2000);

    /* ============================================
         PRODUCT CAROUSEL
    ============================================= */
    const carousels = document.querySelectorAll(".carousel-container");

    carousels.forEach(carousel => {
        const track = carousel.querySelector(".carousel-track");
        const slides = carousel.querySelectorAll(".carousel-slide");
        const prevBtn = carousel.querySelector(".carousel-btn.prev");
        const nextBtn = carousel.querySelector(".carousel-btn.next");

        let currentIndex = 0;
        const slideWidth = slides[0].offsetWidth + 20;

        function updateCarousel() {
            const newTransform = -currentIndex * slideWidth;
            track.style.transform = `translateX(${newTransform}px)`;
        }

        nextBtn.addEventListener("click", () => {
            if (currentIndex < slides.length - 1) {
                currentIndex++;
                updateCarousel();
            }
        });

        prevBtn.addEventListener("click", () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        });

        window.addEventListener("resize", updateCarousel);
    });

});