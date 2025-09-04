// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Dark Mode Functionality
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

// Check for saved dark mode preference or default to light mode
const darkMode = localStorage.getItem('darkMode') === 'true';
console.log('Initial dark mode state:', darkMode);
if (darkMode) {
    body.classList.add('dark-mode');
    updateDarkModeIcon(true);
    console.log('Dark mode applied on load');
}

// Toggle dark mode
darkModeToggle.addEventListener('click', () => {
    console.log('Dark mode toggle clicked!');
    body.classList.toggle('dark-mode');
    const isDarkMode = body.classList.contains('dark-mode');
    console.log('Dark mode state:', isDarkMode);

    // Save preference to localStorage
    localStorage.setItem('darkMode', isDarkMode);

    // Update icon
    updateDarkModeIcon(isDarkMode);

    // Show notification
    showNotification(
        isDarkMode ? 'Dark mode enabled' : 'Light mode enabled',
        'success'
    );
});

// Update dark mode icon
function updateDarkModeIcon(isDarkMode) {
    const icon = darkModeToggle.querySelector('i');
    if (isDarkMode) {
        icon.className = 'fas fa-sun';
        icon.style.transform = 'rotate(180deg)';
    } else {
        icon.className = 'fas fa-moon';
        icon.style.transform = 'rotate(0deg)';
    }
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const isDarkMode = body.classList.contains('dark-mode');

    if (window.scrollY > 100) {
        if (isDarkMode) {
            navbar.style.background = 'rgba(26, 26, 26, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
        }
    } else {
        if (isDarkMode) {
            navbar.style.background = 'rgba(26, 26, 26, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe all sections for animation
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Contact form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');

        // Enhance subject to avoid spam - automatically add "Portfolio Contact"
        const enhancedSubject = `Portfolio Contact: ${subject}`;

        // Basic validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill all fields', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email', 'error');
            return;
        }

        // Show sending notification
        showNotification('Sending message...', 'info');

        // Create form data object with enhanced subject
        const formDataObj = { name, email, subject: enhancedSubject, message };

        // Try to send via EmailJS first, fallback to Gmail compose
        if (typeof emailjs !== 'undefined') {
            sendEmailViaEmailJS(formDataObj)
                .then(result => {
                    if (result.success) {
                        showNotification('Message sent successfully!', 'success');
                        this.reset();
                    } else {
                        // Fallback to Gmail compose
                        showNotification('Opening Gmail as fallback...', 'info');
                        sendToGmail(formDataObj);
                        showNotification('Gmail opened. Please send your message.', 'success');
                        this.reset();
                    }
                });
        } else {
            // Fallback to Gmail compose
            showNotification('Opening Gmail...', 'info');
            sendToGmail(formDataObj);
            this.reset();
        }
    });
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;

    // Add animation keyframes
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Add to page
    document.body.appendChild(notification);

    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    });

    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Typing effect for hero section
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-text h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 150);
    }
});

// Project card hover effects
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Skill item hover effects
document.querySelectorAll('.skill-item').forEach(item => {
    item.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-5px) scale(1.05)';
    });

    item.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Certificate card hover effects
