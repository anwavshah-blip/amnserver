// Navigation Management
class NavigationManager {
    constructor() {
        this.routes = {
            'home': { title: 'Home', file: 'pages/home.html' },
            'exploring-idea': { title: 'Exploring Idea', file: 'pages/exploring-idea.html' },
            'documentation': { title: 'Documentation', file: 'pages/documentation.html' },
            'articles': { title: 'Published Articles', file: 'pages/documentation/articles.html' },
            'projects': { title: 'Projects', file: 'pages/documentation/projects.html' },
            'research': { title: 'Research Papers', file: 'pages/documentation/research.html' },
            'journal': { title: 'Journal', file: 'pages/documentation/journal.html' },
            'journey': { title: 'Journey', file: 'pages/journey.html' },
            'physics': { title: 'Physics', file: 'pages/journey/physics.html' },
            'hydropower': { title: 'Hydropower', file: 'pages/journey/hydropower.html' },
            'water-supply': { title: 'Water Supply', file: 'pages/journey/water-supply.html' },
            'geology': { title: 'Geology', file: 'pages/journey/geology.html' },
            'environmental': { title: 'Environmental Engineering', file: 'pages/journey/environmental.html' },
            'irrigation': { title: 'Irrigation', file: 'pages/journey/irrigation.html' },
            'geotechnical': { title: 'Geotechnical', file: 'pages/journey/geotechnical.html' },
            'mathematics': { title: 'Mathematics', file: 'pages/journey/mathematics.html' },
            'gallery': { title: 'Explore Earth Gallery', file: 'pages/journey/gallery.html' },
            'about': { title: 'About', file: 'pages/about.html' },
            'download': { title: 'Download', file: 'pages/download.html' }
        };
        
        this.currentRoute = 'home';
        this.init();
    }

    init() {
        this.setupRouting();
        this.handlePopState();
    }

    setupRouting() {
        // Handle navigation clicks
        document.addEventListener('click', (e) => {
            const navLink = e.target.closest('.nav-link');
            if (navLink) {
                e.preventDefault();
                const page = navLink.getAttribute('data-page');
                if (page) {
                    this.navigateTo(page);
                }
            }
        });
    }

    navigateTo(page) {
        if (this.routes[page]) {
            this.currentRoute = page;
            this.updateURL(page);
            this.loadPageContent(page);
        }
    }

    updateURL(page) {
        const url = `#${page}`;
        if (window.location.hash !== url) {
            window.history.pushState({ page: page }, '', url);
        }
    }

    handlePopState() {
        window.addEventListener('popstate', (e) => {
            const page = e.state?.page || 'home';
            this.loadPageContent(page);
        });
    }

    async loadPageContent(page) {
        if (!this.routes[page]) {
            page = 'home';
        }

        try {
            // Show loading state
            this.showPageLoading();
            
            // Simulate content loading
            await new Promise(resolve => setTimeout(resolve, 300));
            
            // Load content (in a real app, this would fetch from server)
            const content = this.generatePageContent(page);
            
            // Render content
            this.renderContent(content);
            
            // Update navigation
            this.updateNavigationState(page);
            
            // Initialize page features
            this.initializePageFeatures(page);
            
        } catch (error) {
            console.error('Error loading page:', error);
            this.renderError('Failed to load page content');
        } finally {
            this.hidePageLoading();
        }
    }

    generatePageContent(page) {
        const route = this.routes[page];
        
        // Generate content based on page type
        if (page.includes('documentation') || page.includes('journey')) {
            return this.generateSubPageContent(page, route.title);
        } else {
            return this.generateMainPageContent(page, route.title);
        }
    }

    generateMainPageContent(page, title) {
        const contents = {
            'home': this.getHomeContent(),
            'exploring-idea': this.getExploringIdeaContent(),
            'documentation': this.getDocumentationContent(),
            'journey': this.getJourneyContent(),
            'about': this.getAboutContent(),
            'download': this.getDownloadContent()
        };
        
        return contents[page] || this.getDefaultContent(title);
    }

