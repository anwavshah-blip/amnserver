// Geotechnical Analysis JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeGeotechnicalSystem();
    initializeInvestigationDashboard();
    initializeSoilProfile();
    initializeParameters();
    initializeFoundationDesign();
    initializeDrillingAnimation();
    initializeStatCounters();
});

// Initialize Geotechnical System
function initializeGeotechnicalSystem() {
    // Start real-time monitoring
    startRealTimeMonitoring();
    
    console.log('Geotechnical Analysis System initialized');
}

// Investigation Dashboard
function initializeInvestigationDashboard() {
    // Initialize boring chart
    const boringCanvas = document.getElementById('boringChart');
    if (boringCanvas) {
        createBoringChart(boringCanvas);
    }
    
    // Add click effects to investigation cards
    const investigationCards = document.querySelectorAll('.investigation-card');
    investigationCards.forEach(card => {
        card.addEventListener('click', function() {
            const cardType = this.classList[1]; // Get card type
            showInvestigationDetails(cardType);
        });
        
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Animate progress bars
    animateProgressBars();
}

function createBoringChart(canvas) {
    const ctx = canvas.getContext('2d');
    
    // Boring data
    const boringData = [
        { name: 'BH-01', depth: 15.2, color: '#3498db' },
        { name: 'BH-02', depth: 18.5, color: '#e74c3c' },
        { name: 'BH-03', depth: 12.8, color: '#f39c12' }
    ];
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw bars
    const barWidth = 40;
    const barSpacing = 50;
    const maxDepth = 20;
    const chartHeight = 120;
    
    boringData.forEach((boring, index) => {
        const x = 30 + index * barSpacing;
        const barHeight = (boring.depth / maxDepth) * chartHeight;
        const y = canvas.height - 20 - barHeight;
        
        // Draw bar
        ctx.fillStyle = boring.color;
        ctx.fillRect(x, y, barWidth, barHeight);
        
        // Add gradient effect
        const gradient = ctx.createLinearGradient(x, y, x, y + barHeight);
        gradient.addColorStop(0, boring.color);
        gradient.addColorStop(1, boring.color + '80');
        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, barWidth, barHeight);
        
        // Draw label
        ctx.fillStyle = '#333';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(boring.name, x + barWidth/2, canvas.height - 5);
        
        // Draw depth value
        ctx.fillText(boring.depth + 'm', x + barWidth/2, y - 5);
    });
    
    // Update chart periodically
    setInterval(() => {
        updateBoringChart(canvas);
    }, 8000);
}

function updateBoringChart(canvas) {
    const ctx = canvas.getContext('2d');
    
    // Simulate data changes
    const boringData = [
        { name: 'BH-01', depth: 15.2 + (Math.random() - 0.5) * 2, color: '#3498db' },
        { name: 'BH-02', depth: 18.5 + (Math.random() - 0.5) * 2, color: '#e74c3c' },
        { name: 'BH-03', depth: 12.8 + (Math.random() - 0.5) * 2, color: '#f39c12' }
    ];
    
    // Animate update
    animateBoringUpdate(ctx, canvas, boringData);
}

function animateBoringUpdate(ctx, canvas, data) {
    let frame = 0;
    const totalFrames = 20;
    
    function animate() {
        frame++;
        const progress = frame / totalFrames;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw animated bars
        const barWidth = 40;
        const barSpacing = 50;
        const maxDepth = 20;
        const chartHeight = 120;
        
        data.forEach((boring, index) => {
            const x = 30 + index * barSpacing;
            const currentHeight = (boring.depth / maxDepth) * chartHeight * progress;
            const y = canvas.height - 20 - currentHeight;
            
            // Draw bar
            const gradient = ctx.createLinearGradient(x, y, x, y + currentHeight);
            gradient.addColorStop(0, boring.color);
            gradient.addColorStop(1, boring.color + '80');
            
            ctx.fillStyle = gradient;
            ctx.fillRect(x, y, barWidth, currentHeight);
            
            // Draw label
            ctx.fillStyle = '#333';
            ctx.font = '12px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(boring.name, x + barWidth/2, canvas.height - 5);
            
            if (progress === 1) {
                ctx.fillText(boring.depth.toFixed(1) + 'm', x + barWidth/2, y - 5);
            }
        });
        
        if (frame < totalFrames) {
            requestAnimationFrame(animate);
        }
    }
    animate();
}

function animateProgressBars() {
    const progressBars = document.querySelectorAll('.test-progress .progress-fill');
    
    progressBars.forEach((bar, index) => {
        const targetWidth = bar.style.width;
        bar.style.width = '0%';
        
        setTimeout(() => {
            bar.style.transition = 'width 1.5s ease';
            bar.style.width = targetWidth;
        }, index * 200 + 500);
    });
}

function showInvestigationDetails(cardType) {
    const details = {
        boring: 'Boring operations provide essential subsurface data through systematic drilling and sampling at various depths.',
        sampling: 'Soil samples are collected at regular intervals for laboratory testing to determine engineering properties.',
        'lab-testing': 'Comprehensive laboratory tests including triaxial, consolidation, and direct shear tests are performed.',
        analysis: 'Data analysis determines bearing capacity, settlement characteristics, and foundation recommendations.'
    };
    
    showNotification(details[cardType] || 'Detailed investigation information', 'info');
}

// Interactive Soil Profile
function initializeSoilProfile() {
    const soilLayers = document.querySelectorAll('.soil-layer');
    
    soilLayers.forEach(layer => {
        layer.addEventListener('click', function() {
            const layerType = this.classList[1]; // clay, sand, gravel, rock
            const depth = this.dataset.depth;
            showLayerDetails(layerType, depth);
            
            // Highlight selected layer
            soilLayers.forEach(l => l.classList.remove('selected'));
            this.classList.add('selected');
        });
        
        // Add hover effects
        layer.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        layer.addEventListener('mouseleave', function() {
            if (!this.classList.contains('selected')) {
                this.style.transform = '';
            }
        });
    });
    
    // Select first layer by default
    if (soilLayers.length > 0) {
        soilLayers[0].click();
    }
}

function showLayerDetails(layerType, depth) {
    const layerData = {
        clay: {
            title: 'Clayey Soil',
            description: 'Fine-grained cohesive soil with high plasticity and low permeability.',
            properties: {
                'Cohesion': '25-35 kPa',
                'Friction Angle': '18-22°',
                'Compressibility': 'High',
                'Permeability': 'Low (10⁻⁷ to 10⁻⁹ m/s)',
                'Bearing Capacity': '100-150 kPa'
            },
            suitability: 'Requires careful foundation design due to high compressibility and potential for settlement.'
        },
        sand: {
            title: 'Sandy Soil',
            description: 'Cohesionless soil with good drainage properties and moderate bearing capacity.',
            properties: {
                'Cohesion': '0 kPa',
                'Friction Angle': '28-32°',
                'Compressibility': 'Low to Medium',
                'Permeability': 'Medium to High',
                'Bearing Capacity': '150-250 kPa'
            },
            suitability: 'Good foundation material with adequate bearing capacity and drainage.'
        },
        gravel: {
            title: 'Gravelly Soil',
            description: 'Coarse-grained soil with excellent drainage and high bearing capacity.',
            properties: {
                'Cohesion': '0 kPa',
                'Friction Angle': '35-40°',
                'Compressibility': 'Very Low',
                'Permeability': 'High',
                'Bearing Capacity': '250-400 kPa'
            },
            suitability: 'Excellent foundation material providing high bearing capacity and good drainage.'
        },
        rock: {
            title: 'Weathered Rock',
            description: 'Competent rock mass suitable for high bearing capacity foundations.',
            properties: {
                'Unconfined Strength': '>50 MPa',
                'Rock Quality': 'Good to Very Good',
                'Weathering': 'Moderately Weathered',
                'Discontinuities': 'Few, tight joints',
                'Bearing Capacity': '>1000 kPa'
            },
            suitability: 'Excellent bearing material suitable for all foundation types.'
        }
    };
    
    const data = layerData[layerType];
    const detailPanel = document.getElementById('detailPanel');
    
    if (detailPanel) {
        detailPanel.innerHTML = `
            <h3>${data.title}</h3>
            <p><strong>Depth:</strong> ${depth}</p>
            <p>${data.description}</p>
            <h4>Engineering Properties:</h4>
            <div class="properties-list">
                ${Object.entries(data.properties).map(([key, value]) => 
                    `<div class="property-item">
                        <span>${key}:</span>
                        <span>${value}</span>
                    </div>`
                ).join('')}
            </div>
            <h4>Foundation Suitability:</h4>
            <p>${data.suitability}</p>
        `;
    }
}

// Geotechnical Parameters
function initializeParameters() {
    const paramCards = document.querySelectorAll('.param-card');
    
    paramCards.forEach(card => {
        card.addEventListener('click', function() {
            const paramType = this.classList[1]; // strength, deformation, permeability
            showParameterDetails(paramType);
        });
        
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Animate parameter values
    animateParameterValues();
}

function showParameterDetails(paramType) {
    const details = {
        strength: 'Shear strength parameters determine soil stability and bearing capacity under load.',
        deformation: 'Deformation parameters predict settlement and consolidation behavior over time.',
        permeability: 'Permeability affects groundwater flow and drainage characteristics of the soil.'
    };
    
    showNotification(details[paramType] || 'Parameter information', 'info');
}

function animateParameterValues() {
    const paramItems = document.querySelectorAll('.param-item span:last-child');
    
    paramItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(10px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.5s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 100 + 500);
    });
}

// Foundation Design
function initializeFoundationDesign() {
    const foundationOptions = document.querySelectorAll('.foundation-option');
    
    foundationOptions.forEach(option => {
        option.addEventListener('click', function() {
            const foundationType = this.classList.contains('shallow') ? 'shallow' : 'deep';
            highlightFoundationOption(foundationType);
        });
        
        // Add hover effects
        option.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        option.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Animate cost comparison
    animateCostComparison();
}

function highlightFoundationOption(type) {
    const options = document.querySelectorAll('.foundation-option');
    
    options.forEach(option => {
        option.style.opacity = '0.7';
        option.style.transform = 'scale(0.95)';
    });
    
    const selectedOption = document.querySelector(`.foundation-option.${type}`);
    if (selectedOption) {
        selectedOption.style.opacity = '1';
        selectedOption.style.transform = 'scale(1.05)';
        selectedOption.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.2)';
    }
    
    setTimeout(() => {
        options.forEach(option => {
            option.style.opacity = '';
            option.style.transform = '';
            option.style.boxShadow = '';
        });
    }, 2000);
}

function animateCostComparison() {
    const costElements = document.querySelectorAll('.foundation-cost');
    
    costElements.forEach(cost => {
        const finalValue = cost.textContent;
        const numericValue = parseInt(finalValue.replace(/[$,]/g, ''));
        
        // Animate from 0 to final value
        animateValue(cost, 0, numericValue, 2000, '$');
    });
}

function animateValue(element, start, end, duration, prefix = '') {
    const range = end - start;
    const increment = end > start ? 1 : -1;
    const stepTime = Math.abs(Math.floor(duration / range));
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        element.textContent = prefix + current.toLocaleString();
        
        if (current === end) {
            clearInterval(timer);
        }
    }, stepTime);
}

