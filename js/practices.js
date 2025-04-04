/**
 * JavaScript code to manage best practices for web development.
 * This code handles the display of best practices, user selections,
 * and animations for a more interactive experience.
 * It also includes a reward system for completing certain milestones. 
 */
const bestPractices = [
    // Best practices data
    // Each practice includes an id, title, description, and a video URL
    {
        id: 1,
        title: "Semantic HTML",
        description: "Use appropriate HTML5 semantic tags (nav, header, main, article, section, footer) to improve accessibility and SEO",
        videoUrl: "https://youtu.be/YPzFPoqwTmI?si=iFqTMQfKBTFEXmIw"
    },
    {
        id: 2,
        title: "Responsive Design",
        description: "Implement mobile-first design with responsive breakpoints and flexible layouts using media queries",
        videoUrl: "https://youtu.be/yP2zI-Em5lg?si=RxlylZp-ZX7YohVe"
    },
    {
        id: 3,
        title: "Performance Optimisation",
        description: "Minimize HTTP requests, compress assets, and optimize images to ensure fast page loading times",
        videoUrl: "https://youtu.be/Ym0j-DSHgEc?si=ShcG6z4QND9xTEVP"
    },
    {
        id: 4,
        title: "Cross-Browser Compatibility",
        description: "Test and ensure your website works consistently across different browsers and versions",
        videoUrl: "https://youtu.be/9utEjIAI9E0?si=6coAbfpO_g2yjk8r"
    },
    {
        id: 5,
        title: "CSS Organisation",
        description: "Follow a consistent naming convention (like BEM) and organize CSS with a clear, modular structure",
        videoUrl: "https://youtu.be/xaXmoVZ3koo?si=XWuaq49ldjyCY5aS"
    },
    {
        id: 6,
        title: "JavaScript Best Practices",
        description: "Use modern ES6+ features, avoid global variables, and implement proper error handling",
        videoUrl: "https://youtu.be/7_2ED9hLVuc?si=4j0BJUdLRBS_PXgS"
    },
    {
        id: 7,
        title: "Accessibility (WCAG)",
        description: "Include proper ARIA labels, ensure keyboard navigation, and maintain good color contrast ratios",
        videoUrl: "https://youtu.be/5H1JGdqLrWo?si=9gk3hejLCH4OSLf5"
    },
    {
        id: 8,
        title: "Form Validation",
        description: "Implement both client-side and server-side validation with clear error messages",
        videoUrl: "https://youtu.be/In0nB0ABaUk?si=GdOA81idZ-XJ0tdf"
    },
    {
        id: 9,
        title: "Security Measures",
        description: "Implement XSS protection, use HTTPS, and sanitize user inputs to prevent vulnerabilities",
        videoUrl: "https://youtu.be/aXwHLQXuj1o?si=HrJVngFxNXlU-EN4"
    },
    {
        id: 10,
        title: "Code Documentation",
        description: "Write clear comments and maintain documentation for functions, components, and APIs",
        videoUrl: "https://youtu.be/OB0qQfSQxps?si=71W2MBokHii9otL4"
    },
    {
        id: 11,
        title: "Version Control",
        description: "Use Git with meaningful commit messages and proper branching strategies",
        videoUrl: "https://youtu.be/zbKdDsNNOhg?si=jhqy2wcQ07JTD1qE"
    },
    {
        id: 12,
        title: "Progressive Enhancement",
        description: "Ensure basic functionality works without JavaScript and enhance features progressively",
        videoUrl: "https://youtu.be/U38dyJhpUnA?si=tC11AeFmqHolLjB5"
    },
    {
        id: 13,
        title: "Meta Tags and SEO",
        description: "Include proper meta tags, Open Graph data, and implement SEO best practices",
        videoUrl: "https://youtu.be/SGZr1da5tH8?si=keXy__LVxLIW46bl"
    },
    {
        id: 14,
        title: "Asset Optimization",
        description: "Implement proper caching strategies and optimize loading of CSS, JavaScript, and media files",
        videoUrl: "https://youtu.be/Yze4tIGTxFs?si=5yHuTsTBam4hiBIk"
    },
    {
        id: 15,
        title: "Code Quality",
        description: "Follow consistent coding standards, use linters, and perform regular code reviews",
        videoUrl: "https://youtu.be/N6qAbQOn9oE?si=TcNAwRTrzjlFZKeJ"
    }
];

