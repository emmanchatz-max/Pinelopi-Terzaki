document.addEventListener('DOMContentLoaded', () => {
    
    // Navbar Scroll Effect
    const header = document.querySelector('header');
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('navbar-scrolled');
            header.classList.remove('navbar-transparent');
        } else {
            header.classList.remove('navbar-scrolled');
            header.classList.add('navbar-transparent');
        }
    };
    window.addEventListener('scroll', handleScroll);

    // Scroll Reveal Animation
    const revealItems = document.querySelectorAll('.scroll-reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // If it's an image container, also activate the reveal effect
                if (entry.target.classList.contains('reveal-image-container')) {
                    entry.target.classList.add('active');
                }
            }
        });
    }, { threshold: 0.15 });

    revealItems.forEach(item => revealObserver.observe(item));

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all items
            faqItems.forEach(i => i.classList.remove('active'));
            
            // Toggle clicked item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Before/After Slider
    const container = document.querySelector('.before-after-container');
    const beforeOverlay = document.querySelector('.before-overlay');
    const handle = document.querySelector('.slider-handle');

    if (container && beforeOverlay && handle) {
        let isResizing = false;

        const setPosition = (x) => {
            const rect = container.getBoundingClientRect();
            let position = ((x - rect.left) / rect.width) * 100;
            
            if (position < 0) position = 0;
            if (position > 100) position = 100;

            beforeOverlay.style.width = `${position}%`;
            handle.style.left = `${position}%`;
        };

        container.addEventListener('mousedown', () => isResizing = true);
        window.addEventListener('mouseup', () => isResizing = false);
        
        container.addEventListener('mousemove', (e) => {
            if (!isResizing) return;
            setPosition(e.pageX);
        });

        // Touch support
        container.addEventListener('touchstart', () => isResizing = true);
        window.addEventListener('touchend', () => isResizing = false);
        container.addEventListener('touchmove', (e) => {
            if (!isResizing) return;
            setPosition(e.touches[0].pageX);
        });
    }

    // Mobile Menu
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');
    
    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileBtn.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
        });

        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileBtn.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
    }

    // Smooth Scroll for links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form Submission (Prevent default for demo)
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you! Your booking request has been sent. We will contact you shortly.');
            bookingForm.reset();
        });
    }
});
