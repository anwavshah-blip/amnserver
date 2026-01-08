// Advanced Gallery JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeGallery();
    initializeFilters();
    initializeLightbox();
    initializeParticleSystem();
    initializeAnimations();
});

// Gallery Data
const galleryData = [
    {
        id: 1,
        category: 'habitat',
        title: 'Forest Habitat',
        description: 'Spiny Babbler in its natural forest environment',
        location: 'Shivapuri Nagarjun National Park',
        date: '2024-01-15',
        image: 'assets/images/gallery/habitat1.jpg'
    },
    {
        id: 2,
        category: 'behavior',
        title: 'Morning Call',
        description: 'Male Spiny Babbler performing morning territorial call',
        location: 'Phulchoki Hill',
        date: '2024-01-20',
        image: 'assets/images/gallery/behavior1.jpg'
    },
    {
        id: 3,
        category: 'nesting',
        title: 'Nest Building',
        description: 'Female constructing nest with twigs and grass',
        location: 'Godawari Forest',
        date: '2024-02-01',
        image: 'assets/images/gallery/nesting1.jpg'
    },
    {
        id: 4,
        category: 'feeding',
        title: 'Insect Hunting',
        description: 'Foraging for insects in undergrowth',
        location: 'Nagarjun Forest',
        date: '2024-02-10',
        image: 'assets/images/gallery/feeding1.jpg'
    },
    {
        id: 5,
        category: 'portraits',
        title: 'Close-up Portrait',
        description: 'Detailed portrait showing distinctive features',
        location: 'Shivapuri Forest',
        date: '2024-02-15',
        image: 'assets/images/gallery/portrait1.jpg'
    },
    {
        id: 6,
        category: 'habitat',
        title: 'Bamboo Thicket',
        description: 'Preferred bamboo habitat during breeding season',
        location: 'Kakani Hill',
        date: '2024-03-01',
        image: 'assets/images/gallery/habitat2.jpg'
    }
];

// Initialize Gallery
function initializeGallery() {
    const galleryGrid = document.getElementById('galleryGrid');
    if (!galleryGrid) return;

    // Load initial items
    loadGalleryItems(galleryData);
}

function loadGalleryItems(items) {
    const galleryGrid = document.getElementById('galleryGrid');
    
    items.forEach((item, index) => {
        const galleryItem = createGalleryItem(item);
        galleryGrid.appendChild(galleryItem);
        
        // Add staggered animation delay
        setTimeout(() => {
            galleryItem.classList.add('animate-fade-in');
        }, index * 100);
    });
}

function createGalleryItem(item) {
    const div = document.createElement('div');
    div.className = `gallery-item ${item.category}`;
    div.setAttribute('data-id', item.id);
    div.setAttribute('data-category', item.category);
    
    div.innerHTML = `
        <img src="${item.image}" alt="${item.title}" loading="lazy">
        <div class="gallery-overlay">
            <h3>${item.title}</h3>
            <p>${item.description}</p>
        </div>
    `;
    
    return div;
}

// Initialize Filters
function initializeFilters() {
    const filterTabs = document.querySelectorAll('.filter-tab');
    
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active tab
            filterTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Filter gallery
            filterGallery(filter);
        });
    });
}

function filterGallery(category) {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach((item, index) => {
        const itemCategory = item.getAttribute('data-category');
        
        if (category === 'all' || itemCategory === category) {
            item.style.display = 'block';
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 50);
        } else {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            setTimeout(() => {
                item.style.display = 'none';
            }, 300);
        }
    });
}