class PracticesManager {
    // Class to manage best practices
    constructor() {
        this.loadSavedPractices();
        this.renderPractices();
        this.setupEventListeners();
        this.setupScrollListener();
        this.renderSidebar();
    }

    loadSavedPractices() {
        // Load saved practices from local storage
        const saved = localStorage.getItem('selectedPractices');
        this.selectedPractices = saved ? JSON.parse(saved) : [];
    }

    renderPractices() {
        // Render best practices on the page
        const container = document.getElementById('practices-container');
        container.innerHTML = ''; // Clear existing content

        // Sort practices by ID
        bestPractices.forEach((practice, index) => {
            const isChecked = this.selectedPractices.includes(practice.id);
            const practiceElement = document.createElement('div');
            practiceElement.className = 'practice-item';
            practiceElement.id = `practice-${practice.id}`;
            
            // Set animation delay based on index
            practiceElement.style.animationDelay = `${index * 0.1}s`;
            
            // Convert YouTube URL to embed URL
            const videoId = this.getYouTubeVideoId(practice.videoUrl);
            const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : '';
            
            // Create practice item HTML
            practiceElement.innerHTML = `
                <div class="practice-header">
                    <input type="checkbox" 
                           data-id="${practice.id}" 
                           ${isChecked ? 'checked' : ''}>
                    <h3>${practice.title}</h3>
                </div>
                <p class="practice-description">${practice.description}</p>
                <div class="practice-video">
                    <iframe width="560" height="315" data-src="${embedUrl}" 
                    title="${practice.title}" frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowfullscreen></iframe>
                </div>
            `;
            container.appendChild(practiceElement);
        });

        this.updateSummary();
        this.setupLazyLoading();
    }

    setupEventListeners() {
        // Set up event listeners for checkboxes
        document.getElementById('practices-container').addEventListener('change', (e) => {
            if (e.target.type === 'checkbox') {
                const practiceId = parseInt(e.target.dataset.id);
                if (e.target.checked) {
                    if (!this.selectedPractices.includes(practiceId)) {
                        this.selectedPractices.push(practiceId);
                    }
                } else {
                    this.selectedPractices = this.selectedPractices.filter(id => id !== practiceId);
                }
                this.savePractices();
            }
        });
    }

    setupScrollListener() {
        // Set up scroll listener for sticky progress bar
        window.addEventListener('scroll', () => {
            const stickyProgress = document.querySelector('.sticky-progress');
            if (window.scrollY > 0) {
                stickyProgress.classList.add('is-sticky');
            } else {
                stickyProgress.classList.remove('is-sticky');
            }
        });
    }

    savePractices() {
        // Save selected practices to local storage
        localStorage.setItem('selectedPractices', JSON.stringify(this.selectedPractices));
        this.updateSummary();
    }

    updateSummary() {
        // Update the summary of completed practices
        const completedCount = this.selectedPractices.length;
        const totalPractices = bestPractices.length;
        const percentage = Math.round((completedCount / totalPractices) * 100);
        
        // Update count and percentage
        document.getElementById('completed-count').textContent = completedCount;
        document.getElementById('progress-percentage').textContent = percentage;
        
        // Update progress bar
        const progressFill = document.querySelector('.progress-fill');
        progressFill.style.width = `${percentage}%`;
        
        // Update progress bar color based on completion
        if (percentage >= 80) {
            progressFill.style.backgroundColor = '#4CAF50';
        } else if (percentage >= 40) {
            progressFill.style.backgroundColor = '#2196F3';
        } else {
            progressFill.style.backgroundColor = '#FFC107';
        }

        // Show or hide success message based on completion
        const successMessage = document.getElementById('success-message');
        // Only show success message at exactly 12/15 or 15/15 completions
        if (completedCount === 12 || completedCount === 15) {
            if (successMessage.style.display !== 'block') {
                this.showReward();
                successMessage.style.display = 'block';
            }
        } else {
            successMessage.style.display = 'none';
            // Clear the reward image when hiding
            document.getElementById('reward-image').src = '';
            // Clear any fireworks
            this.clearFireworks();
        }
        
        // Update sidebar if available
        this.renderSidebar();
    }

