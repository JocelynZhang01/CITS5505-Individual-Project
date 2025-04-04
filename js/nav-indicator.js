/**
 * This script creates a navigation indicator that moves under the active link
 * and updates its position when hovering over different links.
 * The indicator is styled with CSS for a smooth transition effect.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Create the navigation indicator
    const nav = document.querySelector('nav ul');
    const indicator = document.createElement('div');
    indicator.className = 'nav-indicator';
    nav.appendChild(indicator);
   
    const updateIndicator = (e) => {
        // Get the target element and its dimensions
        const target = e.target || e;
        const rect = target.getBoundingClientRect();
        const navRect = nav.getBoundingClientRect();
        const width = rect.width - 32;
        const left = rect.left - navRect.left + 16;

        indicator.style.width = `${width}px`;
        indicator.style.transform = `translateX(${left}px)`;
        indicator.style.opacity = '1';
    };

    const hideIndicator = () => {
        // Hide the indicator when not hovering over any link
        const activeLink = nav.querySelector('a.active');
        if (activeLink) {
            updateIndicator(activeLink);
        } else {
            indicator.style.opacity = '0';
        }
    };

    // Set initial position for active link
    const activeLink = nav.querySelector('a.active');
    if (activeLink) {
        updateIndicator(activeLink);
    }

    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('mouseenter', updateIndicator);
    });

    nav.addEventListener('mouseleave', hideIndicator);
}); 