// Initialize Lightbox
function initializeLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxDescription = document.getElementById('lightboxDescription');
    const lightboxLocation = document.getElementById('lightboxLocation');
    const lightboxDate = document.getElementById('lightboxDate');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    const lightboxLoading = document.querySelector('.lightbox-loading');
    
    let currentIndex = 0;
    let currentItems = [];
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const itemId = parseInt(this.getAttribute('data-id'));
            const itemData = galleryData.find(d => d.id === itemId);
            
            if (itemData) {
                currentIndex = galleryData.indexOf(itemData);
                currentItems = galleryData;
                openLightbox(itemData);
            }
        });
    });
    
    function openLightbox(item) {
        lightboxModal.classList.add('active');
        lightboxLoading.classList.add('active');
        
        // Simulate image loading
        setTimeout(() => {
            lightboxImage.src = item.image;
            lightboxTitle.textContent = item.title;
            lightboxDescription.textContent = item.description;
            lightboxLocation.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${item.location}`;
            lightboxDate.innerHTML = `<i class="fas fa-calendar"></i> ${new Date(item.date).toLocaleDateString()}`;
            
            lightboxLoading.classList.remove('active');
        }, 500);
        
        // Add body scroll lock
        document.body.style.overflow = 'hidden';
    }
    
    function closeLightbox() {
        lightboxModal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    function navigateLightbox(direction) {
        currentIndex += direction;
        
        if (currentIndex < 0) {
            currentIndex = currentItems.length - 1;
        } else if (currentIndex >= currentItems.length) {
            currentIndex = 0;
        }
        
        openLightbox(currentItems[currentIndex]);
    }
    
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', () => navigateLightbox(-1));
    lightboxNext.addEventListener('click', () => navigateLightbox(1));
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (lightboxModal.classList.contains('active')) {
            switch(e.key) {
                case 'Escape':
                    closeLightbox();
                    break;
                case 'ArrowLeft':
                    navigateLightbox(-1);
                    break;
                case 'ArrowRight':
                    navigateLightbox(1);
                    break;
            }
        }
    });
    
    // Click outside to close
    lightboxModal.addEventListener('click', function(e) {
        if (e.target === lightboxModal) {
            closeLightbox();
        }
    });
}

// Particle System
function initializeParticleSystem() {
    const container = document.getElementById('galleryParticles');
    if (!container) return;
    
    const particleCount = 30;
    const particles = [];
    
    for (let i = 0; i < particleCount; i++) {
        createGalleryParticle(container, particles);
    }
    
    animateGalleryParticles(particles);
}

function createGalleryParticle(container, particles) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 8 + 4}px;
        height: ${Math.random() * 8 + 4}px;
        background: linear-gradient(45deg, #ff6b6b, #ee5a24);
        border-radius: 50%;
        opacity: ${Math.random() * 0.6 + 0.2};
        pointer-events: none;
    `;
    
    particle.x = Math.random() * container.offsetWidth;
    particle.y = Math.random() * container.offsetHeight;
    particle.vx = (Math.random() - 0.5) * 1;
    particle.vy = (Math.random() - 0.5) * 1;
    particle.rotation = 0;
    particle.rotationSpeed = (Math.random() - 0.5) * 2;
    
    particle.style.left = particle.x + 'px';
    particle.style.top = particle.y + 'px';
    
    container.appendChild(particle);
    particles.push(particle);
}

function animateGalleryParticles(particles) {
    function animate() {
        particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.rotation += particle.rotationSpeed;
            
            // Bounce off edges
            if (particle.x <= 0 || particle.x >= window.innerWidth) {
                particle.vx *= -1;
            }
            if (particle.y <= 0 || particle.y >= window.innerHeight) {
                particle.vy *= -1;
            }
            
            particle.style.left = particle.x + 'px';
            particle.style.top = particle.y + 'px';
            particle.style.transform = `rotate(${particle.rotation}deg)`;
        });
        
        requestAnimationFrame(animate);
    }
    animate();
}

// Counter Animations
function initializeAnimations() {
    const counters = document.querySelectorAll('.stat-number');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                
                animateCounter(counter, 0, target, 2000);
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => counterObserver.observe(counter));
}

function animateCounter(element, start, end, duration) {
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

// Load More Functionality
function initializeLoadMore() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (!loadMoreBtn) return;
    
    let currentPage = 1;
    const itemsPerPage = 6;
    
    loadMoreBtn.addEventListener('click', function() {
        this.classList.add('loading');
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
        
        // Simulate loading more items
        setTimeout(() => {
            const moreItems = generateMoreItems(currentPage + 1, itemsPerPage);
            loadGalleryItems(moreItems);
            
            this.classList.remove('loading');
            this.innerHTML = '<i class="fas fa-spinner"></i> Load More Photos';
            
            currentPage++;
        }, 1500);
    });
}

function generateMoreItems(page, perPage) {
    const moreItems = [];
    const startId = page * perPage + 1;
    
    for (let i = 0; i < perPage; i++) {
        const categories = ['habitat', 'behavior', 'nesting', 'feeding', 'portraits'];
        const randomCategory = categories[Math.floor(Math.random() * categories.length)];
        
        moreItems.push({
            id: startId + i,
            category: randomCategory,
            title: `Photo ${startId + i}`,
            description: `Additional ${randomCategory} photograph`,
            location: 'Various Locations',
            date: '2024-01-15',
            image: `assets/images/gallery/${randomCategory}${(startId + i) % 3 + 1}.jpg`
        });
    }
    
    return moreItems;
}

// Initialize load more
initializeLoadMore();

// Add CSS animations
const galleryStyles = document.createElement('style');
galleryStyles.textContent = `
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(galleryStyles);