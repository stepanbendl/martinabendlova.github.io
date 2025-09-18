document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Menu Toggle ---
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // --- Carousel logic ---
    const slides = document.querySelectorAll('.review-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (slides.length > 0) {
        let currentSlideIndex = 0;
        let autoSlideInterval;
        let autoSlideActive = true;

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
        
        function autoSlide() {
            if (autoSlideActive) {
                let newIndex = (currentSlideIndex + 1) % slides.length;
                showSlide(newIndex);
            }
        }

        function startAutoSlide() {
            if (autoSlideActive) {
                autoSlideInterval = setInterval(autoSlide, 5000);
            }
        }

        function resetAutoSlide() {
            clearInterval(autoSlideInterval);
            startAutoSlide();
        }

        prevBtn.addEventListener('click', () => {
            autoSlideActive = false;
            changeSlide(-1);
        });

        nextBtn.addEventListener('click', () => {
            autoSlideActive = false;
            changeSlide(1);
        });

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                autoSlideActive = false;
                showSlide(index);
                resetAutoSlide();
            });
        });

        const carousel = document.querySelector('.reviews-carousel');
        if (carousel) {
            carousel.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
            carousel.addEventListener('mouseleave', () => {
                if(autoSlideActive) {
                    resetAutoSlide()
                }
            });
        }

        showSlide(0);
        startAutoSlide();
    }
});