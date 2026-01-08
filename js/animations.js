// Advanced Animation Controller

document.addEventListener('DOMContentLoaded', function() {
    initializeScrollAnimations();
    initializeHoverAnimations();
    initializeLoadingAnimations();
    initializeInteractiveAnimations();
});

// Scroll-based animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const animationType = element.dataset.animation || 'fadeInUp';
                const delay = element.dataset.delay || 0;
                
                setTimeout(() => {
                    applyAnimation(element, animationType);
                }, delay);
                
                // Unobserve after animation
                observer.unobserve(element);
            }
        });
    }, observerOptions);
    
    // Observe elements with data-animation attribute
    const animatedElements = document.querySelectorAll('[data-animation]');
    animatedElements.forEach(el => observer.observe(el));
    
    // Observe common animation targets
    const commonTargets = document.querySelectorAll('.feature-card, .article-card, .research-card, .project-card, .journal-card, .news-item');
    commonTargets.forEach((el, index) => {
        el.dataset.animation = 'fadeInUp';
        el.dataset.delay = index * 100;
        observer.observe(el);
    });
}

// Hover animations
function initializeHoverAnimations() {
    const hoverElements = document.querySelectorAll('[data-hover-animation]');
    
    hoverElements.forEach(element => {
        const animationType = element.dataset.hoverAnimation;
        
        element.addEventListener('mouseenter', function() {
            this.classList.add(animationType);
        });
        
        element.addEventListener('mouseleave', function() {
            this.classList.remove(animationType);
        });
    });
}

// Loading animations
function initializeLoadingAnimations() {
    // Create loading overlay
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';
    loadingOverlay.innerHTML = `
        <div class="loading-content">
            <div class="loading-spinner"></div>
            <p>Loading...</p>
        </div>
    `;
    
    // Add to page
    document.body.appendChild(loadingOverlay);
    
    // Remove loading overlay when page is fully loaded
    window.addEventListener('load', function() {
        setTimeout(() => {
            loadingOverlay.style.opacity = '0';
            setTimeout(() => {
                loadingOverlay.remove();
            }, 500);
        }, 1000);
    });
}

// Interactive animations
function initializeInteractiveAnimations() {
    // Mouse move parallax effect
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    if (parallaxElements.length > 0) {
        document.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            parallaxElements.forEach(element => {
                const speed = element.dataset.parallax || 0.5;
                const x = (mouseX - 0.5) * speed * 50;
                const y = (mouseY - 0.5) * speed * 50;
                
                element.style.transform = `translate(${x}px, ${y}px)`;
            });
        });
    }
    
    // Click ripple effect
    const rippleElements = document.querySelectorAll('[data-ripple]');
    rippleElements.forEach(element => {
        element.addEventListener('click', createRippleEffect);
    });
    
    // Scroll progress indicator
    createScrollProgressIndicator();
}

// Utility animation functions
function applyAnimation(element, animationType) {
    element.style.opacity = '1';
    element.style.transform = 'none';
    
    switch(animationType) {
        case 'fadeIn':
            element.classList.add('animate-fade-in');
            break;
        case 'fadeInUp':
            element.classList.add('fade-in-up');
            break;
        case 'fadeInDown':
            element.classList.add('fade-in-down');
            break;
        case 'fadeInLeft':
            element.classList.add('slide-in-left');
            break;
        case 'fadeInRight':
            element.classList.add('slide-in-right');
            break;
        case 'zoomIn':
            element.classList.add('zoom-in');
            break;
        case 'bounceIn':
            element.classList.add('bounce');
            break;
        case 'rotateIn':
            element.classList.add('roll-in');
            break;
        case 'flipIn':
            element.classList.add('card-flip');
            break;
        default:
            element.classList.add('fade-in-up');
    }
}

