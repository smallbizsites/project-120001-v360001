document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.menu-toggle');
    const mainNav = document.getElementById('main-navigation');
    const currentYearSpan = document.getElementById('current-year');
    const faqQuestions = document.querySelectorAll('.faq-question');
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.querySelector('.form-status');
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptCookies = document.getElementById('accept-cookies');

    // 1. Mobile Navigation Toggle
    navToggle.addEventListener('click', () => {
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true' || false;
        navToggle.setAttribute('aria-expanded', !isExpanded);
        mainNav.classList.toggle('active');
    });

    // Close menu when a link is clicked (for mobile)
    mainNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 768) {
                navToggle.setAttribute('aria-expanded', 'false');
                mainNav.classList.remove('active');
            }
        });
    });

    // 2. Dynamic Year Update
    currentYearSpan.textContent = new Date().getFullYear();

    // 3. FAQ Accordion Logic
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const expanded = question.getAttribute('aria-expanded') === 'true';
            const answer = document.getElementById(question.getAttribute('aria-controls'));

            // Close all other open answers
            faqQuestions.forEach(q => {
                if (q !== question && q.getAttribute('aria-expanded') === 'true') {
                    q.setAttribute('aria-expanded', 'false');
                    document.getElementById(q.getAttribute('aria-controls')).style.maxHeight = null;
                }
            });

            // Toggle current answer
            question.setAttribute('aria-expanded', !expanded);
            if (!expanded) {
                // Open: Set maxHeight to the scroll height of the content
                answer.style.maxHeight = answer.scrollHeight + "px";
            } else {
                // Close
                answer.style.maxHeight = null;
            }
        });
    });

    // 4. Contact Form Submission (Simulated)
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        formStatus.textContent = "Sending...";
        formStatus.style.color = "var(--color-primary)";

        // Simulate API call delay
        setTimeout(() => {
            // In a real application, you would send data here
            console.log('Form Submitted');

            formStatus.textContent = "Thank you! Your request has been received. We will be in touch shortly.";
            formStatus.style.color = "green";
            contactForm.reset();
            
            // Clear status after 5 seconds
            setTimeout(() => {
                formStatus.textContent = "";
            }, 5000);

        }, 1500);
    });

    // 5. Cookie Consent Management
    const COOKIE_NAME = 'samwaltz_cookie_consent';

    function getCookie(name) {
        return document.cookie.split('; ').find(row => row.startsWith(name))?.split('=')[1];
    }

    function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/;Secure;SameSite=Lax";
    }

    if (!getCookie(COOKIE_NAME)) {
        // Show banner if cookie not set
        setTimeout(() => {
            cookieBanner.classList.add('show');
        }, 1000);
    }

    acceptCookies.addEventListener('click', () => {
        setCookie(COOKIE_NAME, 'accepted', 365);
        cookieBanner.classList.remove('show');
    });
});