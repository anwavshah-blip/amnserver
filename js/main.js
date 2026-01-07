// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const pageTransition = document.createElement('div');
pageTransition.className = 'page-transition';
document.body.appendChild(pageTransition);

// Theme Management
let currentTheme = localStorage.getItem('theme') || 'light';
let restrictedItems = new Set(); // Track restricted items

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    initializeNavigation();
    initializePDFHandling();
    initializeAnimations();
    initializeScrollEffects();
    initializeFooterAnimations();
    enhanceKeyboardNavigation();
    initializeRestrictions();
});

// Theme Management - COMPLETE FIX
function initializeTheme() {
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = currentTheme === 'light' ? '🌙' : '☀️';
    themeToggle.title = `Switch to ${currentTheme === 'light' ? 'dark' : 'light'} mode`;
    document.body.appendChild(themeToggle);

    // Apply saved theme
    applyTheme(currentTheme);

    // Theme toggle event
    themeToggle.addEventListener('click', function() {
        currentTheme = currentTheme === 'light' ? 'dark' : 'light';
        applyTheme(currentTheme);
        localStorage.setItem('theme', currentTheme);
        this.innerHTML = currentTheme === 'light' ? '🌙' : '☀️';
        this.title = `Switch to ${currentTheme === 'light' ? 'dark' : 'light'} mode`;
    });
}

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    
    // Update CSS custom properties
    if (theme === 'dark') {
        document.documentElement.style.setProperty('--primary-color', '#3b82f6');
        document.documentElement.style.setProperty('--secondary-color', '#60a5fa');
        document.documentElement.style.setProperty('--accent-color', '#93c5fd');
        document.documentElement.style.setProperty('--background-color', '#0f172a');
        document.documentElement.style.setProperty('--surface-color', '#1e293b');
        document.documentElement.style.setProperty('--text-primary', '#f1f5f9');
        document.documentElement.style.setProperty('--text-secondary', '#cbd5e1');
        document.documentElement.style.setProperty('--border-color', '#334155');
    } else {
        document.documentElement.style.setProperty('--primary-color', '#2563eb');
        document.documentElement.style.setProperty('--secondary-color', '#1e40af');
        document.documentElement.style.setProperty('--accent-color', '#3b82f6');
        document.documentElement.style.setProperty('--background-color', '#ffffff');
        document.documentElement.style.setProperty('--surface-color', '#f8fafc');
        document.documentElement.style.setProperty('--text-primary', '#1e293b');
        document.documentElement.style.setProperty('--text-secondary', '#64748b');
        document.documentElement.style.setProperty('--border-color', '#e2e8f0');
    }
}

// RESTRICTION SYSTEM - NEW FEATURE
function initializeRestrictions() {
    // Add restriction indicators
    addRestrictionIndicators();
    
    // Block right-click on restricted items
    blockContextMenu();
    
    // Block keyboard shortcuts
    blockKeyboardShortcuts();
    
    // Add visual restrictions
    addVisualRestrictions();
}

function addRestrictionIndicators() {
    const restrictedSelectors = ['.article-card', '.journal .article-card', '.project .article-card', '.research-paper .article-card'];
    
    restrictedSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(card => {
            const restrictionBadge = document.createElement('div');
            restrictionBadge.className = 'restriction-badge';
            restrictionBadge.innerHTML = '🔒 View Only';
            restrictionBadge.title = 'Download and print are restricted for this content';
            card.appendChild(restrictionBadge);
            
            // Mark as restricted
            card.classList.add('restricted-content');
            restrictedItems.add(card);
        });
    });
}

function blockContextMenu() {
    document.addEventListener('contextmenu', function(e) {
        if (e.target.closest('.restricted-content') || 
            e.target.closest('.pdf-modal') || 
            e.target.closest('.pdf-viewer')) {
            e.preventDefault();
            showRestrictionMessage('Right-click is disabled for restricted content');
        }
    });
}

function blockKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Block Ctrl+P, Ctrl+S, Ctrl+Shift+P
        if ((e.ctrlKey || e.metaKey) && 
            (e.key === 'p' || e.key === 's' || (e.shiftKey && e.key === 'P'))) {
            if (document.querySelector('.pdf-modal[style*="block"]') || 
                document.querySelector('.restricted-content:hover')) {
                e.preventDefault();
                showRestrictionMessage('Printing and saving are restricted for this content');
            }
        }
        
        // Block F12 (Developer Tools)
        if (e.key === 'F12') {
            if (document.querySelector('.pdf-modal[style*="block"]')) {
                e.preventDefault();
                showRestrictionMessage('Developer tools are disabled for restricted content');
            }
        }
    });
}