    generateSubPageContent(page, title) {
        const hasInteractions = ['research', 'projects', 'articles', 'journal', 'physics'].includes(page);
        
        return `
            <section class="page-header">
                <div class="container">
                    <h1 class="page-title fade-in-up">${title}</h1>
                    <p class="page-subtitle fade-in-up">Explore detailed information about ${title.toLowerCase()}</p>
                </div>
            </section>
            <section class="content-section">
                <div class="container">
                    <div class="content-grid">
                        <article class="content-card card fade-in-up">
                            <div class="card-header">
                                <h2 class="card-title">${title} Overview</h2>
                                <span class="badge">Latest</span>
                            </div>
                            <div class="card-content">
                                <p>This is the ${title} section where you can find comprehensive information, research findings, and detailed analysis.</p>
                                <p>Our team of experts continuously updates this section with the latest developments and discoveries in the field.</p>
                                <div class="progress-bar">
                                    <div class="progress-fill" style="width: 75%"></div>
                                </div>
                                <p><strong>Completion:</strong> 75%</p>
                            </div>
                            ${hasInteractions ? this.getInteractionBar() : ''}
                        </article>
                        
                        <aside class="sidebar fade-in-up">
                            <div class="card">
                                <h3>Quick Links</h3>
                                <ul class="sidebar-links">
                                    <li><a href="#overview">Overview</a></li>
                                    <li><a href="#details">Details</a></li>
                                    <li><a href="#resources">Resources</a></li>
                                    <li><a href="#references">References</a></li>
                                </ul>
                            </div>
                            
                            <div class="card">
                                <h3>Related Topics</h3>
                                <div class="tag-cloud">
                                    <span class="badge">Science</span>
                                    <span class="badge">Technology</span>
                                    <span class="badge">Research</span>
                                    <span class="badge">Education</span>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>
        `;
    }

