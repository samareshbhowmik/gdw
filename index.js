document.addEventListener('DOMContentLoaded', function() {
    // Animate title "Green Digital World"
    const text = "Green Digital World";
    const target = document.getElementById('business-name');
    const colors = ['red', 'green', 'blue', 'orange', 'purple', 'brown'];

    let i = 0;
    function nextLetter() {
        if (i < text.length) {
            const span = document.createElement('span');
            span.textContent = text[i];
            span.style.color = colors[i % colors.length];
            target.appendChild(span);
            i++;
            setTimeout(nextLetter, 100); // Adjust for speed
        }
    }
    nextLetter();

    // Slideshow functionality
    let slideIndex = 0;
    let slideTimeout;
    const slides = [
        { src: 'img1.jpg', desc: 'Image 1 description' },
        { src: 'img2.jpg', desc: 'Image 2 description' },
        // Add more images and descriptions as needed
    ];

    const container = document.querySelector('.slideshow-container');
    container.innerHTML = ''; // Clear existing content

    slides.forEach((slide, index) => {
        let img = document.createElement('img');
        img.src = slide.src;
        img.alt = slide.desc;
        img.classList.add('slide');
        img.style.display = index === 0 ? 'block' : 'none'; // Show only the first image initially
        container.appendChild(img);
    });

    function showSlides() {
        let slides = document.querySelectorAll('.slide');
        slides.forEach(slide => slide.style.display = 'none');
        slideIndex++;
        if (slideIndex > slides.length) slideIndex = 1;
        slides[slideIndex - 1].style.display = 'block';
        clearTimeout(slideTimeout);
        slideTimeout = setTimeout(showSlides, 10000); // Change image every 10 seconds
    }
    showSlides();

    // Contact form modal functionality
    const currentYearSpan = document.getElementById('current-year');
    currentYearSpan.textContent = new Date().getFullYear();
    
    const contactUsButton = document.getElementById('contactUsButton');
    const contactFormModal = document.getElementById('contactFormModal');
    const closeButton = document.querySelector('.close-button');

    contactUsButton.onclick = () => contactFormModal.style.display = "block";
    closeButton.onclick = () => contactFormModal.style.display = "none";
    window.onclick = (event) => {
        if (event.target == contactFormModal) {
            contactFormModal.style.display = "none";
        }
    };

    // Form submission
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        alert("You have sent your query successfully. A member of our staff will call you in 48 Hours.");
        contactFormModal.style.display = "none";
    });
});
