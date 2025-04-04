/**
 * Dark Mode Manager
 * A simple class to manage dark mode toggle functionality.
 * This class handles the dark mode toggle button, applies the theme based on user preference,
 * and saves the preference in local storage.
 */

class DarkModeManager {
    constructor() {
        // get the toggle button and body element
        this.toggleButton = document.getElementById('mode-toggle');
        this.body = document.body;
        this.htmlElement = document.documentElement;
        // Check if the toggle button exists
        if (!this.toggleButton) {
            console.error('Toggle button not found!');
            return;
        }
        
        this.init();
    }

    init() {
        // apply the theme based on user preference
        this.applyTheme();
        
        // add event listener to the toggle button
        this.toggleButton.addEventListener('click', () => {
            this.toggleTheme();
        });
    }

    applyTheme() {
        // check local storage for theme preference
        const storedTheme = localStorage.getItem('theme');
        
        // apply the stored theme if it exists
        if (storedTheme === 'dark') {
            this.body.classList.add('dark-mode');
            this.htmlElement.classList.add('dark');
            document.documentElement.style.setProperty('color-scheme', 'dark');
            // check system preference if no stored theme
        } else {
            this.body.classList.remove('dark-mode');
            this.htmlElement.classList.remove('dark');
            document.documentElement.style.setProperty('color-scheme', 'light');
        }
    }

    toggleTheme() {
        // toggle the dark mode class on the body
        this.body.classList.toggle('dark-mode');
        
        // check if dark mode is enabled
        const isDarkMode = this.body.classList.contains('dark-mode');
        
        // update the theme based on the toggle state
        if (isDarkMode) {
            localStorage.setItem('theme', 'dark');
            this.htmlElement.classList.add('dark');
            document.documentElement.style.setProperty('color-scheme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
            this.htmlElement.classList.remove('dark');
            document.documentElement.style.setProperty('color-scheme', 'light');
        }
    }
}

// Initialize the DarkModeManager when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    new DarkModeManager();
}); 