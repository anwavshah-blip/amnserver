// Theme Management System

document.addEventListener('DOMContentLoaded', function() {
    initializeThemeSystem();
});

function initializeThemeSystem() {
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    
    // Check for saved theme preference or use auto-detection
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set initial theme
    if (savedTheme) {
        html.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
    } else {
        // Use auto-detection based on time if no saved preference
        const hour = new Date().getHours();
        const isDarkMode = hour >= 18 || hour < 6;
        html.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
        updateThemeIcon(isDarkMode ? 'dark' : 'light');
    }
    
    // Theme toggle functionality
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
        if (!localStorage.getItem('theme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            html.setAttribute('data-theme', newTheme);
            updateThemeIcon(newTheme);
        }
    });
    
    // Auto theme detection based on time (if no manual preference)
    if (!localStorage.getItem('theme')) {
        setInterval(autoDetectTheme, 60000); // Check every minute
    }
}

function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // Add transition effect
    html.style.transition = 'all 0.3s ease';
    
    // Update theme
    html.setAttribute('data-theme', newTheme);
    updateThemeIcon(newTheme);
    
    // Save preference
    localStorage.setItem('theme', newTheme);
    
    // Dispatch custom event for other components
    window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme: newTheme } }));
    
    // Remove transition after animation
    setTimeout(() => {
        html.style.transition = '';
    }, 300);
}

function updateThemeIcon(theme) {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    
    const icon = themeToggle.querySelector('i');
    if (icon) {
        if (theme === 'dark') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }
}

function autoDetectTheme() {
    const html = document.documentElement;
    const hour = new Date().getHours();
    const isDarkMode = hour >= 18 || hour < 6;
    const currentTheme = html.getAttribute('data-theme');
    
    if ((isDarkMode && currentTheme !== 'dark') || (!isDarkMode && currentTheme !== 'light')) {
        html.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
        updateThemeIcon(isDarkMode ? 'dark' : 'light');
    }
}

// Advanced Theme Features
function applyThemeStyles(theme) {
    const root = document.documentElement;
    
    if (theme === 'dark') {
        // Dark theme specific adjustments
        root.style.setProperty('--shadow-light', 'rgba(255, 255, 255, 0.05)');
        root.style.setProperty('--shadow-dark', 'rgba(0, 0, 0, 0.3)');
    } else {
        // Light theme specific adjustments
        root.style.setProperty('--shadow-light', 'rgba(255, 255, 255, 0.8)');
        root.style.setProperty('--shadow-dark', 'rgba(0, 0, 0, 0.1)');
    }
}

// Listen for theme changes
window.addEventListener('themeChanged', function(e) {
    applyThemeStyles(e.detail.theme);
    
    // Update any theme-dependent elements
    updateThemeDependentElements(e.detail.theme);
});

function updateThemeDependentElements(theme) {
    // Update chart colors if any
    const charts = document.querySelectorAll('.chart-container');
    charts.forEach(chart => {
        // Update chart colors based on theme
        chart.style.filter = theme === 'dark' ? 'invert(1) hue-rotate(180deg)' : 'none';
    });
    
    // Update image filters if needed
    const images = document.querySelectorAll('.preview-image');
    images.forEach(img => {
        img.style.filter = theme === 'dark' ? 'brightness(0.8) contrast(1.1)' : 'none';
    });
}

// System Theme Detection
function detectSystemTheme() {
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    return darkModeQuery.matches ? 'dark' : 'light';
}

// Theme Persistence
function saveThemePreference(theme) {
    try {
        localStorage.setItem('theme', theme);
        localStorage.setItem('themeTimestamp', Date.now().toString());
    } catch (error) {
        console.warn('Unable to save theme preference:', error);
    }
}

function loadThemePreference() {
    try {
        const savedTheme = localStorage.getItem('theme');
        const timestamp = localStorage.getItem('themeTimestamp');
        
        // Check if preference is less than 30 days old
        if (savedTheme && timestamp) {
            const age = Date.now() - parseInt(timestamp);
            const maxAge = 30 * 24 * 60 * 60 * 1000; // 30 days
            if (age < maxAge) {
                return savedTheme;
            }
        }
        return null;
    } catch (error) {
        console.warn('Unable to load theme preference:', error);
        return null;
    }
}

// Accessibility: Respect user's motion preferences
function initializeMotionPreferences() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
        document.documentElement.style.setProperty('--animation-duration', '0.01ms');
        document.documentElement.style.setProperty('--transition-duration', '0.01ms');
    }
}

// Initialize motion preferences
document.addEventListener('DOMContentLoaded', initializeMotionPreferences);

// High Contrast Mode Support
function initializeHighContrastSupport() {
    const prefersHighContrast = window.matchMedia('(prefers-contrast: high)').matches;
    
    if (prefersHighContrast) {
        document.documentElement.setAttribute('data-high-contrast', 'true');
    }
    
    window.matchMedia('(prefers-contrast: high)').addEventListener('change', function(e) {
        if (e.matches) {
            document.documentElement.setAttribute('data-high-contrast', 'true');
        } else {
            document.documentElement.removeAttribute('data-high-contrast');
        }
    });
}

// Initialize high contrast support
document.addEventListener('DOMContentLoaded', initializeHighContrastSupport);

// Export functions for use in other scripts
window.ThemeManager = {
    toggleTheme,
    getCurrentTheme: () => document.documentElement.getAttribute('data-theme'),
    setTheme: (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        updateThemeIcon(theme);
        saveThemePreference(theme);
    }
};