    async showReward() {
        // Show success message and fetch random animal image
        const successMessage = document.getElementById('success-message');
        // Only fetch new image if success message is not already shown
        if (successMessage.style.display !== 'block') {
            const rewardImage = await this.fetchRandomAnimal();
            if (rewardImage) {
                document.getElementById('reward-image').src = rewardImage;
            }
            
            // Add fireworks animation
            this.createFireworks();
            
            // Set up close button functionality
            const closeButton = document.getElementById('success-close');
            if (closeButton) {
                closeButton.addEventListener('click', () => {
                    successMessage.style.display = 'none';
                    this.clearFireworks();
                });
            }
        }
    }
    
    createFireworks() {
        // Use the fireworks container inside success message
        let fireworksContainer = document.getElementById('fireworks-container');
        if (!fireworksContainer) return;
        
        // Clear any existing fireworks
        this.clearFireworks();
        
        // Play celebration sound if available
        const celebrationSound = document.getElementById('celebration-sound');
        if (celebrationSound) {
            celebrationSound.volume = 0.5;
            celebrationSound.currentTime = 0;
            celebrationSound.play().catch(e => console.log('Sound play failed'));
        }
        
        // Start fireworks animation - restore to previous frequency but with better optimization
        this.fireworksInterval = setInterval(() => {
            this.launchFirework();
        }, 300); // Original frequency
    }
    
