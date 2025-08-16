// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if(menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            toggleMenuIcon();
        });
    }
    
    // Close mobile menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            toggleMenuIcon(false);
        });
    });
    
    // Function to toggle menu icon animation
    function toggleMenuIcon(show) {
        const spans = menuToggle.querySelectorAll('span');
        if(show === false || navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    }
    
    // Header scroll effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', function() {
        if(window.scrollY > 50) {
            header.style.padding = '10px 0';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.padding = '15px 0';
            header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // Form submission
    const contactForm = document.getElementById('contact-form');
        if(contactForm) {
            contactForm.addEventListener('submit', function(e) {
                // Let the form submit naturally to Formspree
                // Show loading state
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Odesílání...';
                submitBtn.disabled = true;
                
                // Re-enable after a delay (Formspree will handle the redirect)
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            });
        }
    
    // Intersection Observer for fade-in animations
    // This could be enhanced with actual CSS animations in a full implementation
    const observerOptions = {
        threshold: 0.2
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
});