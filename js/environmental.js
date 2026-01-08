// Environmental Monitoring JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeEnvironmentalAnimations();
    initializeAirQualityMonitoring();
    initializeNoiseMonitoring();
    initializePollutionTracking();
    initializeHabitatQuality();
    initializeConservationTimeline();
});

// Environmental Animations
function initializeEnvironmentalAnimations() {
    // Particle system for eco particles
    const particleContainer = document.getElementById('ecoParticles');
    if (particleContainer) {
        createEcoParticles(particleContainer);
    }

    // Leaf animation
    const leafContainer = document.getElementById('leafAnimation');
    if (leafContainer) {
        createLeafAnimation(leafContainer);
    }
}

function createEcoParticles(container) {
    const particleCount = 40;
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'eco-particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 8 + 4}px;
            height: ${Math.random() * 8 + 4}px;
            background: radial-gradient(circle, #27ae60, #2ecc71);
            border-radius: 50%;
            opacity: ${Math.random() * 0.6 + 0.2};
            pointer-events: none;
        `;

        particle.x = Math.random() * container.offsetWidth;
        particle.y = Math.random() * container.offsetHeight;
        particle.vx = (Math.random() - 0.5) * 0.5;
        particle.vy = (Math.random() - 0.5) * 0.5;
        particle.life = Math.random() * 200 + 100;

        container.appendChild(particle);
        particles.push(particle);
    }

    animateEcoParticles(particles);
}

function createLeafAnimation(container) {
    const leafCount = 15;
    const leaves = [];

    for (let i = 0; i < leafCount; i++) {
        const leaf = document.createElement('div');
        leaf.className = 'floating-leaf';
        leaf.innerHTML = '🍃';
        leaf.style.cssText = `
            position: absolute;
            font-size: ${Math.random() * 20 + 15}px;
            opacity: ${Math.random() * 0.7 + 0.3};
            pointer-events: none;
        `;

        leaf.x = Math.random() * container.offsetWidth;
        leaf.y = -50;
        leaf.vx = (Math.random() - 0.5) * 2;
        leaf.vy = Math.random() * 2 + 1;
        leaf.rotation = Math.random() * 360;
        leaf.rotationSpeed = (Math.random() - 0.5) * 4;

        container.appendChild(leaf);
        leaves.push(leaf);
    }

    animateLeaves(leaves);
}

function animateEcoParticles(particles) {
    function animate() {
        particles.forEach((particle, index) => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.life--;

            // Bounce off edges
            if (particle.x <= 0 || particle.x >= window.innerWidth) {
                particle.vx *= -1;
            }
            if (particle.y <= 0 || particle.y >= window.innerHeight) {
                particle.vy *= -1;
            }

            // Fade out and regenerate
            if (particle.life <= 0) {
                particle.opacity = 0;
                setTimeout(() => {
                    particle.life = Math.random() * 200 + 100;
                    particle.opacity = Math.random() * 0.6 + 0.2;
                    particle.x = Math.random() * window.innerWidth;
                    particle.y = Math.random() * window.innerHeight;
                }, 1000);
            }

            particle.style.left = particle.x + 'px';
            particle.style.top = particle.y + 'px';
            particle.style.opacity = Math.min(particle.life / 100, particle.opacity);
        });

        requestAnimationFrame(animate);
    }
    animate();
}

function animateLeaves(leaves) {
    function animate() {
        leaves.forEach(leaf => {
            leaf.x += leaf.vx;
            leaf.y += leaf.vy;
            leaf.rotation += leaf.rotationSpeed;

            // Reset leaf when it goes off screen
            if (leaf.y > window.innerHeight + 50) {
                leaf.y = -50;
                leaf.x = Math.random() * window.innerWidth;
            }

            // Slight horizontal drift
            leaf.vx += (Math.random() - 0.5) * 0.1;
            leaf.vx = Math.max(-3, Math.min(3, leaf.vx));

            leaf.style.left = leaf.x + 'px';
            leaf.style.top = leaf.y + 'px';
            leaf.style.transform = `rotate(${leaf.rotation}deg)`;
        });

        requestAnimationFrame(animate);
    }
    animate();
}

// Air Quality Monitoring
function initializeAirQualityMonitoring() {
    // Simulate real-time air quality updates
    const aqiValue = document.querySelector('.aqi-value');
    const aqiStatus = document.querySelector('.aqi-status');
    
    if (aqiValue && aqiStatus) {
        updateAirQuality();
        setInterval(updateAirQuality, 30000); // Update every 30 seconds
    }
}

function updateAirQuality() {
    const aqiValue = document.querySelector('.aqi-value');
    const aqiStatus = document.querySelector('.aqi-status');
    
    // Simulate AQI changes
    const currentAQI = parseInt(aqiValue.textContent);
    const change = Math.floor(Math.random() * 10) - 5;
    const newAQI = Math.max(0, Math.min(500, currentAQI + change));
    
    aqiValue.textContent = newAQI;
    
    // Update status based on AQI
    aqiStatus.classList.remove('good', 'moderate', 'poor');
    if (newAQI <= 50) {
        aqiStatus.classList.add('good');
        aqiStatus.textContent = 'Good';
    } else if (newAQI <= 100) {
        aqiStatus.classList.add('moderate');
        aqiStatus.textContent = 'Moderate';
    } else {
        aqiStatus.classList.add('poor');
        aqiStatus.textContent = 'Poor';
    }
    
    // Animate the change
    aqiValue.style.animation = 'pulse 0.5s ease';
    setTimeout(() => {
        aqiValue.style.animation = '';
    }, 500);
}

// Noise Monitoring
function initializeNoiseMonitoring() {
    const noiseChart = document.getElementById('noiseChart');
    if (noiseChart) {
        createNoiseChart(noiseChart);
    }
}

function createNoiseChart(canvas) {
    const ctx = canvas.getContext('2d');
    const data = generateNoiseData();
    
    // Create gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, 100);
    gradient.addColorStop(0, '#f39c12');
    gradient.addColorStop(1, 'rgba(243, 156, 18, 0.1)');
    
    // Draw chart
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw area
    ctx.beginPath();
    ctx.moveTo(0, 100);
    data.forEach((point, index) => {
        const x = (index / (data.length - 1)) * canvas.width;
        const y = 100 - (point / 100) * 80;
        ctx.lineTo(x, y);
    });
    ctx.lineTo(canvas.width, 100);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();
    
    // Draw line
    ctx.beginPath();
    data.forEach((point, index) => {
        const x = (index / (data.length - 1)) * canvas.width;
        const y = 100 - (point / 100) * 80;
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    ctx.strokeStyle = '#f39c12';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Update chart periodically
    setInterval(() => {
        updateNoiseChart(canvas);
    }, 5000);
}

function generateNoiseData() {
    const data = [];
    for (let i = 0; i < 20; i++) {
        data.push(Math.random() * 30 + 40); // 40-70 dB range
    }
    return data;
}

function updateNoiseChart(canvas) {
    const ctx = canvas.getContext('2d');
    const data = generateNoiseData();
    
    // Animate the update
    animateChartUpdate(canvas, data);
}

function animateChartUpdate(canvas, data) {
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 100);
    gradient.addColorStop(0, '#f39c12');
    gradient.addColorStop(1, 'rgba(243, 156, 18, 0.1)');
    
    let frame = 0;
    const totalFrames = 30;
    
    function animate() {
        frame++;
        const progress = frame / totalFrames;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw with animation
        ctx.beginPath();
        ctx.moveTo(0, 100);
        data.forEach((point, index) => {
            const x = (index / (data.length - 1)) * canvas.width;
            const y = 100 - (point / 100) * 80 * progress;
            ctx.lineTo(x, y);
        });
        ctx.lineTo(canvas.width, 100);
        ctx.closePath();
        ctx.fillStyle = gradient;
        ctx.fill();
        
        ctx.beginPath();
        data.forEach((point, index) => {
            const x = (index / (data.length - 1)) * canvas.width;
            const y = 100 - (point / 100) * 80 * progress;
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        ctx.strokeStyle = '#f39c12';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        if (frame < totalFrames) {
            requestAnimationFrame(animate);
        }
    }
    animate();
}

// Pollution Tracking
function initializePollutionTracking() {
    // Add interactive hover effects
    const pollutionCards = document.querySelectorAll('.pollution-card');
    
    pollutionCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Simulate pollution data updates
    updatePollutionData();
    setInterval(updatePollutionData, 60000); // Update every minute
}

function updatePollutionData() {
    const emissionItems = document.querySelectorAll('.emission-item span:last-child');
    
    emissionItems.forEach(item => {
        const currentValue = parseFloat(item.textContent);
        const change = (Math.random() - 0.5) * 2;
        const newValue = Math.max(0, currentValue + change);
        
        // Animate the change
        item.style.transition = 'all 0.3s ease';
        item.style.color = '#e74c3c';
        item.textContent = newValue.toFixed(1);
        
        setTimeout(() => {
            item.style.color = '';
        }, 300);
    });
}

// Habitat Quality
function initializeHabitatQuality() {
    // Add interactive indicators
    const habitatCards = document.querySelectorAll('.habitat-card');
    
    habitatCards.forEach(card => {
        card.addEventListener('click', function() {
            // Highlight the card
            this.style.transform = 'scale(1.02)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
            
            // Show detailed habitat information
            showHabitatDetails(this);
        });
    });
    
    // Animate indicator bars
    animateIndicatorBars();
}

function animateIndicatorBars() {
    const indicatorFills = document.querySelectorAll('.indicator-fill');
    
    indicatorFills.forEach(fill => {
        const targetWidth = fill.style.width;
        fill.style.width = '0%';
        
        setTimeout(() => {
            fill.style.transition = 'width 1s ease';
            fill.style.width = targetWidth;
        }, 500);
    });
}

function showHabitatDetails(card) {
    const habitatType = card.querySelector('h3').textContent;
    const score = card.querySelector('.habitat-score').textContent;
    
    // Create and show modal with detailed information
    const modal = createHabitatModal(habitatType, score);
    document.body.appendChild(modal);
    
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
}

function createHabitatModal(type, score) {
    const modal = document.createElement('div');
    modal.className = 'habitat-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close">&times;</button>
            <h2>${type} Habitat Details</h2>
            <div class="habitat-score-large">${score}</div>
            <div class="habitat-details">
                <h3>Key Features</h3>
                <ul>
                    <li>Optimal vegetation coverage</li>
                    <li>Diverse food sources available</li>
                    <li>Good nesting and breeding conditions</li>
                    <li>Minimal human disturbance</li>
                </ul>
                <h3>Conservation Actions</h3>
                <ul>
                    <li>Habitat restoration projects</li>
                    <li>Invasive species control</li>
                    <li>Wildlife corridor maintenance</li>
                    <li>Monitoring programs</li>
                </ul>
            </div>
        </div>
    `;
    
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    const content = modal.querySelector('.modal-content');
    content.style.cssText = `
        background: var(--bg-card);
        border-radius: 20px;
        padding: 2rem;
        max-width: 500px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        transform: scale(0.9);
        transition: transform 0.3s ease;
    `;
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => {
        modal.style.opacity = '0';
        setTimeout(() => modal.remove(), 300);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.opacity = '0';
            setTimeout(() => modal.remove(), 300);
        }
    });
    
    return modal;
}

