/**
 * CV Page JavaScript
 * Handles animations, form submission, and other interactive features
 */

document.addEventListener('DOMContentLoaded', () => {
    // Animate sections on scroll
    animateSectionsOnScroll();
    
    // Initialize contact form
    initContactForm();
    
    // Add delay to project card animations
    staggerProjectAnimations();

    // Initialize back to top button
    initBackToTop();

    // Get all project cards
    const projectCards = document.querySelectorAll('.project-card');
    const modals = document.querySelectorAll('.project-details');
    const closeButtons = document.querySelectorAll('.project-details-close');

    // Function to open modal
    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
        }
    }

    // Function to close modal
    function closeModal(modal) {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }

    // Add click event listeners to project cards
    projectCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Prevent opening modal when clicking on GitHub link
            if (e.target.closest('.github-link')) {
                return;
            }

            const projectId = card.getAttribute('data-project');
            const modalId = `${projectId}-modal`;
            openModal(modalId);
        });
    });

    // Add click event listeners to close buttons
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.project-details');
            closeModal(modal);
        });
    });

    // Close modal when clicking outside
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.project-details.active');
            if (activeModal) {
                closeModal(activeModal);
            }
        }
    });
});

/**
 * Animate sections when they enter the viewport
 */
function animateSectionsOnScroll() {
    // Create an intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Unobserve after adding the class to avoid performance issues
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 }); // Trigger when at least 10% of the element is visible
    
    // Observe all sections
    document.querySelectorAll('.cv-container section').forEach(section => {
        section.classList.add('animate-section');
        observer.observe(section);
    });
}

/**
 * Add staggered animation delay to project cards
 */
function staggerProjectAnimations() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach((card, index) => {
        // Add a delay based on the card's index
        card.style.animationDelay = `${index * 0.15}s`;
    });
    
    // Do the same for tech categories
    const techCategories = document.querySelectorAll('.tech-category');
    
    techCategories.forEach((category, index) => {
        category.style.animationDelay = `${index * 0.15}s`;
        category.style.animationFillMode = 'both';
        category.style.animation = 'fadeInUp 0.8s ease-out';
    });
}

/**
 * Handle contact form submission
 */
function initContactForm() {
    const form = document.getElementById('contact-form');
    
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };
            
            // Simulate form submission (replace with actual API call)
            const submitButton = form.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            // Show loading state
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            // Simulate API call delay
            setTimeout(() => {
                console.log('Form submitted:', formData);
                
                // Show success message
                form.innerHTML = `
                    <div class="form-success">
                        <h3>Thank you for your message!</h3>
                        <p>I'll get back to you as soon as possible.</p>
                    </div>
                `;
                
                // In a real app, you would send this data to a backend
                // fetch('/api/contact', {
                //     method: 'POST',
                //     headers: { 'Content-Type': 'application/json' },
                //     body: JSON.stringify(formData)
                // }).then(response => { ... });
                
            }, 1500);
        });
    }
}

/**
 * Initialize back to top button functionality
 */
function initBackToTop() {
    const backToTopButton = document.querySelector('.back-to-top');
    
    if (backToTopButton) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });
        
        // Smooth scroll to top when clicked
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