// Drilling Animation
function initializeDrillingAnimation() {
    const drillingContainer = document.getElementById('drillingAnimation');
    if (!drillingContainer) return;
    
    // Create drilling rig
    createDrillingRig(drillingContainer);
    
    // Create soil particles
    createSoilParticles(drillingContainer);
}

function createDrillingRig(container) {
    const rig = document.createElement('div');
    rig.className = 'drilling-rig';
    rig.innerHTML = `
        <div class="rig-structure">
            <div class="rig-mast"></div>
            <div class="rig-platform"></div>
        </div>
        <div class="drill-string">
            <div class="drill-rod"></div>
            <div class="drill-bit"></div>
        </div>
    `;
    
    container.appendChild(rig);
}

function createSoilParticles(container) {
    const particleCount = 15;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'soil-particle';
        
        // Random position and timing
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 2 + 's';
        particle.style.animationDuration = (Math.random() * 1 + 1.5) + 's';
        
        container.appendChild(particle);
    }
}

// Stat Counters
function initializeStatCounters() {
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const count = parseInt(target.dataset.count);
                animateCounter(target, 0, count, 2000);
                counterObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => counterObserver.observe(stat));
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

// Real-time Monitoring
function startRealTimeMonitoring() {
    // Simulate real-time geotechnical data updates
    setInterval(() => {
        simulateGeotechnicalUpdates();
    }, 10000);
}

