// 🗻 GEOLOGICAL EXPLORATION JAVASCRIPT - Premium Interactive Features

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all geological components
    initGeologyHero();
    initGeologicalSurvey();
    initInteractiveMap();
    initStratigraphicColumn();
    initMineralResources();
    initGeologicalHazards();
    initParticleEffects();
    initAnimations();
});

// 🗻 HERO SECTION - Animated Elements
function initGeologyHero() {
    const rockFormations = document.getElementById('rockFormations');
    const fossilAnimation = document.getElementById('fossilAnimation');
    
    // Create animated rock formations
    if (rockFormations) {
        for (let i = 0; i < 3; i++) {
            const rockLayer = document.createElement('div');
            rockLayer.className = 'rock-layer';
            rockLayer.style.setProperty('--rotation', `${Math.random() * 10 - 5}deg`);
            rockFormations.appendChild(rockLayer);
        }
    }
    
    // Create floating fossils
    if (fossilAnimation) {
        const fossils = ['🦕', '🦴', '🪨', '🦖', '⚡', '🔥'];
        for (let i = 0; i < 6; i++) {
            const fossil = document.createElement('div');
            fossil.className = 'fossil';
            fossil.textContent = fossils[i];
            fossil.style.left = Math.random() * 80 + 10 + '%';
            fossil.style.top = Math.random() * 80 + 10 + '%';
            fossil.style.animationDelay = Math.random() * 20 + 's';
            fossil.style.animationDuration = (15 + Math.random() * 10) + 's';
            fossilAnimation.appendChild(fossil);
        }
    }
    
    // Animate statistics counter
    animateCounters();
}

// 📊 COUNTER ANIMATION
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 3000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    };
    
    // Intersection Observer for counter animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

// 🗺️ INTERACTIVE GEOLOGICAL MAP
function initInteractiveMap() {
    const mapViewer = document.getElementById('mapViewer');
    const mapLayers = document.getElementById('mapLayers');
    const mapInfo = document.getElementById('mapInfo');
    
    if (!mapViewer || !mapLayers || !mapInfo) return;
    
    const layerData = {
        bedrock: {
            title: 'Bedrock Geology',
            description: 'Explore the underlying bedrock formations and geological structures.',
            features: ['Sedimentary basins', 'Igneous intrusions', 'Metamorphic complexes'],
            color: '#8B4513'
        },
        structure: {
            title: 'Structural Geology',
            description: 'Analyze fault systems, folds, and structural features.',
            features: ['Fault lines', 'Fold axes', 'Joint systems'],
            color: '#4A90E2'
        },
        mineral: {
            title: 'Mineral Resources',
            description: 'Discover mineral deposits and resource locations.',
            features: ['Metal ores', 'Industrial minerals', 'Gemstone deposits'],
            color: '#FFD700'
        },
        hazard: {
            title: 'Geological Hazards',
            description: 'Assess geological risks and hazard zones.',
            features: ['Earthquake zones', 'Landslide areas', 'Flood plains'],
            color: '#E74C3C'
        }
    };
    
    // Layer selection
    const layers = mapLayers.querySelectorAll('.layer');
    layers.forEach(layer => {
        layer.addEventListener('click', function() {
            // Remove active class from all layers
            layers.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked layer
            this.classList.add('active');
            
            const layerType = this.getAttribute('data-layer');
            const data = layerData[layerType];
            
            // Update map info
            mapInfo.innerHTML = `
                <h3>${data.title}</h3>
                <p>${data.description}</p>
                <div class="map-features">
                    <h4>Key Features:</h4>
                    <ul>
                        ${data.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>
            `;
            
            // Add visual feedback
            createMapEffect(data.color);
        });
    });
    
    // Default active layer
    if (layers.length > 0) {
        layers[0].click();
    }
}