document.querySelectorAll('.certificate-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-5px) scale(1.03)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Education card hover effects
document.querySelectorAll('.education-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-5px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Active navigation link highlighting
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// Add active link styles
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: #3498db !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(style);

// Lazy loading for images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading when DOM is loaded
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Scroll to top functionality
function createScrollToTopButton() {
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollButton.className = 'scroll-to-top';
    scrollButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: #3498db;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        transition: all 0.3s ease;
        z-index: 1000;
    `;

    document.body.appendChild(scrollButton);

    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollButton.style.display = 'flex';
        } else {
            scrollButton.style.display = 'none';
        }
    });

    // Scroll to top when clicked
    scrollButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Hover effects
    scrollButton.addEventListener('mouseenter', () => {
        scrollButton.style.background = '#2980b9';
        scrollButton.style.transform = 'scale(1.1)';
    });

    scrollButton.addEventListener('mouseleave', () => {
        scrollButton.style.background = '#3498db';
        scrollButton.style.transform = 'scale(1)';
    });
}

// Initialize scroll to top button
document.addEventListener('DOMContentLoaded', createScrollToTopButton);

// Add loading animation for CV download
document.querySelectorAll('a[href*=".pdf"]').forEach(link => {
    link.addEventListener('click', function () {
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Downloading...';
        this.style.pointerEvents = 'none';

        setTimeout(() => {
            this.innerHTML = '<i class="fas fa-download"></i> Download CV';
            this.style.pointerEvents = 'auto';
        }, 3000);
    });
});

// Add counter animation for skills
function animateCounters() {
    const counters = document.querySelectorAll('.skill-item span');

    counters.forEach(counter => {
        const target = parseInt(counter.textContent.match(/\d+/));
        if (target) {
            let current = 0;
            const increment = target / 100;

            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };

            updateCounter();
        }
    });
}

// Initialize counter animation when skills section is visible
const skillsSection = document.querySelector('.skills');
if (skillsSection) {
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                skillsObserver.unobserve(entry.target);
            }
        });
    });

    skillsObserver.observe(skillsSection);
}

// Add smooth reveal animation for timeline items
function animateTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');

    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';

        setTimeout(() => {
            item.style.transition = 'all 0.6s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

// Initialize timeline animation when experience section is visible
const experienceSection = document.querySelector('.experience');
if (experienceSection) {
    const experienceObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateTimeline();
                experienceObserver.unobserve(entry.target);
            }
        });
    });

    experienceObserver.observe(experienceSection);
}

// Add particle effect to hero section (optional)
function createParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            pointer-events: none;
            animation: float 6s ease-in-out infinite;
            animation-delay: ${Math.random() * 6}s;
        `;

        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';

        hero.appendChild(particle);
    }

    // Add particle animation keyframes
    if (!document.querySelector('#particle-styles')) {
        const style = document.createElement('style');
        style.id = 'particle-styles';
        style.textContent = `
            @keyframes float {
                0%, 100% {
                    transform: translateY(0px) rotate(0deg);
                    opacity: 0.5;
                }
                50% {
                    transform: translateY(-20px) rotate(180deg);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize particles when page loads
window.addEventListener('load', createParticles);

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    updateActiveNavLink();
}, 100));

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }

    if (e.key === 'Home') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    if (e.key === 'End') {
        e.preventDefault();
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
});

// Add focus management for accessibility
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('focus', function () {
        this.style.outline = '2px solid #3498db';
        this.style.outlineOffset = '2px';
    });

    link.addEventListener('blur', function () {
        this.style.outline = 'none';
    });
});

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio website loaded successfully!');

    // Add loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';

    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);

    // Test dark mode functionality
    console.log('Dark mode toggle element:', darkModeToggle);
    console.log('Body element:', body);

    // Test manual dark mode toggle
    window.testDarkMode = () => {
        console.log('Testing dark mode manually...');
        body.classList.toggle('dark-mode');
        const isDarkMode = body.classList.contains('dark-mode');
        console.log('Manual dark mode state:', isDarkMode);
        updateDarkModeIcon(isDarkMode);
    };
});

// Gmail Integration Functions
function sendToGmail(formData) {
    const { name, email, subject, message } = formData;

    // Create email body with better formatting to avoid spam
    const emailBody = `Hello Ahmed,

I am contacting you through your portfolio website.

Contact Information:
Name: ${name}
Email: ${email}

Message:
${message}

Best regards,
${name}

---
This message was sent from your portfolio contact form.`;

    // Try Gmail web first
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=ahmedatiea30@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;

    // Also create mailto link as backup
    const mailtoUrl = `mailto:ahmedatiea30@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;

    // Try to open Gmail web
    const gmailWindow = window.open(gmailUrl, '_blank');

    // If Gmail doesn't open (popup blocked), try mailto
    if (!gmailWindow || gmailWindow.closed || typeof gmailWindow.closed == 'undefined') {
        showNotification('Opening default email client...', 'info');
        window.location.href = mailtoUrl;
    } else {
        showNotification('Gmail opened! Please click "Send" to deliver your message.', 'info');
    }

    return true;
}

// EmailJS integration for direct email sending
function sendEmailViaEmailJS(formData) {
    const { name, email, subject, message } = formData;

    // EmailJS configuration
    const templateParams = {
        to_email: 'ahmedatiea30@gmail.com',
        from_name: name,
        from_email: email,
        subject: subject,
        message: message
    };

    // You'll need to add EmailJS script and configure it
    if (typeof emailjs !== 'undefined') {
        return emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
            .then(function (response) {
                return { success: true, message: 'Email sent successfully!' };
            })
            .catch(function (error) {
                console.error('EmailJS error:', error);
                return { success: false, message: 'Failed to send email. Please try again.' };
            });
    } else {
        return Promise.resolve({ success: false, message: 'EmailJS not loaded' });
    }
}
