// Advanced Animations Controller
class AnimationController {
    constructor() {
        this.animations = new Map();
        this.observers = new Map();
        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.setupHoverAnimations();
        this.setupParticleSystem();
        this.setupTextAnimations();
        this.setupProgressAnimations();
    }

    // Scroll-triggered animations
    setupScrollAnimations() {
        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Elements to animate on scroll
        const animatedElements = document.querySelectorAll(
            '.fade-in-up, .slide-in-left, .slide-in-right, .zoom-in, .flip-in'
        );
        
        animatedElements.forEach(el => {
            scrollObserver.observe(el);
        });
    }

    // Hover animations
    setupHoverAnimations() {
        document.querySelectorAll('.card-hover').forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                this.createHoverEffect(e.target);
            });
            
            card.addEventListener('mouseleave', (e) => {
                this.removeHoverEffect(e.target);
            });
        });
    }

    // Particle system for backgrounds
    setupParticleSystem() {
        const particleContainers = document.querySelectorAll('.particles');
        
        particleContainers.forEach(container => {
            this.createParticleField(container);
        });
    }

    createParticleField(container) {
        const particleCount = 50;
        const particles = [];
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 10 + 's';
            particle.style.animationDuration = (10 + Math.random() * 10) + 's';
            
            container.appendChild(particle);
            particles.push(particle);
        }
        
        // Add mouse interaction
        container.addEventListener('mousemove', (e) => {
            const rect = container.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            
            particles.forEach((particle, index) => {
                const speed = (index + 1) * 0.5;
                const xOffset = (x - 0.5) * speed * 20;
                const yOffset = (y - 0.5) * speed * 20;
                
                particle.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
            });
        });
    }

    // Text animations
    setupTextAnimations() {
        const textElements = document.querySelectorAll('.text-reveal');
        
        textElements.forEach(el => {
            this.animateText(el);
        });
    }

    animateText(element) {
        const text = element.textContent;
        element.textContent = '';
        
        const letters = text.split('');
        letters.forEach((letter, index) => {
            const span = document.createElement('span');
            span.textContent = letter;
            span.style.opacity = '0';
            span.style.display = 'inline-block';
            span.style.transform = 'translateY(20px)';
            span.style.transition = `all 0.3s ease ${index * 0.05}s`;
            
            element.appendChild(span);
            
            // Animate in
            setTimeout(() => {
                span.style.opacity = '1';
                span.style.transform = 'translateY(0)';
            }, 100);
        });
    }

    // Progress bar animations
    setupProgressAnimations() {
        const progressBars = document.querySelectorAll('.progress-fill');
        
        progressBars.forEach(bar => {
            const targetWidth = bar.style.width;
            bar.style.width = '0%';
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            bar.style.width = targetWidth;
                        }, 300);
                    }
                });
            });
            
            observer.observe(bar);
        });
    }

    // Element-specific animations
    animateElement(element) {
        const animationType = this.getAnimationType(element);
        
        switch (animationType) {
            case 'fade-in-up':
                this.fadeInUp(element);
                break;
            case 'slide-in-left':
                this.slideInLeft(element);
                break;
            case 'slide-in-right':
                this.slideInRight(element);
                break;
            case 'zoom-in':
                this.zoomIn(element);
                break;
            case 'flip-in':
                this.flipIn(element);
                break;
        }
    }

    getAnimationType(element) {
        const classes = element.className.split(' ');
        const animationClasses = ['fade-in-up', 'slide-in-left', 'slide-in-right', 'zoom-in', 'flip-in'];
        
        for (let className of classes) {
            if (animationClasses.includes(className)) {
                return className;
            }
        }
        
        return 'fade-in-up';
    }

    fadeInUp(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 100);
    }

    slideInLeft(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateX(-50px)';
        element.style.transition = 'all 0.6s ease';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateX(0)';
        }, 100);
    }

    slideInRight(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateX(50px)';
        element.style.transition = 'all 0.6s ease';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateX(0)';
        }, 100);
    }

    zoomIn(element) {
        element.style.opacity = '0';
        element.style.transform = 'scale(0.8)';
        element.style.transition = 'all 0.6s ease';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'scale(1)';
        }, 100);
    }

    flipIn(element) {
        element.style.opacity = '0';
        element.style.transform = 'rotateY(-90deg)';
        element.style.transition = 'all 0.6s ease';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'rotateY(0)';
        }, 100);
    }

    // Hover effects
    createHoverEffect(element) {
        const glow = document.createElement('div');
        glow.className = 'hover-glow';
        glow.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle at center, rgba(102, 126, 234, 0.3) 0%, transparent 70%);
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
            z-index: -1;
        `;
        
        element.style.position = 'relative';
        element.appendChild(glow);
        
        setTimeout(() => {
            glow.style.opacity = '1';
        }, 10);
    }

    removeHoverEffect(element) {
        const glow = element.querySelector('.hover-glow');
        if (glow) {
            glow.style.opacity = '0';
            setTimeout(() => {
                glow.remove();
            }, 300);
        }
    }

    // Advanced button animations
    setupButtonAnimations() {
        document.querySelectorAll('.btn-hover').forEach(button => {
            button.addEventListener('mouseenter', (e) => {
                this.createRippleEffect(e);
            });
        });
    }

    createRippleEffect(e) {
        const button = e.currentTarget;
        const rect = button.getBoundingClientRect();
        const ripple = document.createElement('span');
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    // Parallax scrolling
    setupParallax() {
        const parallaxElements = document.querySelectorAll('.parallax');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const speed = element.dataset.speed || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    }

    // Staggered animations
    staggerAnimate(elements, delay = 100) {
        elements.forEach((element, index) => {
            setTimeout(() => {
                this.animateElement(element);
            }, index * delay);
        });
    }

    // Custom animation sequences
    createSequence(name, steps) {
        this.animations.set(name, steps);
    }

    playSequence(name, element) {
        const sequence = this.animations.get(name);
        if (!sequence) return;
        
        sequence.forEach((step, index) => {
            setTimeout(() => {
                Object.assign(element.style, step);
            }, index * (step.delay || 100));
        });
    }

    // Utility methods
    resetAnimation(element) {
        element.style.transition = '';
        element.style.transform = '';
        element.style.opacity = '';
    }

    pauseAnimation(element) {
        element.style.animationPlayState = 'paused';
    }

    resumeAnimation(element) {
        element.style.animationPlayState = 'running';
    }

    // Add CSS for ripple animation
    addRippleCSS() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize animation controller
const animationController = new AnimationController();
animationController.addRippleCSS();

// Export for use in other files
window.animationController = animationController;
