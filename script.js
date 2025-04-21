document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu functionality
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.querySelector('i').classList.toggle('fa-bars');
        menuToggle.querySelector('i').classList.toggle('fa-times');
    });
ySelector('header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            return;
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
            navLinks.classList.remove('active');
            menuToggle.querySelector('i').classList.remove('fa-times');
            menuToggle.querySelector('i').classList.add('fa-bars');
        }
    });

    // Header scroll effect
    const header = document.quer
        }

        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            // Scroll down
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            // Scroll up
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }

        lastScroll = currentScroll;
    });

    // Login button functionality
    const loginBtn = document.querySelector('.btn-login');
    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            window.location.href = 'login.html';
        });
    }

    // Cart button functionality
    const cartBtn = document.querySelector('.btn-cart');
    if (cartBtn) {
        cartBtn.addEventListener('click', () => {
            showNotification('Shopping cart coming soon!', 'info');
        });
    }

    // Active navigation link
    const currentLocation = window.location.pathname;
    document.querySelectorAll('.nav-links a').forEach(link => {
        if (link.getAttribute('href') === currentLocation || 
            (currentLocation === '/' && link.getAttribute('href') === 'index.html')) {
            link.classList.add('active');
        }
    });

    // Smooth scroll for navigation links
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

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all bike cards
    document.querySelectorAll('.bike-card').forEach(card => {
        observer.observe(card);
    });

    // Search functionality
    const searchInput = document.getElementById('search');
    const searchButton = document.querySelector('.search-box button');

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchBike();
        }
    });

    searchButton.addEventListener('click', searchBike);

    // Handle View Details and Locate Us buttons
    document.querySelectorAll('.bike-card').forEach(card => {
        const viewBtn = card.querySelector('.btn-view');
        const locateBtn = card.querySelector('.btn-locate');
        const bikeName = card.querySelector('h3').textContent;

        viewBtn.addEventListener('click', () => {
            showNotification(`Viewing details for ${bikeName}`, 'info');
            // Add your view details logic here
        });

        locateBtn.addEventListener('click', () => {
            showNotification(`Showing location for ${bikeName}`, 'info');
            // Add your location logic here
        });
    });

    // Features CTA button functionality
    const ctaButton = document.querySelector('.features-cta .btn-primary');
    if (ctaButton) {
        ctaButton.addEventListener('click', () => {
            // Smooth scroll to contact section if on the same page
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            } else {
                // Redirect to contact page if not on the same page
                window.location.href = 'contact.html';
            }
        });
    }

    // Add hover animation for feature cards
    document.querySelectorAll('.feature').forEach(feature => {
        feature.addEventListener('mouseenter', () => {
            feature.querySelector('.feature-icon').style.transform = 'rotateY(180deg)';
        });

        feature.addEventListener('mouseleave', () => {
            feature.querySelector('.feature-icon').style.transform = 'rotateY(0)';
        });
    });

    // Gallery Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 0);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Login Form Validation and Functionality
    const loginForm = document.getElementById('loginForm');
    if (!loginForm) return;

    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const togglePassword = document.querySelector('.toggle-password');

    // Toggle password visibility
    if (togglePassword) {
        togglePassword.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.querySelector('i').classList.toggle('fa-eye');
            this.querySelector('i').classList.toggle('fa-eye-slash');
        });
    }

    // Email validation
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email.toLowerCase());
    }

    // Password validation (at least 8 characters, 1 uppercase, 1 lowercase, 1 number)
    function validatePassword(password) {
        const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        return re.test(password);
    }

    // Real-time email validation
    emailInput.addEventListener('input', function() {
        if (!validateEmail(this.value)) {
            emailError.textContent = 'Please enter a valid email address';
            emailError.style.display = 'block';
            this.classList.add('error');
        } else {
            emailError.style.display = 'none';
            this.classList.remove('error');
        }
    });

    // Real-time password validation
    passwordInput.addEventListener('input', function() {
        if (!validatePassword(this.value)) {
            passwordError.textContent = 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number';
            passwordError.style.display = 'block';
            this.classList.add('error');
        } else {
            passwordError.style.display = 'none';
            this.classList.remove('error');
        }
    });

    // Form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        let isValid = true;

        // Validate email
        if (!validateEmail(emailInput.value)) {
            emailError.textContent = 'Please enter a valid email address';
            emailError.style.display = 'block';
            emailInput.classList.add('error');
            isValid = false;
        }

        // Validate password
        if (!validatePassword(passwordInput.value)) {
            passwordError.textContent = 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number';
            passwordError.style.display = 'block';
            passwordInput.classList.add('error');
            isValid = false;
        }

        if (isValid) {
            // Here you would typically send the form data to your server
            console.log('Form is valid, submitting...');
            // Simulate loading state
            const submitButton = this.querySelector('.btn-login-submit');
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
            
            // Simulate API call
            setTimeout(() => {
                // Reset button state
                submitButton.disabled = false;
                submitButton.textContent = 'Login';
                // Redirect to home page (you should change this based on your authentication logic)
                window.location.href = 'index.html';
            }, 2000);
        }
    });

    // Social login buttons
    const socialButtons = document.querySelectorAll('.btn-social');
    socialButtons.forEach(button => {
        button.addEventListener('click', function() {
            const provider = this.classList.contains('google') ? 'Google' : 'Facebook';
            console.log(`Initiating ${provider} login...`);
            // Here you would implement the social login logic
        });
    });
});

function searchBike() {
    const query = document.getElementById('search').value.toLowerCase().trim();
    if (query) {
        // Show loading state
        const searchButton = document.querySelector('.search-box button');
        const originalText = searchButton.textContent;
        searchButton.textContent = 'Searching...';
        searchButton.disabled = true;

        // Simulate search (replace with actual API call)
        setTimeout(() => {
            const bikes = document.querySelectorAll('.bike-card');
            let found = false;

            bikes.forEach(bike => {
                const title = bike.querySelector('h3').textContent.toLowerCase();
                const description = bike.querySelector('p').textContent.toLowerCase();
                
                if (title.includes(query) || description.includes(query)) {
                    bike.style.display = 'block';
                    found = true;
                } else {
                    bike.style.display = 'none';
                }
            });

            // Show results message
            const message = found 
                ? `Found bikes matching "${query}"`
                : `No bikes found matching "${query}"`;
            
            showNotification(message, found ? 'success' : 'error');

            // Reset search button
            searchButton.textContent = originalText;
            searchButton.disabled = false;
        }, 500);
    }
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Trigger animation
    setTimeout(() => notification.classList.add('show'), 10);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add notification styles dynamically
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 5px;
        color: white;
        font-weight: 500;
        transform: translateY(100px);
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 1000;
    }

    .notification.show {
        transform: translateY(0);
        opacity: 1;
    }

    .notification.success {
        background-color: #4CAF50;
    }

    .notification.error {
        background-color: #f44336;
    }

    .notification.info {
        background-color: #2196F3;
    }

    .fade-in {
        animation: fadeIn 0.6s ease forwards;
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);