// 🗺️ MAP VISUAL EFFECTS
function createMapEffect(color) {
    const mapViewer = document.getElementById('mapViewer');
    if (!mapViewer) return;
    
    // Remove existing effects
    const existingEffects = mapViewer.querySelectorAll('.map-effect');
    existingEffects.forEach(effect => effect.remove());
    
    // Create new effect
    const effect = document.createElement('div');
    effect.className = 'map-effect';
    effect.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        width: 200px;
        height: 200px;
        background: radial-gradient(circle, ${color}40, transparent);
        border-radius: 50%;
        transform: translate(-50%, -50%) scale(0);
        animation: mapPulse 2s ease-out;
        pointer-events: none;
        z-index: 5;
    `;
    
    mapViewer.appendChild(effect);
    
    // Remove after animation
    setTimeout(() => effect.remove(), 2000);
}

// 📊 STRATIGRAPHIC COLUMN
function initStratigraphicColumn() {
    const strataUnits = document.querySelectorAll('.strata-unit');
    const detailsPanel = document.getElementById('detailsPanel');
    
    if (!detailsPanel) return;
    
    const strataData = {
        quaternary: {
            title: 'Quaternary Period',
            age: '2.6 million years ago - Present',
            description: 'The youngest geological period, characterized by recent alluvial deposits, glacial features, and modern river systems.',
            characteristics: ['Alluvial deposits', 'Glacial sediments', 'Recent volcanic activity'],
            economic: 'Source of construction materials, groundwater aquifers'
        },
        neogene: {
            title: 'Neogene Period',
            age: '23 - 2.6 million years ago',
            description: 'Known for the Siwalik Group formations, representing ancient river systems and forest environments.',
            characteristics: ['Siwalik Group sandstones', 'Fossil-rich deposits', 'Ancient river channels'],
            economic: 'Coal deposits, clay minerals, fossil fuels'
        },
        paleogene: {
            title: 'Paleogene Period',
            age: '66 - 23 million years ago',
            description: 'Subathu Formation represents marine conditions with limestone and shale deposits.',
            characteristics: ['Marine limestone', 'Shale deposits', 'Fossil assemblages'],
            economic: 'Limestone for cement, potential oil shale'
        },
        mesozoic: {
            title: 'Mesozoic Era',
            age: '252 - 66 million years ago',
            description: 'Lesser Himalayan sequences with metamorphic and sedimentary rocks.',
            characteristics: ['Metamorphic rocks', 'Sedimentary sequences', 'Structural deformation'],
            economic: 'Building stones, potential mineral deposits'
        },
        paleozoic: {
            title: 'Paleozoic Era',
            age: '541 - 252 million years ago',
            description: 'Greater Himalayan basement rocks representing ancient continental crust.',
            characteristics: ['Gneiss and schist', 'Crystalline basement', 'High-grade metamorphism'],
            economic: 'Precious stones, metamorphic minerals'
        }
    };
    
    strataUnits.forEach(unit => {
        unit.addEventListener('click', function() {
            const period = this.getAttribute('data-period');
            const data = strataData[period];
            
            // Update details panel
            detailsPanel.innerHTML = `
                <h3>${data.title}</h3>
                <div class="strata-age">${data.age}</div>
                <p>${data.description}</p>
                <div class="strata-characteristics">
                    <h4>Key Characteristics:</h4>
                    <ul>
                        ${data.characteristics.map(char => `<li>${char}</li>`).join('')}
                    </ul>
                </div>
                <div class="strata-economic">
                    <h4>Economic Importance:</h4>
                    <p>${data.economic}</p>
                </div>
            `;
            
            // Add active state
            strataUnits.forEach(u => u.classList.remove('active'));
            this.classList.add('active');
            
            // Smooth scroll to details
            detailsPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
    });
}

// 💎 MINERAL RESOURCES INTERACTION
function initMineralResources() {
    const resourceCards = document.querySelectorAll('.resource-card');
    
    resourceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add sparkle effect
            createSparkles(this);
        });
        
        card.addEventListener('click', function() {
            const type = this.classList.contains('metallic') ? 'metallic' :
                        this.classList.contains('non-metallic') ? 'non-metallic' : 'industrial';
            
            showResourceDetails(type);
        });
    });
}

// ✨ SPARKLE EFFECT
function createSparkles(element) {
    for (let i = 0; i < 5; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: #FFD700;
            border-radius: 50%;
            pointer-events: none;
            animation: sparkleFloat 2s ease-out forwards;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
        `;
        
        element.appendChild(sparkle);
        
        // Remove after animation
        setTimeout(() => sparkle.remove(), 2000);
    }
}

// 📋 RESOURCE DETAILS MODAL
function showResourceDetails(type) {
    const modal = document.createElement('div');
    modal.className = 'resource-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>${type.charAt(0).toUpperCase() + type.slice(1)} Minerals</h2>
            <div class="resource-details">
                <p>Detailed information about ${type} mineral resources...</p>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal
    modal.querySelector('.close').addEventListener('click', () => {
        modal.remove();
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
}

// ⚠️ GEOLOGICAL HAZARDS
function initGeologicalHazards() {
    const hazardCards = document.querySelectorAll('.hazard-card');
    
    hazardCards.forEach(card => {
        card.addEventListener('click', function() {
            const hazardType = this.querySelector('h3').textContent.toLowerCase().replace(' ', '-');
            showHazardDetails(hazardType);
        });
    });
}

// 📋 HAZARD DETAILS
function showHazardDetails(type) {
    const hazardData = {
        'earthquake-hazard': {
            description: 'Seismic activity assessment based on historical data and geological structures.',
            mitigation: ['Seismic-resistant design', 'Emergency preparedness', 'Regular monitoring']
        },
        'landslide-risk': {
            description: 'Slope stability analysis considering geological conditions and rainfall patterns.',
            mitigation: ['Slope stabilization', 'Drainage systems', 'Early warning systems']
        },
        'flood-potential': {
            description: 'Flood risk assessment based on geological and hydrological factors.',
            mitigation: ['Flood control structures', 'Land use planning', 'Emergency response']
        }
    };
    
    const data = hazardData[type];
    if (!data) return;
    
    // Create hazard details panel
    const details = document.createElement('div');
    details.className = 'hazard-details-panel';
    details.innerHTML = `
        <h3>Hazard Details</h3>
        <p>${data.description}</p>
        <h4>Mitigation Measures:</h4>
        <ul>
            ${data.mitigation.map(m => `<li>${m}</li>`).join('')}
        </ul>
    `;
    
    // Insert after hazard card
    const card = document.querySelector(`.hazard-card:has(h3:text("${type.replace('-', ' ')}"))`);
    if (card) {
        card.parentNode.insertBefore(details, card.nextSibling);
        
        // Remove after 10 seconds
        setTimeout(() => details.remove(), 10000);
    }
}

// 🎆 PARTICLE EFFECTS
function initParticleEffects() {
    const sections = document.querySelectorAll('.geology-hero, .geological-survey, .mineral-resources');
    
    sections.forEach(section => {
        createParticles(section);
    });
}

function createParticles(container) {
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'geology-particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        
        container.appendChild(particle);
    }
}

// 📊 GEOLOGICAL SURVEY DASHBOARD
function initGeologicalSurvey() {
    // Animate progress bars
    const progressBars = document.querySelectorAll('.progress-fill');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.style.width;
                bar.style.width = '0%';
                
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
                
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });
    
    progressBars.forEach(bar => observer.observe(bar));
    
    // Animate sampling stats
    animateSamplingStats();
}

