// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const body = document.body;

if (menuToggle && navMenu) {
    // Toggle menu
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        navMenu.classList.toggle('active');
        body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('active') && !navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            body.style.overflow = '';
        }
    });

    // Handle menu item clicks
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            body.style.overflow = '';
        });
    });
}

// Back to Top Button and WhatsApp Button
const backToTopButton = document.querySelector('.back-to-top');
const whatsappButton = document.querySelector('.whatsapp-btn');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopButton.classList.add('active');
        whatsappButton.classList.add('active');
    } else {
        backToTopButton.classList.remove('active');
        whatsappButton.classList.remove('active');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Adjust for header height
                behavior: 'smooth'
            });
        }
    });
});

// Active navigation link based on scroll position
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Form validation functions
function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    // Remove any non-digit characters
    const cleanPhone = phone.replace(/\D/g, '');
    // Check if it's exactly 10 digits
    return cleanPhone.length === 10;
}

// Form submission with validation
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    // Add input event listeners for real-time validation
    const emailInput = contactForm.querySelector('input[type="email"]');
    if (emailInput) {
        emailInput.addEventListener('input', function() {
            if (this.value && !validateEmail(this.value)) {
                this.classList.add('invalid');
                this.setCustomValidity('Please enter a valid email address');
            } else {
                this.classList.remove('invalid');
                this.setCustomValidity('');
            }
        });
    }
    
    // Add validation for phone number
    const phoneInput = contactForm.querySelector('input[type="tel"]');
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            // Allow only digits
            this.value = this.value.replace(/\D/g, '');
            
            if (this.value && !validatePhone(this.value)) {
                this.classList.add('invalid');
                this.setCustomValidity('Please enter a valid 10-digit phone number');
            } else {
                this.classList.remove('invalid');
                this.setCustomValidity('');
            }
        });
    }
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const phone = this.querySelector('input[type="tel"]')?.value || '';
        const subject = this.querySelector('input[placeholder="Subject"]').value;
        const message = this.querySelector('textarea').value;
        
        // Validate inputs
        let isValid = true;
        let errorMessage = '';
        
        if (!name) {
            isValid = false;
            errorMessage = 'Please enter your name';
        } else if (!email) {
            isValid = false;
            errorMessage = 'Please enter your email';
        } else if (!validateEmail(email)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        } else if (phone && !validatePhone(phone)) {
            isValid = false;
            errorMessage = 'Please enter a valid 10-digit phone number';
        } else if (!subject) {
            isValid = false;
            errorMessage = 'Please enter a subject';
        } else if (!message) {
            isValid = false;
            errorMessage = 'Please enter your message';
        }
        
        if (!isValid) {
            // Show error in toast instead of alert
            const toast = document.getElementById('successToast');
            const toastMessage = toast.querySelector('.toast-message');
            const toastIcon = toast.querySelector('i');
            
            toastIcon.className = 'fas fa-exclamation-circle';
            toastIcon.style.color = '#dc3545';
            toastMessage.textContent = errorMessage;
            toast.classList.add('show');
            
            setTimeout(() => {
                toast.classList.remove('show');
                // Reset toast to success state
                toastIcon.className = 'fas fa-check-circle';
                toastIcon.style.color = '#4CAF50';
                toastMessage.textContent = 'Message sent successfully!';
            }, 3000);
            return;
        }
        
        // Submit form data
        const formData = new FormData(this);
        
        fetch(this.action, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Show success toast
                const toast = document.getElementById('successToast');
                toast.classList.add('show');
                
                // Reset form
                this.reset();
                
                // Hide toast after 3 seconds
                setTimeout(() => {
                    toast.classList.remove('show');
                }, 3000);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            // Show error toast
            const toast = document.getElementById('successToast');
            const toastMessage = toast.querySelector('.toast-message');
            const toastIcon = toast.querySelector('i');
            
            toastIcon.className = 'fas fa-exclamation-circle';
            toastIcon.style.color = '#dc3545';
            toastMessage.textContent = 'An error occurred. Please try again.';
            toast.classList.add('show');
            
            setTimeout(() => {
                toast.classList.remove('show');
                // Reset toast to success state
                toastIcon.className = 'fas fa-check-circle';
                toastIcon.style.color = '#4CAF50';
                toastMessage.textContent = 'Message sent successfully!';
            }, 3000);
        });
    });
}

// Animation on scroll
window.addEventListener('scroll', () => {
    const elements = document.querySelectorAll('.feature-card, .service-card, .machinery-card');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
});

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.feature-card, .service-card, .machinery-card');
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Trigger initial animation check
    setTimeout(() => {
        const scrollEvent = new Event('scroll');
        window.dispatchEvent(scrollEvent);
    }, 100);
});

// Contact Form Submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    
    fetch(this.action, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        // Show success toast regardless of response
        const toast = document.getElementById('successToast');
        const toastMessage = toast.querySelector('.toast-message');
        const toastIcon = toast.querySelector('i');
        
        // Set success state
        toastIcon.className = 'fas fa-check-circle';
        toastIcon.style.color = '#4CAF50';
        toastMessage.textContent = 'Message sent successfully!';
        toast.classList.add('show');
        
        // Reset form
        this.reset();
        
        // Hide toast after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    })
    .catch(error => {
        console.error('Error:', error);
        // Show error toast
        const toast = document.getElementById('successToast');
        const toastMessage = toast.querySelector('.toast-message');
        const toastIcon = toast.querySelector('i');
        
        toastIcon.className = 'fas fa-exclamation-circle';
        toastIcon.style.color = '#dc3545';
        toastMessage.textContent = 'An error occurred. Please try again.';
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
            // Reset toast to success state
            toastIcon.className = 'fas fa-check-circle';
            toastIcon.style.color = '#4CAF50';
            toastMessage.textContent = 'Message sent successfully!';
        }, 3000);
    });
}); 