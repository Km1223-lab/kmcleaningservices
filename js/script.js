document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function () {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });

        document.addEventListener('click', function (event) {
            const isClickInsideMenu = navMenu.contains(event.target);
            const isClickInsideHamburger = hamburger.contains(event.target);

            if (!isClickInsideMenu && !isClickInsideHamburger && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    }

    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function (event) {
            const name = form.querySelector('input[name="name"]').value.trim();
            const email = form.querySelector('input[name="email"]').value.trim();
            const service = form.querySelector('select[name="service"]').value.trim();
            const message = form.querySelector('textarea[name="message"]').value.trim();

            if (!name || !email || !service || !message) {
                alert('Please fill in all required fields.');
                event.preventDefault();
                return;
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                alert('Please enter a valid email address.');
                event.preventDefault();
                return;
            }
        });
    }
});

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

window.addEventListener('scroll', function () {
    const navLinks = document.querySelectorAll('.nav-menu a');
    let currentSection = '';

    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;

        if (window.scrollY >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') && link.getAttribute('href').substring(1) === currentSection) {
            link.classList.add('active');
        }
    });
});

window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        }
    }
});

if (!document.getElementById('goToTopBtn')) {
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

    button.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    button.addEventListener('mouseenter', function () {
        this.style.backgroundColor = '#0ea5e9';
        this.style.transform = 'scale(1.1)';
    });

    button.addEventListener('mouseleave', function () {
        this.style.backgroundColor = '#1e40af';
        this.style.transform = 'scale(1)';
    });

    document.body.appendChild(button);
}

window.addEventListener('scroll', function () {
    const goToTopBtn = document.getElementById('goToTopBtn');
    if (goToTopBtn) {
        if (window.pageYOffset > 300) {
            goToTopBtn.style.display = 'block';
        } else {
            goToTopBtn.style.display = 'none';
        }
    }
});