function addVisualRestrictions() {
    const style = document.createElement('style');
    style.textContent = `
        .restricted-content {
            position: relative;
            filter: brightness(0.95);
        }
        
        .restriction-badge {
            position: absolute;
            top: 10px;
            right: 10px;
            background: rgba(239, 68, 68, 0.9);
            color: white;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 0.75rem;
            font-weight: 600;
            z-index: 10;
            backdrop-filter: blur(4px);
        }
        
        .restricted-content::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(45deg, transparent 49%, rgba(239, 68, 68, 0.1) 50%, transparent 51%);
            background-size: 20px 20px;
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .restricted-content:hover::before {
            opacity: 1;
        }
        
        .pdf-modal.restricted::after {
            content: '🔒 Restricted Content - View Only';
            position: absolute;
            top: 60px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(239, 68, 68, 0.9);
            color: white;
            padding: 8px 16px;
            border-radius: var(--radius-sm);
            font-weight: 600;
            z-index: 2002;
            backdrop-filter: blur(4px);
        }
    `;
    document.head.appendChild(style);
}

function showRestrictionMessage(message) {
    const notification = document.createElement('div');
    notification.className = 'restriction-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">🔒</span>
            <span class="notification-text">${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Add styles
    const notificationStyle = document.createElement('style');
    notificationStyle.textContent = `
        .restriction-notification {
            position: fixed;
            top: 100px;
            right: 20px;
            background: rgba(239, 68, 68, 0.9);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            z-index: 3000;
            animation: slideInRight 0.3s ease;
            backdrop-filter: blur(4px);
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .notification-icon {
            font-size: 1.2rem;
        }
        
        @media (max-width: 768px) {
            .restriction-notification {
                top: auto;
                bottom: 20px;
                right: 10px;
                left: 10px;
                text-align: center;
            }
        }
    `;
    
    if (!document.querySelector('#restriction-notification-styles')) {
        notificationStyle.id = 'restriction-notification-styles';
        document.head.appendChild(notificationStyle);
    }
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Navigation Toggle - FIXED FOR MOBILE
function initializeNavigation() {
    // Mobile menu toggle
    hamburger?.addEventListener('click', function(e) {
        e.stopPropagation();
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    });

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger?.classList.remove('active');
            navMenu?.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    // Handle dropdown menus for mobile
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('.nav-link');
        
        if (link) {
            // Remove href for dropdown triggers on mobile
            if (window.innerWidth <= 768) {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    // Close other dropdowns
                    dropdowns.forEach(otherDropdown => {
                        if (otherDropdown !== dropdown) {
                            otherDropdown.classList.remove('active');
                        }
                    });
                    
                    // Toggle current dropdown
                    dropdown.classList.toggle('active');
                });
            }
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.navbar')) {
            hamburger?.classList.remove('active');
            navMenu?.classList.remove('active');
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
            document.body.style.overflow = 'auto';
        }
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            hamburger?.classList.remove('active');
            navMenu?.classList.remove('active');
            document.body.style.overflow = 'auto';
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
}

// PDF Handling - FIXED FOR MOBILE WITH RESTRICTIONS
function initializePDFHandling() {
    // PDF Modal Functions
    window.openPDF = function(pdfPath, isRestricted = false) {
        if (window.innerWidth <= 768) {
            // On mobile, open PDF in new tab instead of modal
            if (isRestricted) {
                showRestrictionMessage('This content is restricted to view-only mode');
            }
            window.open(pdfPath, '_blank');
            return;
        }
        
        const modal = document.getElementById('pdfModal');
        const viewer = document.getElementById('pdfViewer');
        
        if (modal && viewer) {
            viewer.src = pdfPath;
            modal.style.display = 'block';
            modal.classList.toggle('restricted', isRestricted);
            document.body.style.overflow = 'hidden';
            
            // Add mobile-specific controls
            addMobilePDFControls();
        }
    };

    window.closePDF = function() {
        const modal = document.getElementById('pdfModal');
        const viewer = document.getElementById('pdfViewer');
        
        if (modal && viewer) {
            modal.style.display = 'none';
            modal.classList.remove('restricted');
            viewer.src = '';
            document.body.style.overflow = 'auto';
        }
    };

    window.zoomPDF = function(action) {
        const viewer = document.getElementById('pdfViewer');
        if (viewer) {
            let currentZoom = parseInt(viewer.style.zoom) || 100;
            
            if (action === 'in' && currentZoom < 200) {
                currentZoom += 25;
            } else if (action === 'out' && currentZoom > 50) {
                currentZoom -= 25;
            }
            
            viewer.style.zoom = currentZoom + '%';
        }
    };

    // Download handling - PREVENT DIRECT DOWNLOAD ON MOBILE AND RESTRICTED CONTENT
    window.downloadFile = function(filePath, isRestricted = false) {
        if (isRestricted || window.innerWidth <= 768) {
            // On mobile or restricted content, show preview instead of direct download
            showRestrictionMessage('Download is restricted for this content');
            window.openPDF(filePath, true);
            return;
        }
        
        // Desktop behavior - allow download for non-restricted content
        const link = document.createElement('a');
        link.href = 'assets/' + filePath;
        link.download = filePath.split('/').pop();
        link.target = '_blank';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        showDownloadNotification(filePath.split('/').pop());
    };

    // Close modal when clicking outside
    window.onclick = function(event) {
        const modal = document.getElementById('pdfModal');
        if (modal && event.target === modal) {
            window.closePDF();
        }
    };

    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            window.closePDF();
        }
    });

    // Add close button event listener - FIXED
    const closeButton = document.querySelector('.pdf-close');
    if (closeButton) {
        closeButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.closePDF();
        });
    }
}