    launchFirework() {
        // Launch a single firework
        const fireworksContainer = document.getElementById('fireworks-container');
        if (!fireworksContainer) return;
        
        // Create a new firework
        const firework = document.createElement('div');
        firework.className = 'firework';
        fireworksContainer.appendChild(firework);
        
        // Random position on the screen (weighted toward center for more visibility)
        const centerBias = Math.random() < 0.7; // 70% chance to be centered
        const containerWidth = fireworksContainer.offsetWidth;
        const containerHeight = fireworksContainer.offsetHeight;
        
        const x = centerBias 
            ? containerWidth * 0.3 + Math.random() * (containerWidth * 0.4)
            : Math.random() * containerWidth;
        
        // Create explosion point higher in the viewport
        const explosionY = Math.random() * (containerHeight * 0.6);
        const explosionPoint = document.createElement('div');
        explosionPoint.className = 'explosion';
        explosionPoint.style.left = `${x}px`;
        explosionPoint.style.top = `${explosionY}px`;
        
        // Use more vibrant colors for the explosion
        const explosionColors = [
            '#FFD700', '#FF6347', '#00CED1', '#FF1493', '#7B68EE',
            '#32CD32', '#FF4500', '#1E90FF', '#FF00FF', '#00FF7F'
        ];
        const randomExplosionColor = explosionColors[Math.floor(Math.random() * explosionColors.length)];
        explosionPoint.style.boxShadow = `0 0 20px 5px ${randomExplosionColor}`;
        
        firework.appendChild(explosionPoint);
        
        // Create particles with more varied colors
        const colors = [
            '#FF5252', '#FF4081', '#E040FB', '#7C4DFF', 
            '#536DFE', '#448AFF', '#40C4FF', '#18FFFF', 
            '#64FFDA', '#69F0AE', '#B2FF59', '#EEFF41', 
            '#FFFF00', '#FFD740', '#FFAB40', '#FF6E40',
            '#F44336', '#E91E63', '#9C27B0', '#673AB7',
            '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4',
            '#009688', '#4CAF50', '#8BC34A', '#CDDC39',
            '#FFEB3B', '#FFC107', '#FF9800', '#FF5722'
        ];
        
        // Set color theme - sometimes use a single color theme, sometimes use all colors
        const useTheme = Math.random() < 0.4; // 40% chance to use a color theme
        const themeColor = colors[Math.floor(Math.random() * colors.length)];
        
        // Create 20-35 particles (optimized for performance)
        const particleCount = 20 + Math.floor(Math.random() * 15);
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random position within explosion radius
            const angle = Math.random() * Math.PI * 2; // Random angle
            const distance = 30 + Math.random() * 80; // Random distance
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance;
            
            // Set CSS variables for the animation
            particle.style.setProperty('--tx', `${tx}px`);
            particle.style.setProperty('--ty', `${ty}px`);
            
            // Set position at explosion point
            particle.style.left = `${x}px`;
            particle.style.top = `${explosionY}px`;
            
            // Use hardware acceleration for better performance
            particle.style.transform = 'translate3d(0, 0, 0)';
            particle.style.backfaceVisibility = 'hidden';
            
            // Random color - either from theme or all colors
            let color;
            if (useTheme) {
                // Create variation of the theme color
                const hslMatch = themeColor.match(/hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/);
                if (hslMatch) {
                    // If it's already HSL, vary slightly
                    const h = parseInt(hslMatch[1]);
                    const s = parseInt(hslMatch[2]);
                    const l = parseInt(hslMatch[3]);
                    const newH = (h + Math.floor(Math.random() * 20) - 10) % 360;
                    const newS = Math.min(100, Math.max(50, s + Math.floor(Math.random() * 20) - 10));
                    const newL = Math.min(90, Math.max(40, l + Math.floor(Math.random() * 20) - 10));
                    color = `hsl(${newH}, ${newS}%, ${newL}%)`;
                } else {
                    // Otherwise just use the theme color
                    color = themeColor;
                }
            } else {
                // Random color from all available colors
                color = colors[Math.floor(Math.random() * colors.length)];
            }
            
            particle.style.backgroundColor = color;
            particle.style.boxShadow = `0 0 8px 2px ${color}`;
            
            // Random size (larger for more visibility)
            const size = 2 + Math.random() * 4;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // Add to firework
            firework.appendChild(particle);
            
            // Remove particle after animation completes
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 1200);
        }
        
        // Remove firework after all particles are done
        setTimeout(() => {
            if (firework.parentNode) {
                firework.parentNode.removeChild(firework);
            }
        }, 1500);
    }
    
    clearFireworks() {
        // Clear the interval if it exists
        if (this.fireworksInterval) {
            clearInterval(this.fireworksInterval);
            this.fireworksInterval = null;
        }
        
        // Remove all fireworks
        const fireworksContainer = document.getElementById('fireworks-container');
        if (fireworksContainer) {
            fireworksContainer.innerHTML = '';
        }
    }

    async fetchRandomAnimal() {
        // Fetch a random animal image from The Cat API
        try {
            const response = await fetch('https://api.thecatapi.com/v1/images/search');
            const data = await response.json();
            return data[0].url;
        } catch (error) {
            console.error('Failed to fetch image:', error);
            return null;
        }
    }

    getYouTubeVideoId(url) {
        if (!url) return null;
        
        // Regular expression to extract YouTube video ID
        const regExp = /^.*(?:youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        
        return (match && match[1].length === 11) ? match[1] : null;
    }

    setupLazyLoading() {
        // Set up intersection observer for lazy loading videos
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const iframe = entry.target;
                    if (iframe.dataset.src) {
                        iframe.src = iframe.dataset.src;
                        iframe.removeAttribute('data-src');
                    }
                    observer.unobserve(iframe);
                }
            });
        }, {
            rootMargin: '0px 0px 200px 0px' // Load when within 200px of viewport
        });
        
        // Observe all iframes
        document.querySelectorAll('.practice-video iframe').forEach(iframe => {
            observer.observe(iframe);
        });
    }

    renderSidebar() {
        // Render the sidebar with best practices
        const sidebarLinks = document.getElementById('sidebar-links');
        if (!sidebarLinks) return;
        
        sidebarLinks.innerHTML = '';
        
        bestPractices.forEach(practice => {
            const isCompleted = this.selectedPractices.includes(practice.id);
            
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <a href="#practice-${practice.id}" class="${isCompleted ? 'completed' : ''}">
                    <span class="indicator"></span>
                    ${practice.title}
                </a>
            `;
            
            // Add click event to scroll to practice
            listItem.querySelector('a').addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = e.currentTarget.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    // Smooth scroll to target
                    window.scrollTo({
                        top: targetElement.offsetTop - 200, // Offset to account for sticky header
                        behavior: 'smooth'
                    });
                    
                    // Apply highlight immediately without animation
                    targetElement.classList.add('highlight');
                }
            });
            
            sidebarLinks.appendChild(listItem);
        });
        
        // Add scroll spy functionality
        this.setupScrollSpy();
    }
    
    setupScrollSpy() {
        // Watch for scroll and highlight active sidebar link
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY + 250; // Offset for header
            
            // Find all practice items
            const practiceItems = document.querySelectorAll('.practice-item');
            let activeItem = null;
            
            // Determine which item is currently in view
            practiceItems.forEach(item => {
                const top = item.offsetTop;
                const height = item.offsetHeight;
                
                if (scrollPosition >= top && scrollPosition < top + height) {
                    activeItem = item.id;
                }
            });
            
            // Update active class in sidebar
            if (activeItem) {
                document.querySelectorAll('#sidebar-links a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${activeItem}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize back to top button
    initBackToTop();

    window.practicesManager = new PracticesManager();
});

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