// Main JavaScript File
class JourneyUniverse {
    constructor() {
        this.currentPage = 'home';
        this.isLoading = false;
        this.init();
    }

    init() {
        this.setupLoadingScreen();
        this.setupNavigation();
        this.setupParticles();
        this.setupStars();
        this.loadPage('home');
    }

    setupLoadingScreen() {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const loadingScreen = document.getElementById('loading-screen');
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }, 1000);
        });
    }

    setupNavigation() {
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Mobile menu toggle
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                hamburger.classList.toggle('active');
            });
        }

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });

        // Submenu toggle for mobile
        document.querySelectorAll('.has-submenu').forEach(item => {
            item.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    item.classList.toggle('active');
                }
            });
        });
    }

    setupParticles() {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles';
        document.body.appendChild(particlesContainer);

        // Create floating particles
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 10 + 's';
            particle.style.animationDuration = (10 + Math.random() * 10) + 's';
            particlesContainer.appendChild(particle);
        }
    }

    setupStars() {
        const starsContainer = document.createElement('div');
        starsContainer.className = 'stars';
        document.body.appendChild(starsContainer);

        // Create twinkling stars
        for (let i = 0; i < 100; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.width = Math.random() * 3 + 'px';
            star.style.height = star.style.width;
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            star.style.animationDelay = Math.random() * 3 + 's';
            starsContainer.appendChild(star);
        }
    }

    async loadPage(pageName) {
        if (this.isLoading) return;
        
        this.isLoading = true;
        this.showLoading();

        try {
            const pageContent = await this.fetchPageContent(pageName);
            this.renderPage(pageName, pageContent);
            this.updateActiveNav(pageName);
            this.currentPage = pageName;
            
            // Initialize page-specific features
            this.initializePageFeatures(pageName);
            
        } catch (error) {
            console.error('Error loading page:', error);
            this.showError('Failed to load page. Please try again.');
        } finally {
            this.hideLoading();
            this.isLoading = false;
        }
    }

    async fetchPageContent(pageName) {
        // Simulate API call with local data
        return new Promise((resolve) => {
            setTimeout(() => {
                const content = this.getPageData(pageName);
                resolve(content);
            }, 300);
        });
    }

    getPageData(pageName) {
        // This would typically come from an API
        const pages = {
            'home': {
                title: 'Welcome to Journey of Universe',
                content: `
                    <section class="hero-section">
                        <div class="hero-content">
                            <h1 class="hero-title fade-in-up">Explore the Cosmos</h1>
                            <p class="hero-subtitle fade-in-up">Discover the wonders of science and technology through interactive experiences</p>
                            <div class="hero-buttons fade-in-up">
                                <button class="btn btn-primary" onclick="journeyApp.loadPage('exploring-idea')">Start Exploring</button>
                                <button class="btn btn-outline" onclick="journeyApp.loadPage('documentation')">View Documentation</button>
                            </div>
                        </div>
                        <div class="hero-image floating">
                            <i class="fas fa-rocket fa-10x"></i>
                        </div>
                    </section>
                    <section class="features-section">
                        <div class="container">
                            <h2 class="section-title">Featured Content</h2>
                            <div class="grid">
                                <div class="card card-hover">
                                    <div class="card-header">
                                        <i class="fas fa-atom fa-3x"></i>
                                        <h3 class="card-title">Physics</h3>
                                    </div>
                                    <div class="card-content">
                                        <p>Explore the fundamental laws that govern our universe</p>
                                    </div>
                                </div>
                                <div class="card card-hover">
                                    <div class="card-header">
                                        <i class="fas fa-mountain fa-3x"></i>
                                        <h3 class="card-title">Geology</h3>
                                    </div>
                                    <div class="card-content">
                                        <p>Discover the Earth's structure and geological processes</p>
                                    </div>
                                </div>
                                <div class="card card-hover">
                                    <div class="card-header">
                                        <i class="fas fa-water fa-3x"></i>
                                        <h3 class="card-title">Hydropower</h3>
                                    </div>
                                    <div class="card-content">
                                        <p>Learn about renewable energy from water resources</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                `
            },
            'exploring-idea': {
                title: 'Exploring Ideas',
                content: `
                    <section class="page-header">
                        <div class="container">
                            <h1 class="page-title">Exploring Ideas</h1>
                            <p class="page-subtitle">Where curiosity meets innovation</p>
                        </div>
                    </section>
                    <section class="content-section">
                        <div class="container">
                            <div class="idea-grid">
                                <div class="idea-card card">
                                    <div class="idea-icon">
                                        <i class="fas fa-lightbulb fa-4x"></i>
                                    </div>
                                    <h3>Innovation Hub</h3>
                                    <p>Explore cutting-edge ideas and breakthrough technologies that shape our future</p>
                                    <button class="btn btn-primary">Learn More</button>
                                </div>
                                <div class="idea-card card">
                                    <div class="idea-icon">
                                        <i class="fas fa-brain fa-4x"></i>
                                    </div>
                                    <h3>Creative Thinking</h3>
                                    <p>Develop your creative problem-solving skills through interactive challenges</p>
                                    <button class="btn btn-primary">Start Challenge</button>
                                </div>
                                <div class="idea-card card">
                                    <div class="idea-icon">
                                        <i class="fas fa-users fa-4x"></i>
                                    </div>
                                    <h3>Collaboration Space</h3>
                                    <p>Connect with like-minded individuals and build amazing projects together</p>
                                    <button class="btn btn-primary">Join Community</button>
                                </div>
                            </div>
                        </div>
                    </section>
                `
            },
            'about': {
                title: 'About the Creator',
                content: `
                    <section class="about-hero">
                        <div class="about-background">
                            <div class="stars"></div>
                        </div>
                        <div class="container">
                            <div class="about-content">
                                <div class="owner-profile">
                                    <div class="owner-image floating">
                                        <img src="assets/images/owner.jpg" alt="Owner" class="avatar avatar-large">
                                    </div>
                                    <div class="owner-info">
                                        <h1 class="owner-name">Your Name</h1>
                                        <p class="owner-title">Creator & Developer</p>
                                        <p class="owner-bio">
                                            Passionate about science, technology, and education. 
                                            Creating interactive experiences to make learning fun and accessible.
                                        </p>
                                        <div class="owner-skills">
                                            <span class="badge">Web Development</span>
                                            <span class="badge">Science Education</span>
                                            <span class="badge">UI/UX Design</span>
                                            <span class="badge">Physics</span>
                                        </div>
                                        <div class="owner-contact">
                                            <button class="btn btn-primary">
                                                <i class="fas fa-envelope"></i> Contact Me
                                            </button>
                                            <button class="btn btn-outline">
                                                <i class="fab fa-github"></i> GitHub
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section class="mission-section">
                        <div class="container">
                            <h2 class="section-title">Our Mission</h2>
                            <div class="mission-content">
                                <div class="mission-card card">
                                    <i class="fas fa-graduation-cap fa-3x"></i>
                                    <h3>Education</h3>
                                    <p>Make complex scientific concepts accessible to everyone</p>
                                </div>
                                <div class="mission-card card">
                                    <i class="fas fa-globe fa-3x"></i>
                                    <h3>Exploration</h3>
                                    <p>Inspire curiosity about the universe and our place in it</p>
                                </div>
                                <div class="mission-card card">
                                    <i class="fas fa-handshake fa-3x"></i>
                                    <h3>Community</h3>
                                    <p>Build a global community of learners and explorers</p>
                                </div>
                            </div>
                        </div>
                    </section>
                `
            }
        };

        return pages[pageName] || pages['home'];
    }

    renderPage(pageName, pageData) {
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = `
            <div class="page-transition">
                ${pageData.content}
            </div>
        `;
        
        // Add page-specific title
        document.title = `${pageData.title} - Journey of Universe`;
    }

    updateActiveNav(pageName) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-page') === pageName) {
                link.classList.add('active');
            }
        });
    }

    initializePageFeatures(pageName) {
        // Initialize interactions for specific pages
        const interactionPages = ['research', 'projects', 'articles', 'journal', 'physics'];
        
        if (interactionPages.includes(pageName)) {
            this.initializeInteractions();
        }
        
        // Initialize animations
        this.initializeAnimations();
    }

    initializeInteractions() {
        // Like buttons
        document.querySelectorAll('.like-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleLike(btn);
            });
        });

        // Comment buttons
        document.querySelectorAll('.comment-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleComment(btn);
            });
        });

        // View counters (simulate)
        document.querySelectorAll('.view-count').forEach(view => {
            const currentCount = parseInt(view.textContent) || 0;
            view.textContent = `${currentCount + 1} views`;
        });
    }

    handleLike(button) {
        button.classList.toggle('active');
        const count = button.querySelector('.interaction-count');
        const currentCount = parseInt(count.textContent) || 0;
        
        if (button.classList.contains('active')) {
            count.textContent = currentCount + 1;
        } else {
            count.textContent = Math.max(0, currentCount - 1);
        }
    }

    handleComment(button) {
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <h3>Add Comment</h3>
                <form class="comment-form">
                    <div class="form-group">
                        <label class="form-label">Your Name</label>
                        <input type="text" class="form-input" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Comment</label>
                        <textarea class="form-textarea" required></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary">Post Comment</button>
                </form>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Close modal
        modal.querySelector('.modal-close').addEventListener('click', () => {
            modal.remove();
        });
        
        // Handle form submission
        modal.querySelector('.comment-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.submitComment(modal);
        });
    }

    submitComment(modal) {
        // Simulate comment submission
        const formData = new FormData(modal.querySelector('.comment-form'));
        
        // Show success message
        const successMsg = document.createElement('div');
        successMsg.innerHTML = `
            <div style="color: #4caf50; text-align: center; padding: 1rem;">
                <i class="fas fa-check-circle fa-2x"></i>
                <p>Comment posted successfully!</p>
            </div>
        `;
        
        modal.querySelector('.modal-content').innerHTML = successMsg.innerHTML;
        
        setTimeout(() => {
            modal.remove();
        }, 2000);
    }

    initializeAnimations() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        document.querySelectorAll('.card, .section-title, .idea-card').forEach(el => {
            observer.observe(el);
        });
    }

    showLoading() {
        const loadingEl = document.createElement('div');
        loadingEl.className = 'page-loading';
        loadingEl.innerHTML = '<div class="spinner"></div>';
        document.getElementById('main-content').appendChild(loadingEl);
    }

    hideLoading() {
        const loadingEl = document.querySelector('.page-loading');
        if (loadingEl) {
            loadingEl.remove();
        }
    }

    showError(message) {
        const errorEl = document.createElement('div');
        errorEl.className = 'error-message';
        errorEl.innerHTML = `
            <div class="card">
                <h3>Error</h3>
                <p>${message}</p>
                <button class="btn btn-primary" onclick="this.parentElement.parentElement.remove()">OK</button>
            </div>
        `;
        document.getElementById('main-content').appendChild(errorEl);
    }
}

// Initialize the app
const journeyApp = new JourneyUniverse();

// Make it globally accessible for HTML onclick handlers
window.journeyApp = journeyApp;