// Conservation Timeline
function initializeConservationTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    // Animate timeline items on scroll
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
                
                // Animate progress bars
                const progressFill = entry.target.querySelector('.progress-fill');
                if (progressFill) {
                    const targetWidth = progressFill.style.width;
                    progressFill.style.width = '0%';
                    setTimeout(() => {
                        progressFill.style.transition = 'width 1.5s ease';
                        progressFill.style.width = targetWidth;
                    }, 500);
                }
                
                timelineObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    });
    
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = item.classList.contains('animate-fade-in') ? 'translateY(30px)' : '';
        item.style.transition = 'all 0.6s ease';
        timelineObserver.observe(item);
    });
}

// Real-time data simulation
function simulateRealTimeData() {
    // Simulate real-time environmental data updates
    setInterval(() => {
        // Update random environmental parameters
        updateRandomParameters();
    }, 10000);
}

function updateRandomParameters() {
    // Update temperature
    const tempElements = document.querySelectorAll('.climate-value');
    tempElements.forEach(element => {
        if (element.textContent.includes('°C')) {
            const currentTemp = parseFloat(element.textContent);
            const newTemp = currentTemp + (Math.random() - 0.5) * 2;
            element.textContent = newTemp.toFixed(1) + '°C';
        }
    });
    
    // Update AQI
    updateAirQuality();
    
    // Update noise levels
    const noiseValue = document.querySelector('.noise-value');
    if (noiseValue) {
        const currentNoise = parseFloat(noiseValue.textContent);
        const newNoise = currentNoise + (Math.random() - 0.5) * 3;
        noiseValue.textContent = Math.max(30, Math.min(80, newNoise)).toFixed(1);
    }
}

// Initialize real-time data
simulateRealTimeData();

// Add CSS animations
const environmentalStyles = document.createElement('style');
environmentalStyles.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    .habitat-modal.active {
        opacity: 1;
    }
    
    .habitat-modal.active .modal-content {
        transform: scale(1);
    }
    
    .habitat-score-large {
        font-size: 4rem;
        font-weight: 700;
        text-align: center;
        margin: 1rem 0;
        color: var(--accent-color);
    }
    
    .habitat-details h3 {
        color: var(--text-primary);
        margin: 1.5rem 0 0.5rem 0;
    }
    
    .habitat-details ul {
        list-style: none;
        padding: 0;
    }
    
    .habitat-details li {
        padding: 0.5rem 0;
        padding-left: 1.5rem;
        position: relative;
        color: var(--text-secondary);
    }
    
    .habitat-details li::before {
        content: "▶";
        position: absolute;
        left: 0;
        color: var(--accent-color);
    }
    
    .modal-close {
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: var(--text-secondary);
    }
    
    .modal-close:hover {
        color: var(--text-primary);
    }
`;
document.head.appendChild(environmentalStyles);