    getHomeContent() {
        return `
            <section class="hero-section">
                <div class="hero-background">
                    <div class="stars"></div>
                    <div class="particles"></div>
                </div>
                <div class="container">
                    <div class="hero-content">
                        <h1 class="hero-title fade-in-up">
                            Journey of Universe
                            <span class="text-gradient">Explore the Cosmos</span>
                        </h1>
                        <p class="hero-subtitle fade-in-up">
                            Discover the wonders of science and technology through interactive experiences
                        </p>
                        <div class="hero-buttons fade-in-up">
                            <button class="btn btn-primary btn-hover" onclick="journeyApp.loadPage('exploring-idea')">
                                <i class="fas fa-rocket"></i> Start Exploring
                            </button>
                            <button class="btn btn-outline btn-hover" onclick="journeyApp.loadPage('documentation')">
                                <i class="fas fa-book"></i> View Documentation
                            </button>
                        </div>
                    </div>
                    <div class="hero-visual">
                        <div class="floating">
                            <i class="fas fa-globe-americas fa-10x"></i>
                        </div>
                    </div>
                </div>
            </section>
            
            <section class="features-section">
                <div class="container">
                    <h2 class="section-title fade-in-up">Featured Content</h2>
                    <div class="features-grid">
                        <div class="feature-card card card-hover fade-in-up">
                            <div class="feature-icon">
                                <i class="fas fa-atom fa-3x"></i>
                            </div>
                            <h3>Physics</h3>
                            <p>Explore the fundamental laws that govern our universe</p>
                            <button class="btn btn-primary" onclick="journeyApp.loadPage('physics')">
                                Learn More
                            </button>
                        </div>
                        
                        <div class="feature-card card card-hover fade-in-up">
                            <div class="feature-icon">
                                <i class="fas fa-mountain fa-3x"></i>
                            </div>
                            <h3>Geology</h3>
                            <p>Discover the Earth's structure and geological processes</p>
                            <button class="btn btn-primary" onclick="journeyApp.loadPage('geology')">
                                Learn More
                            </button>
                        </div>
                        
                        <div class="feature-card card card-hover fade-in-up">
                            <div class="feature-icon">
                                <i class="fas fa-water fa-3x"></i>
                            </div>
                            <h3>Hydropower</h3>
                            <p>Learn about renewable energy from water resources</p>
                            <button class="btn btn-primary" onclick="journeyApp.loadPage('hydropower')">
                                Learn More
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    getExploringIdeaContent() {
        return `
            <section class="page-header">
                <div class="container">
                    <h1 class="page-title fade-in-up">Exploring Ideas</h1>
                    <p class="page-subtitle fade-in-up">Where curiosity meets innovation</p>
                </div>
            </section>
            <section class="ideas-section">
                <div class="container">
                    <div class="ideas-grid">
                        <div class="idea-card card card-hover fade-in-up">
                            <div class="idea-icon">
                                <i class="fas fa-lightbulb fa-4x"></i>
                            </div>
                            <h3>Innovation Hub</h3>
                            <p>Explore cutting-edge ideas and breakthrough technologies that shape our future</p>
                            <div class="idea-features">
                                <span class="badge">New</span>
                                <span class="badge">Trending</span>
                            </div>
                            <button class="btn btn-primary btn-hover">Explore Ideas</button>
                        </div>
                        
                        <div class="idea-card card card-hover fade-in-up">
                            <div class="idea-icon">
                                <i class="fas fa-brain fa-4x"></i>
                            </div>
                            <h3>Creative Thinking</h3>
                            <p>Develop your creative problem-solving skills through interactive challenges</p>
                            <div class="idea-features">
                                <span class="badge">Interactive</span>
                                <span class="badge">Learning</span>
                            </div>
                            <button class="btn btn-primary btn-hover">Start Challenge</button>
                        </div>
                        
                        <div class="idea-card card card-hover fade-in-up">
                            <div class="idea-icon">
                                <i class="fas fa-users fa-4x"></i>
                            </div>
                            <h3>Collaboration Space</h3>
                            <p>Connect with like-minded individuals and build amazing projects together</p>
                            <div class="idea-features">
                                <span class="badge">Community</span>
                                <span class="badge">Collaboration</span>
                            </div>
                            <button class="btn btn-primary btn-hover">Join Community</button>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    getDocumentationContent() {
        return `
            <section class="page-header">
                <div class="container">
                    <h1 class="page-title fade-in-up">Documentation</h1>
                    <p class="page-subtitle fade-in-up">Comprehensive resources and research materials</p>
                </div>
            </section>
            <section class="docs-section">
                <div class="container">
                    <div class="docs-grid">
                        <div class="doc-category card card-hover fade-in-up">
                            <div class="doc-icon">
                                <i class="fas fa-file-alt fa-3x"></i>
                            </div>
                            <h3>Published Articles</h3>
                            <p>Peer-reviewed articles and publications</p>
                            <button class="btn btn-primary" onclick="journeyApp.loadPage('articles')">
                                Browse Articles
                            </button>
                        </div>
                        
                        <div class="doc-category card card-hover fade-in-up">
                            <div class="doc-icon">
                                <i class="fas fa-project-diagram fa-3x"></i>
                            </div>
                            <h3>Projects</h3>
                            <p>Documentation of various projects and implementations</p>
                            <button class="btn btn-primary" onclick="journeyApp.loadPage('projects')">
                                View Projects
                            </button>
                        </div>
                        
                        <div class="doc-category card card-hover fade-in-up">
                            <div class="doc-icon">
                                <i class="fas fa-microscope fa-3x"></i>
                            </div>
                            <h3>Research Papers</h3>
                            <p>In-depth research and scientific papers</p>
                            <button class="btn btn-primary" onclick="journeyApp.loadPage('research')">
                                Read Research
                            </button>
                        </div>
                        
                        <div class="doc-category card card-hover fade-in-up">
                            <div class="doc-icon">
                                <i class="fas fa-book fa-3x"></i>
                            </div>
                            <h3>Journal</h3>
                            <p>Regular updates and journal entries</p>
                            <button class="btn btn-primary" onclick="journeyApp.loadPage('journal')">
                                Read Journal
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    getJourneyContent() {
        return `
            <section class="page-header">
                <div class="container">
                    <h1 class="page-title fade-in-up">Journey</h1>
                    <p class="page-subtitle fade-in-up">Explore different fields of science and engineering</p>
                </div>
            </section>
            <section class="journey-section">
                <div class="container">
                    <div class="journey-grid">
                        <div class="journey-card card card-hover fade-in-up">
                            <div class="journey-icon">
                                <i class="fas fa-atom fa-3x"></i>
                            </div>
                            <h3>Physics</h3>
                            <p>Understanding the fundamental laws of nature</p>
                            <button class="btn btn-primary" onclick="journeyApp.loadPage('physics')">
                                Explore Physics
                            </button>
                        </div>
                        
                        <div class="journey-card card card-hover fade-in-up">
                            <div class="journey-icon">
                                <i class="fas fa-bolt fa-3x"></i>
                            </div>
                            <h3>Hydropower</h3>
                            <p>Renewable energy from water resources</p>
                            <button class="btn btn-primary" onclick="journeyApp.loadPage('hydropower')">
                                Learn Hydropower
                            </button>
                        </div>
                        
                        <div class="journey-card card card-hover fade-in-up">
                            <div class="journey-icon">
                                <i class="fas fa-tint fa-3x"></i>
                            </div>
                            <h3>Water Supply</h3>
                            <p>Engineering solutions for water management</p>
                            <button class="btn btn-primary" onclick="journeyApp.loadPage('water-supply')">
                                Study Water Systems
                            </button>
                        </div>
                        
                        <div class="journey-card card card-hover fade-in-up">
                            <div class="journey-icon">
                                <i class="fas fa-mountain fa-3x"></i>
                            </div>
                            <h3>Geology</h3>
                            <p>Earth's structure and geological processes</p>
                            <button class="btn btn-primary" onclick="journeyApp.loadPage('geology')">
                                Discover Geology
                            </button>
                        </div>
                        
                        <div class="journey-card card card-hover fade-in-up">
                            <div class="journey-icon">
                                <i class="fas fa-leaf fa-3x"></i>
                            </div>
                            <h3>Environmental Engineering</h3>
                            <p>Sustainable solutions for environmental challenges</p>
                            <button class="btn btn-primary" onclick="journeyApp.loadPage('environmental')">
                                Explore Environment
                            </button>
                        </div>
                        
                        <div class="journey-card card card-hover fade-in-up">
                            <div class="journey-icon">
                                <i class="fas fa-seedling fa-3x"></i>
                            </div>
                            <h3>Irrigation</h3>
                            <p>Agricultural water management systems</p>
                            <button class="btn btn-primary" onclick="journeyApp.loadPage('irrigation')">
                                Study Irrigation
                            </button>
                        </div>
                        
                        <div class="journey-card card card-hover fade-in-up">
                            <div class="journey-icon">
                                <i class="fas fa-hard-hat fa-3x"></i>
                            </div>
                            <h3>Geotechnical</h3>
                            <p>Soil and foundation engineering</p>
                            <button class="btn btn-primary" onclick="journeyApp.loadPage('geotechnical')">
                                Learn Geotechnical
                            </button>
                        </div>
                        
                        <div class="journey-card card card-hover fade-in-up">
                            <div class="journey-icon">
                                <i class="fas fa-calculator fa-3x"></i>
                            </div>
                            <h3>Mathematics</h3>
                            <p>Mathematical foundations of engineering</p>
                            <button class="btn btn-primary" onclick="journeyApp.loadPage('mathematics')">
                                Study Mathematics
                            </button>
                        </div>
                        
                        <div class="journey-card card card-hover fade-in-up">
                            <div class="journey-icon">
                                <i class="fas fa-globe-americas fa-3x"></i>
                            </div>
                            <h3>Explore Earth Gallery</h3>
                            <p>Visual journey through Earth's wonders</p>
                            <button class="btn btn-primary" onclick="journeyApp.loadPage('gallery')">
                                View Gallery
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    getAboutContent() {
        return `
            <section class="about-hero">
                <div class="about-background">
                    <div class="stars"></div>
                    <div class="particles"></div>
                </div>
                <div class="container">
                    <div class="about-content">
                        <div class="owner-profile">
                            <div class="owner-image floating">
                                <div class="avatar-container">
                                    <img src="https://via.placeholder.com/200x200/667eea/ffffff?text=Your+Photo" alt="Owner" class="avatar avatar-large">
                                    <div class="avatar-glow"></div>
                                </div>
                            </div>
                            <div class="owner-info fade-in-up">
                                <h1 class="owner-name">Your Name</h1>
                                <p class="owner-title">Creator & Developer</p>
                                <p class="owner-bio">
                                    Passionate about science, technology, and education. 
                                    Creating interactive experiences to make learning fun and accessible for everyone.
                                </p>
                                <div class="owner-skills">
                                    <span class="badge">Web Development</span>
                                    <span class="badge">Science Education</span>
                                    <span class="badge">UI/UX Design</span>
                                    <span class="badge">Physics</span>
                                    <span class="badge">Engineering</span>
                                </div>
                                <div class="owner-stats">
                                    <div class="stat">
                                        <span class="stat-number">50+</span>
                                        <span class="stat-label">Projects</span>
                                    </div>
                                    <div class="stat">
                                        <span class="stat-number">1000+</span>
                                        <span class="stat-label">Students Taught</span>
                                    </div>
                                    <div class="stat">
                                        <span class="stat-number">5+</span>
                                        <span class="stat-label">Years Experience</span>
                                    </div>
                                </div>
                                <div class="owner-contact">
                                    <button class="btn btn-primary btn-hover">
                                        <i class="fas fa-envelope"></i> Contact Me
                                    </button>
                                    <button class="btn btn-outline btn-hover">
                                        <i class="fab fa-github"></i> GitHub
                                    </button>
                                    <button class="btn btn-outline btn-hover">
                                        <i class="fab fa-linkedin"></i> LinkedIn
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            <section class="mission-section">
                <div class="container">
                    <h2 class="section-title fade-in-up">Our Mission</h2>
                    <div class="mission-content">
                        <div class="mission-card card card-hover fade-in-up">
                            <div class="mission-icon">
                                <i class="fas fa-graduation-cap fa-3x"></i>
                            </div>
                            <h3>Education</h3>
                            <p>Make complex scientific concepts accessible to everyone through interactive learning experiences</p>
                        </div>
                        
                        <div class="mission-card card card-hover fade-in-up">
                            <div class="mission-icon">
                                <i class="fas fa-globe fa-3x"></i>
                            </div>
                            <h3>Exploration</h3>
                            <p>Inspire curiosity about the universe and our place in it through engaging content</p>
                        </div>
                        
                        <div class="mission-card card card-hover fade-in-up">
                            <div class="mission-icon">
                                <i class="fas fa-handshake fa-3x"></i>
                            </div>
                            <h3>Community</h3>
                            <p>Build a global community of learners and explorers who share knowledge and ideas</p>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    getDownloadContent() {
        return `
            <section class="page-header">
                <div class="container">
                    <h1 class="page-title fade-in-up">Download</h1>
                    <p class="page-subtitle fade-in-up">Get our resources and materials</p>
                </div>
            </section>
            <section class="download-section">
                <div class="container">
                    <div class="download-grid">
                        <div class="download-card card card-hover fade-in-up">
                            <div class="download-icon">
                                <i class="fas fa-file-pdf fa-3x"></i>
                            </div>
                            <h3>Documentation PDF</h3>
                            <p>Complete documentation in PDF format</p>
                            <div class="download-info">
                                <span class="file-size">15.2 MB</span>
                                <span class="file-version">v2.1</span>
                            </div>
                            <button class="btn btn-primary">
                                <i class="fas fa-download"></i> Download PDF
                            </button>
                        </div>
                        
                        <div class="download-card card card-hover fade-in-up">
                            <div class="download-icon">
                                <i class="fas fa-code fa-3x"></i>
                            </div>
                            <h3>Source Code</h3>
                            <p>Complete source code for developers</p>
                            <div class="download-info">
                                <span class="file-size">8.7 MB</span>
                                <span class="file-version">v1.8</span>
                            </div>
                            <button class="btn btn-primary">
                                <i class="fas fa-download"></i> Download Code
                            </button>
                        </div>
                        
                        <div class="download-card card card-hover fade-in-up">
                            <div class="download-icon">
                                <i class="fas fa-images fa-3x"></i>
                            </div>
                            <h3>Media Assets</h3>
                            <p>Images, videos, and other media files</p>
                            <div class="download-info">
                                <span class="file-size">45.3 MB</span>
                                <span class="file-version">v1.5</span>
                            </div>
                            <button class="btn btn-primary">
                                <i class="fas fa-download"></i> Download Assets
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    getDefaultContent(title) {
        return `
            <section class="page-header">
                <div class="container">
                    <h1 class="page-title">${title}</h1>
                    <p class="page-subtitle">Content coming soon...</p>
                </div>
            </section>
        `;
    }

    getInteractionBar() {
        return `
            <div class="interaction-bar">
                <button class="interaction-btn like-btn" onclick="journeyApp.handleLike(this)">
                    <i class="fas fa-heart"></i>
                    <span class="interaction-count">42</span>
                </button>
                <button class="interaction-btn comment-btn" onclick="journeyApp.handleComment(this)">
                    <i class="fas fa-comment"></i>
                    <span class="interaction-count">15</span>
                </button>
                <button class="interaction-btn view-btn">
                    <i class="fas fa-eye"></i>
                    <span class="interaction-count view-count">234</span>
                </button>
                <button class="interaction-btn share-btn">
                    <i class="fas fa-share"></i>
                    <span>Share</span>
                </button>
            </div>
        `;
    }

    renderContent(content) {
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = `<div class="page-transition">${content}</div>`;
        
        // Trigger animations
        setTimeout(() => {
            this.animatePageElements();
        }, 100);
    }

    animatePageElements() {
        // Animate elements as they come into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe cards and sections
        document.querySelectorAll('.card, .section-title, .feature-card, .idea-card, .journey-card, .mission-card').forEach(el => {
            observer.observe(el);
        });
    }

    updateNavigationState(page) {
        // Update active nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-page') === page) {
                link.classList.add('active');
            }
        });
    }

