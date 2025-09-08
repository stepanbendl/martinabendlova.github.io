// --- Carousel logic moved inside ---
    const slides = document.querySelectorAll('.review-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlideIndex = 0;
    let autoSlideInterval;
    let autoSlideActive = true; // NEW: Flag to control the auto-slide feature

    if (slides.length > 0) {
        function showSlide(index) {
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            slides[index].classList.add('active');
            dots[index].classList.add('active');
            currentSlideIndex = index;
        }

        function changeSlide(direction) {
            let newIndex = currentSlideIndex + direction;
            if (newIndex >= slides.length) {
                newIndex = 0;
            } else if (newIndex < 0) {
                newIndex = slides.length - 1;
            }
            showSlide(newIndex);
            resetAutoSlide();
        }
        
        // This function is now run by the interval
        function autoSlide() {
            let newIndex = (currentSlideIndex + 1) % slides.length;
            showSlide(newIndex);
        }

        function startAutoSlide() {
            if (autoSlideActive) { // Only start if it's still active
                autoSlideInterval = setInterval(autoSlide, 5000);
            }
        }

        function resetAutoSlide() {
            clearInterval(autoSlideInterval);
            startAutoSlide(); // Will now respect the autoSlideActive flag
        }

        // Event listeners for buttons and dots
        prevBtn.addEventListener('click', () => {
            autoSlideActive = false; // Stop auto-sliding on click
            let newIndex = currentSlideIndex - 1;
            if (newIndex < 0) { newIndex = slides.length - 1; }
            showSlide(newIndex);
            resetAutoSlide();
        });

        nextBtn.addEventListener('click', () => {
            autoSlideActive = false; // Stop auto-sliding on click
            let newIndex = currentSlideIndex + 1;
            if (newIndex >= slides.length) { newIndex = 0; }
            showSlide(newIndex);
            resetAutoSlide();
        });

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                autoSlideActive = false; // Stop auto-sliding on click
                showSlide(index);
                resetAutoSlide();
            });
        });

        // Pause auto-slide on hover
        const carousel = document.querySelector('.reviews-carousel');
        if (carousel) {
            carousel.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
            carousel.addEventListener('mouseleave', () => resetAutoSlide()); // Will correctly not restart if stopped
        }

        // Initialize
        showSlide(0);
        startAutoSlide();
    }