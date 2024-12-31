// Responsive Navbar
const menuBtn = document.querySelector(".menu-btn");
const navList = document.querySelector(".nav-list");

menuBtn.addEventListener("click", () => {
    navList.classList.toggle("active");
});

// Initialize Owl Carousel for Testimonials
$(document).ready(function () {
    $(".owl-carousel").owlCarousel({
        loop: true,
        margin: 10,
        autoplay: true,
        autoplayTimeout: 3000,
        responsive: {
            0: { items: 1 },
            600: { items: 2 },
            1000: { items: 3 }
        }
    });
});

document.querySelector(".course-list").addEventListener("click", () => {
    console.log("fetch course")
    fetch('http://localhost:5000/api/courses')
        .then(response => response.json())
        .then(courses => {

            const coursesList = document.getElementById('course-list');
            courses.forEach(course => {
                console.log("course adta", JSON.stringify(course));
                const courseCard = document.createElement('div');
                courseCard.classList.add('course-card');
                courseCard.innerHTML = `
                    <img src="${course.img}" alt="${course.title}">
                    <div class="category">
                    <div class="subject">
							<h3>${course.title}</h3>
						</div>
                    <p>${course.description}</p>
                    </div>
                `;
                coursesList.appendChild(courseCard); // Add the card to the list
                // Populate the courses section dynamically
            })
                .catch(error => console.error('Error fetching courses:', error));
        })
});

document.querySelector(".testimonials").addEventListener("click", () => {
    console.log("fetch testimonials")
    fetch('http://localhost:5000/api/testimonials') // Replace with your actual API endpoint
        .then(response => response.json())
        .then(testimonials => {
            console.log("fetch testimonials---", JSON.stringify(testimonials))
            const testimonialsList = document.getElementById('testimonials-list');
            testimonials.forEach(testimonial => {
                const testimonialCard = document.createElement('div');
                testimonialCard.classList.add('testimonials-item');
                testimonialCard.innerHTML = `
                <div class="profile">
                    <div class="profile-image">
                        <img src="${testimonial.img}" alt="${testimonial.name}">
                    </div>
                    <div class="profile-desc">
                        <span>${testimonial.name}</span>
                    </div>
                </div>
                <p>${testimonial.feedback}</p>
                <p>${testimonial.description}</p>
					<div class="quote">
						<i class="fa fa-quote-left"></i>
					</div>
                <div class="ratings">
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                </div>
            `;
                testimonialsList.appendChild(testimonialCard);
            });
        })
        .catch(error => {
            console.error('Error fetching testimonials:', error);
            document.getElementById('testimonials-list').innerHTML = `<p>Error loading testimonials.</p>`;
        });
});
// Search Bar Alert (Optional for Demo)
document.querySelector(".search-bar i").addEventListener("click", () => {
    const query = document.querySelector(".search-bar input").value;
    alert(`Searching for: ${query}`);


});

// Smooth Scrolling for Navigation Links
document.querySelectorAll(".nav-list a").forEach(link => {
    link.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href").substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: "smooth"
            });
        }
    });
});



// Include EmailJS SDK
(function () {
    emailjs.init("YOUR_PUBLIC_KEY"); // ////Replace with your EmailJS public key
})();

document.querySelector(".newsletter").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent default form submission

    const emailInput = document.querySelector(".newsletter input[type='email']");
    const emailValue = emailInput.value.trim();

    // Validate the email address
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(emailValue)) {
        alert("Please enter a valid email address.");
        return;
    }

    // Sending email using EmailJS
    emailjs
        .send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
            user_email: emailValue,
        })
        .then(
            function (response) {
                alert("Thank you for subscribing! Your email has been sent successfully.");
                emailInput.value = ""; // Clear the email input field
            },
            function (error) {
                alert("Oops! Something went wrong. Please try again later.");
                console.error("EmailJS Error:", error);
            }
        );
});