    initializePageFeatures(page) {
        // Initialize interactions for specific pages
        const interactionPages = ['research', 'projects', 'articles', 'journal', 'physics'];
        
        if (interactionPages.includes(page)) {
            this.initializeInteractions();
        }
    }

    initializeInteractions() {
        // Like functionality
        document.querySelectorAll('.like-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const count = this.querySelector('.interaction-count');
                const currentCount = parseInt(count.textContent) || 0;
                
                this.classList.toggle('active');
                if (this.classList.contains('active')) {
                    count.textContent = currentCount + 1;
                    this.style.color = '#e74c3c';
                } else {
                    count.textContent = Math.max(0, currentCount - 1);
                    this.style.color = '';
                }
            });
        });

        // Comment functionality
        document.querySelectorAll('.comment-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                NavigationManager.showCommentModal();
            });
        });

        // Share functionality
        document.querySelectorAll('.share-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                NavigationManager.showShareModal();
            });
        });
    }

    static showCommentModal() {
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
                        <textarea class="form-textarea" placeholder="Share your thoughts..." required></textarea>
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
            modal.innerHTML = `
                <div class="modal-content">
                    <div style="text-align: center; padding: 2rem;">
                        <i class="fas fa-check-circle" style="color: #4caf50; font-size: 3rem; margin-bottom: 1rem;"></i>
                        <h3>Comment Posted!</h3>
                        <p>Thank you for your contribution.</p>
                    </div>
                </div>
            `;
            setTimeout(() => modal.remove(), 2000);
        });
    }

    static showShareModal() {
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <h3>Share Content</h3>
                <div class="share-options">
                    <button class="btn btn-outline share-option">
                        <i class="fab fa-facebook"></i> Facebook
                    </button>
                    <button class="btn btn-outline share-option">
                        <i class="fab fa-twitter"></i> Twitter
                    </button>
                    <button class="btn btn-outline share-option">
                        <i class="fab fa-linkedin"></i> LinkedIn
                    </button>
                    <button class="btn btn-outline share-option">
                        <i class="fas fa-link"></i> Copy Link
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Close modal
        modal.querySelector('.modal-close').addEventListener('click', () => {
            modal.remove();
        });
    }

    showPageLoading() {
        const loadingEl = document.createElement('div');
        loadingEl.className = 'page-loading';
        loadingEl.innerHTML = '<div class="spinner"></div>';
        document.getElementById('main-content').appendChild(loadingEl);
    }

    hidePageLoading() {
        const loadingEl = document.querySelector('.page-loading');
        if (loadingEl) {
            loadingEl.remove();
        }
    }

    renderError(message) {
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

// Initialize navigation manager
const navManager = new NavigationManager();