function createRippleEffect(event) {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const ripple = document.createElement('span');
    ripple.className = 'ripple-effect';
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        left: ${x}px;
        top: ${y}px;
        width: 20px;
        height: 20px;
        margin-left: -10px;
        margin-top: -10px;
        pointer-events: none;
    `;
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
}

function createScrollProgressIndicator() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, var(--accent-color), var(--accent-hover));
        z-index: 9999;
        transition: width 0.3s ease;
        box-shadow: 0 2px 4px rgba(66, 153, 225, 0.3);
    `;
    
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrolled = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Advanced animation controller
class AnimationController {
    constructor() {
        this.animations = new Map();
        this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    
    addAnimation(element, type, options = {}) {
        if (this.isReducedMotion) return;
        
        const animation = {
            element,
            type,
            options: { duration: 1000, delay: 0, easing: 'ease-out', ...options },
            isPlaying: false
        };
        
        this.animations.set(element, animation);
    }
    
    playAnimation(element) {
        const animation = this.animations.get(element);
        if (!animation || animation.isPlaying) return;
        
        animation.isPlaying = true;
        applyAnimation(element, animation.type);
        
        setTimeout(() => {
            animation.isPlaying = false;
        }, animation.options.duration + animation.options.delay);
    }
    
    pauseAll() {
        this.animations.forEach(animation => {
            animation.element.style.animationPlayState = 'paused';
        });
    }
    
    resumeAll() {
        this.animations.forEach(animation => {
            animation.element.style.animationPlayState = 'running';
        });
    }
}

// Create global animation controller
window.animationController = new AnimationController();

// Particle system
class ParticleSystem {
    constructor(container, options = {}) {
        this.container = container;
        this.particles = [];
        this.options = {
            count: 50,
            color: '#4299e1',
            size: { min: 2, max: 6 },
            speed: { min: 0.5, max: 2 },
            ...options
        };
        
        this.init();
    }
    
    init() {
        for (let i = 0; i < this.options.count; i++) {
            this.createParticle();
        }
        
        this.animate();
    }
    
    createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            background: ${this.options.color};
            border-radius: 50%;
            opacity: 0.6;
            pointer-events: none;
        `;
        
        const size = Math.random() * (this.options.size.max - this.options.size.min) + this.options.size.min;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        particle.x = Math.random() * this.container.offsetWidth;
        particle.y = Math.random() * this.container.offsetHeight;
        particle.vx = (Math.random() - 0.5) * (this.options.speed.max - this.options.speed.min) + this.options.speed.min;
        particle.vy = (Math.random() - 0.5) * (this.options.speed.max - this.options.speed.min) + this.options.speed.min;
        
        particle.style.left = particle.x + 'px';
        particle.style.top = particle.y + 'px';
        
        this.container.appendChild(particle);
        this.particles.push(particle);
    }
    
    animate() {
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Bounce off edges
            if (particle.x <= 0 || particle.x >= this.container.offsetWidth - particle.offsetWidth) {
                particle.vx *= -1;
            }
            if (particle.y <= 0 || particle.y >= this.container.offsetHeight - particle.offsetHeight) {
                particle.vy *= -1;
            }
            
            particle.style.left = particle.x + 'px';
            particle.style.top = particle.y + 'px';
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Text typing animation
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Number counter animation
function animateCounter(element, start, end, duration = 2000) {
    const range = end - start;
    const increment = end > start ? 1 : -1;
    const stepTime = Math.abs(Math.floor(duration / range));
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        element.textContent = current;
        
        if (current === end) {
            clearInterval(timer);
        }
    }, stepTime);
}

// Export animation functions
window.AnimationUtils = {
    applyAnimation,
    createRippleEffect,
    ParticleSystem,
    typeWriter,
    animateCounter,
    AnimationController
};

// Add CSS for animations
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .scroll-progress {
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, var(--accent-color), var(--accent-hover));
        z-index: 9999;
        transition: width 0.3s ease;
        box-shadow: 0 2px 4px rgba(66, 153, 225, 0.3);
    }
    
    .animate-fade-in {
        animation: fadeIn 1s ease-out;
    }
    
    .fade-in-up {
        animation: fadeInUp 0.8s ease-out;
    }
    
    .fade-in-down {
        animation: fadeInDown 0.8s ease-out;
    }
    
    @keyframes fadeInDown {
        from {
            opacity: 0;
            transform: translateY(-50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .loading-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--bg-primary);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
    }
    
    .loading-content {
        text-align: center;
    }
    
    .loading-spinner {
        width: 60px;
        height: 60px;
        border: 3px solid var(--border-color);
        border-top: 3px solid var(--accent-color);
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto 1rem;
    }
    
    .loading-content p {
        color: var(--text-secondary);
        font-size: 1.1rem;
    }
`;
document.head.appendChild(animationStyles);