function simulateGeotechnicalUpdates() {
    // Random geotechnical events
    const events = [
        { type: 'info', message: 'Soil moisture monitoring: optimal levels maintained' },
        { type: 'success', message: 'Settlement monitoring: within acceptable limits' },
        { type: 'warning', message: 'Groundwater level slightly elevated in monitoring well MW-03' },
        { type: 'info', message: 'New borehole data collected: BH-04 completed to 16.5m depth' }
    ];
    
    const randomEvent = events[Math.floor(Math.random() * events.length)];
    showNotification(randomEvent.message, randomEvent.type);
}

// Utility Functions
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#48bb78' : type === 'warning' ? '#f6ad55' : '#8b4513'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// Add CSS for detailed panel
const geotechnicalStyles = document.createElement('style');
geotechnicalStyles.textContent = `
    .properties-list {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        margin: 1rem 0;
    }
    
    .property-item {
        display: flex;
        justify-content: space-between;
        padding: 0.5rem;
        background: rgba(0, 0, 0, 0.05);
        border-radius: 5px;
    }
    
    .soil-layer.selected {
        transform: translateY(-5px) scale(1.02);
        box-shadow: 0 15px 30px var(--shadow-dark);
        border: 2px solid var(--accent-color);
    }
    
    .drilling-rig {
        position: absolute;
        top: 30%;
        left: 10%;
        width: 120px;
        height: 200px;
    }
    
    .rig-structure {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 60px;
        height: 120px;
        background: linear-gradient(180deg, #666, #333);
        border-radius: 5px;
    }
    
    .rig-mast {
        position: absolute;
        top: -20px;
        left: 50%;
        transform: translateX(-50%);
        width: 8px;
        height: 40px;
        background: #888;
        border-radius: 4px;
    }
    
    .rig-platform {
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 80px;
        height: 15px;
        background: #555;
        border-radius: 8px;
    }
    
    .drill-string {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    
    .drill-rod {
        width: 8px;
        height: 100px;
        background: linear-gradient(180deg, #888, #555);
        border-radius: 4px;
        animation: drill-vibrate 0.3s ease-in-out infinite;
    }
    
    .drill-bit {
        width: 16px;
        height: 20px;
        background: linear-gradient(180deg, #666, #333);
        border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
        margin-top: 5px;
        animation: drill-rotate 1s linear infinite;
    }
`;
document.head.appendChild(geotechnicalStyles);

// Export functions for use in other scripts
window.GeotechnicalSystem = {
    showNotification,
    showLayerDetails,
    animateCounter,
    createBoringChart
};