// Mobile PDF Controls
function addMobilePDFControls() {
    const modal = document.getElementById('pdfModal');
    if (!modal || window.innerWidth > 768) return;

    // Add touch gestures for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    let currentZoom = 100;

    const viewer = document.getElementById('pdfViewer');
    
    modal.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });

    modal.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            // Swipe left - zoom in
            currentZoom = Math.min(currentZoom + 25, 200);
            viewer.style.zoom = currentZoom + '%';
        }
        if (touchEndX > touchStartX + 50) {
            // Swipe right - zoom out
            currentZoom = Math.max(currentZoom - 25, 50);
            viewer.style.zoom = currentZoom + '%';
        }
    }

    // Add double-tap to zoom
    let lastTap = 0;
    modal.addEventListener('touchend', function(e) {
        const currentTime = new Date().getTime();
        const tapLength = currentTime - lastTap;
        if (tapLength < 500 && tapLength > 0) {
            // Double tap detected
            currentZoom = currentZoom === 100 ? 150 : 100;
            viewer.style.zoom = currentZoom + '%';
        }
        lastTap = currentTime;
    });
}

// Show download notification
function showDownloadNotification(filename) {
    const notification = document.createElement('div');
    notification.className = 'download-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">✓</span>
            <span class="notification-text">Downloading: ${filename}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Add styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .download-notification {
            position: fixed;
            top: 100px;
            right: 20px;
            background: #10b981;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            z-index: 1000;
            animation: slideInRight 0.3s ease;
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .notification-icon {
            font-weight: bold;
        }
        
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
        
        @media (max-width: 768px) {
            .download-notification {
                top: auto;
                bottom: 20px;
                right: 10px;
                left: 10px;
                text-align: center;
            }
        }
    `;
    
    if (!document.querySelector('#download-notification-styles')) {
        style.id = 'download-notification-styles';
        document.head.appendChild(style);
    }
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Smooth Animations
function initializeAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.feature-card, .section-title');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Scroll Effects
function initializeScrollEffects() {
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Navbar background opacity
        if (navbar) {
            if (currentScroll > 100) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            }
        }

        // Parallax effect for hero section
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            const scrolled = window.pageYOffset;
            heroSection.style.transform = `translateY(${scrolled * 0.5}px)`;
        }

        lastScroll = currentScroll;
    });
}

// Footer animations and interactions
function initializeFooterAnimations() {
    const footer = document.querySelector('.footer-section');
    if (!footer) return;

    // Animate footer elements on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe footer elements
    const footerElements = document.querySelectorAll('.owner-profile, .footer-contact, .footer-social');
    footerElements.forEach(el => {
        el.classList.add('scroll-animate');
        observer.observe(el);
    });

    // Social media link hover effects
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Contact item animations
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        item.classList.add('scroll-animate');
        observer.observe(item);
    });
}

// Keyboard navigation enhancement
function enhanceKeyboardNavigation() {
    const focusableElements = document.querySelectorAll(
        'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );
    
    focusableElements.forEach(element => {
        element.addEventListener('keydown', function(e) {
            // Escape key handling
            if (e.key === 'Escape') {
                // Close mobile menu
                const hamburger = document.querySelector('.hamburger');
                const navMenu = document.querySelector('.nav-menu');
                if (hamburger?.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navMenu?.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
                
                // Close PDF modal
                window.closePDF();
            }
        });
    });
}

// Smooth scroll for anchor links
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

// Add loading animation
window.addEventListener('load', function() {
    setTimeout(() => {
        pageTransition.classList.remove('active');
    }, 300);
});

// Enhanced scroll indicator
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrolled / windowHeight) * 100;
        
        if (scrollPercent > 10) {
            scrollIndicator.style.opacity = '0';
        } else {
            scrollIndicator.style.opacity = '1';
        }
    });
}

// CTA button ripple effect
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple effect styles dynamically
const style = document.createElement('style');
style.textContent = `
    .cta-button {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