// 📈 SAMPLING STATS ANIMATION
function animateSamplingStats() {
    const samplingCard = document.querySelector('.survey-card.sampling');
    if (!samplingCard) return;
    
    const numbers = samplingCard.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                numbers.forEach(num => {
                    const finalValue = parseInt(num.textContent);
                    animateValue(num, 0, finalValue, 2000);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(samplingCard);
}

function animateValue(element, start, end, duration) {
    const range = end - start;
    const startTime = performance.now();
    
    const updateValue = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = Math.floor(start + range * easeOutQuart(progress));
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(updateValue);
        }
    };
    
    requestAnimationFrame(updateValue);
}

function easeOutQuart(t) {
    return 1 - Math.pow(1 - t, 4);
}

// ✨ ANIMATION OBSERVER
function initAnimations() {
    const animatedElements = document.querySelectorAll('.animate-fade-in, .animate-fade-in-delay, .animate-fade-in-delay-2, .animate-fade-in-delay-3');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add entrance effect
                if (entry.target.classList.contains('animate-fade-in-delay')) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, 200);
                } else if (entry.target.classList.contains('animate-fade-in-delay-2')) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, 400);
                } else if (entry.target.classList.contains('animate-fade-in-delay-3')) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, 600);
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// 🎯 UTILITY FUNCTIONS
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// 🌟 CSS ANIMATIONS (injected via JavaScript)
function injectAnimations() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes mapPulse {
            0% { transform: translate(-50%, -50%) scale(0); opacity: 0.8; }
            100% { transform: translate(-50%, -50%) scale(3); opacity: 0; }
        }
        
        @keyframes sparkleFloat {
            0% { transform: translateY(0) scale(1); opacity: 1; }
            100% { transform: translateY(-50px) scale(0); opacity: 0; }
        }
        
        .map-effect { animation: mapPulse 2s ease-out; }
        .sparkle { animation: sparkleFloat 2s ease-out forwards; }
        
        .resource-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
        }
        
        .modal-content {
            background: white;
            padding: 2rem;
            border-radius: 15px;
            max-width: 500px;
            position: relative;
        }
        
        .close {
            position: absolute;
            top: 10px;
            right: 15px;
            font-size: 2rem;
            cursor: pointer;
            color: #666;
        }
        
        .close:hover { color: #000; }
        
        .hazard-details-panel {
            margin-top: 1rem;
            padding: 1.5rem;
            background: rgba(255,255,255,0.1);
            border-radius: 10px;
            animation: slideDown 0.5s ease-out;
        }
        
        @keyframes slideDown {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    
    document.head.appendChild(style);
}

// Initialize animations on load
injectAnimations();

// 🌍 GLOBAL FUNCTIONS
window.geologyUtils = {
    refreshMap: () => initInteractiveMap(),
    updateStratigraphy: () => initStratigraphicColumn(),
    showResourceModal: showResourceDetails,
    showHazardPanel: showHazardDetails
};

// 🎯 PERFORMANCE OPTIMIZATION
if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
        // Initialize non-critical features when browser is idle
        initParticleEffects();
    });
} else {
    setTimeout(initParticleEffects, 1000);
}

// 📱 MOBILE OPTIMIZATIONS
if (window.innerWidth <= 768) {
    // Reduce particle count on mobile
    const reduceParticles = () => {
        const particles = document.querySelectorAll('.geology-particle, .fossil');
        particles.forEach((particle, index) => {
            if (index % 2 === 0) particle.remove();
        });
    };
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', reduceParticles);
    } else {
        reduceParticles();
    }
}

console.log('🗻 Geological Exploration JavaScript loaded successfully!');