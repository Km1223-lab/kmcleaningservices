// ==================== Mobile Menu Toggle ==================== 
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideMenu = navMenu.contains(event.target);
        const isClickInsideHamburger = hamburger.contains(event.target);
        
        if (!isClickInsideMenu && !isClickInsideHamburger && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});

// ==================== Smooth Scroll Navigation ==================== 
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// ==================== Active Navigation Link on Scroll ==================== 
window.addEventListener('scroll', function() {
    const navLinks = document.querySelectorAll('.nav-menu a');
    let currentSection = '';

    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === currentSection) {
            link.classList.add('active');
        }
    });
});

// ==================== Form Submission ==================== 
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);
        const name = contactForm.children[0].children[0].value;
        const email = contactForm.children[1].children[0].value;
        const phone = contactForm.children[2].children[0].value;
        const service = contactForm.children[3].children[0].value;
        const message = contactForm.children[4].children[0].value;

        // Basic validation
        if (!name || !email || !service || !message) {
            showNotification('Please fill in all required fields', 'error');
            return;
        }

        // Email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }

        // Prepare email data
        const emailData = {
            to: 'info@kmcleaningservices.uk',
            from: email,
            name: name,
            phone: phone,
            service: service,
            message: message
        };

        // Send email using FormSubmit (free service)
        sendEmail(emailData);

        // Show success message
        showNotification('Thank you for your inquiry! We will contact you soon.', 'success');
        
        // Reset form
        contactForm.reset();
    });
}

// ==================== Send Email Function ==================== 
function sendEmail(data) {
    // Using FormSubmit.co - a free email service
    const formElement = document.createElement('form');
    formElement.method = 'POST';
    formElement.action = 'https://formsubmit.co/info@kmcleaningservices.uk';
    formElement.style.display = 'none';

    const fields = {
        'Name': data.name,
        'Email': data.from,
        'Phone': data.phone,
        'Service': data.service,
        'Message': data.message,
        '_subject': 'New Cleaning Inquiry from KM Cleaning Services Website'
    };

    for (const [key, value] of Object.entries(fields)) {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = value;
        formElement.appendChild(input);
    }

    document.body.appendChild(formElement);
    formElement.submit();
    document.body.removeChild(formElement);
}

// ==================== Notification System ==================== 
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">&times;</button>
        </div>
    `;

    // Add styles if not already present
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.innerHTML = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 15px 20px;
                border-radius: 5px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                z-index: 2000;
                animation: slideInNotification 0.3s ease;
                max-width: 400px;
            }

            @keyframes slideInNotification {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }

            .notification-content {
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 15px;
            }

            .notification-success {
                background-color: #d1fae5;
                color: #065f46;
                border-left: 4px solid #10b981;
            }

            .notification-error {
                background-color: #fee2e2;
                color: #991b1b;
                border-left: 4px solid #ef4444;
            }

            .notification-info {
                background-color: #dbeafe;
                color: #082f49;
                border-left: 4px solid #3b82f6;
            }

            .notification-close {
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                padding: 0;
                color: inherit;
                opacity: 0.7;
                transition: opacity 0.2s;
            }

            .notification-close:hover {
                opacity: 1;
            }

            @media (max-width: 480px) {
                .notification {
                    right: 10px;
                    left: 10px;
                    max-width: none;
                }
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    // Auto remove notification after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutNotification 0.3s ease';
        notification.style.animationFillMode = 'forwards';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// ==================== Scroll Animations ==================== 
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 0.6s ease-in';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe service cards and testimonial cards
document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.service-card');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    [...serviceCards, ...testimonialCards].forEach(card => {
        observer.observe(card);
    });
});

// ==================== Counter Animation ==================== 
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const increment = target / 200;
        
        const updateCount = () => {
            const count = +counter.innerText;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 10);
            } else {
                counter.innerText = target;
            }
        };
        
        updateCount();
    });
}

// ==================== Lazy Load Images ==================== 
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ==================== Navbar Background on Scroll ==================== 
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }
});

// ==================== Print Friendly Version ==================== 
function printPage() {
    window.print();
}

// ==================== Search Functionality (if needed) ==================== 
function searchServices(query) {
    const serviceCards = document.querySelectorAll('.service-card');
    query = query.toLowerCase();

    serviceCards.forEach(card => {
        const text = card.textContent.toLowerCase();
        if (text.includes(query)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// ==================== Go to Top Button ==================== 
window.addEventListener('scroll', function() {
    if (!document.getElementById('goToTopBtn')) {
        createGoToTopButton();
    }

    const goToTopBtn = document.getElementById('goToTopBtn');
    if (window.pageYOffset > 300) {
        goToTopBtn.style.display = 'block';
    } else {
        goToTopBtn.style.display = 'none';
    }
});

function createGoToTopButton() {
    const button = document.createElement('button');
    button.id = 'goToTopBtn';
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background-color: #1e40af;
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 18px;
        cursor: pointer;
        display: none;
        z-index: 999;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;

    button.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    button.addEventListener('mouseenter', function() {
        this.style.backgroundColor = '#0ea5e9';
        this.style.transform = 'scale(1.1)';
    });

    button.addEventListener('mouseleave', function() {
        this.style.backgroundColor = '#1e40af';
        this.style.transform = 'scale(1)';
    });

    document.body.appendChild(button);
}

// ==================== Dark Mode Toggle (Optional) ==================== 
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Load dark mode preference
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

// ==================== Performance Optimization ==================== 
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ==================== Smooth Scroll Polyfill ==================== 
if (!('scrollBehavior' in document.documentElement.style)) {
    console.log('Smooth scroll not supported, using polyfill');
    // Add polyfill for older browsers
}

console.log('KM Cleaning Services - Website loaded successfully!');
