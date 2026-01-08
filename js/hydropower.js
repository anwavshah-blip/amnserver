// Advanced Hydropower Systems JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeHydropowerAnimations();
    initializeTurbineSystem();
    initializeEnergyFlow();
    initializeHydropowerDashboard();
    initializeProcessFlow();
    initializeEnvironmentalImpact();
    initializeRealTimeMonitoring();
});

// Hydropower Animations
function initializeHydropowerAnimations() {
    // Initialize water animation
    initializeWaterAnimation();
    
    // Initialize turbine animation
    initializeTurbineAnimation();
    
    // Initialize energy flow
    initializeEnergyFlowAnimation();
    
    // Initialize counter animations
    initializeHydropowerCounters();
}

function initializeWaterAnimation() {
    const waterAnimation = document.getElementById('waterAnimation');
    if (!waterAnimation) return;
    
    // Create dynamic water flow effect
    createWaterFlow(waterAnimation);
}

function createWaterFlow(container) {
    const waveCount = 5;
    const waves = [];
    
    for (let i = 0; i < waveCount; i++) {
        const wave = document.createElement('div');
        wave.className = 'water-wave';
        wave.style.cssText = `
            position: absolute;
            width: 100%;
            height: 100px;
            background: linear-gradient(45deg, rgba(52, 152, 219, 0.3), rgba(52, 152, 219, 0.1));
            border-radius: 50%;
            animation: water-flow-${i} 4s ease-in-out infinite;
            animation-delay: ${i * 0.5}s;
        `;
        
        container.appendChild(wave);
        waves.push(wave);
    }
    
    // Add custom animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes water-flow-0 {
            0%, 100% { transform: translateY(0) scale(1); }
            50% { transform: translateY(-20px) scale(1.1); }
        }
        @keyframes water-flow-1 {
            0%, 100% { transform: translateY(-10px) scale(1.05); }
            50% { transform: translateY(10px) scale(0.95); }
        }
        @keyframes water-flow-2 {
            0%, 100% { transform: translateY(5px) scale(0.95); }
            50% { transform: translateY(-15px) scale(1.05); }
        }
        @keyframes water-flow-3 {
            0%, 100% { transform: translateY(-5px) scale(1.02); }
            50% { transform: translateY(15px) scale(0.98); }
        }
        @keyframes water-flow-4 {
            0%, 100% { transform: translateY(10px) scale(0.98); }
            50% { transform: translateY(-10px) scale(1.02); }
        }
    `;
    document.head.appendChild(style);
}

function initializeTurbineAnimation() {
    const turbineAnimation = document.getElementById('turbineAnimation');
    if (!turbineAnimation) return;
    
    // Create turbine blades
    createTurbineBlades(turbineAnimation);
    
    // Add turbine rotation animation
    animateTurbineRotation();
}

function createTurbineBlades(container) {
    const bladeCount = 3;
    const blades = [];
    
    for (let i = 0; i < bladeCount; i++) {
        const blade = document.createElement('div');
        blade.className = 'turbine-blade';
        blade.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            width: 60px;
            height: 4px;
            background: linear-gradient(90deg, #ffffff, #e0e0e0);
            transform-origin: 0 50%;
            border-radius: 2px;
            transform: translateY(-50%) rotate(${i * 120}deg);
        `;
        
        container.appendChild(blade);
        blades.push(blade);
    }
}

function animateTurbineRotation() {
    const turbine = document.getElementById('turbineAnimation');
    if (!turbine) return;
    
    let rotationSpeed = 2; // seconds per rotation
    let isRunning = true;
    
    function rotate() {
        if (isRunning) {
            turbine.style.animation = `turbine-spin ${rotationSpeed}s linear infinite`;
        } else {
            turbine.style.animation = 'none';
        }
    }
    
    rotate();
    
    // Simulate turbine speed changes based on water flow
    setInterval(() => {
        const flowRate = Math.random() * 100; // Simulate flow rate 0-100%
        rotationSpeed = Math.max(0.5, 3 - (flowRate / 100) * 2.5);
        
        if (flowRate > 10) {
            isRunning = true;
            rotate();
        } else {
            isRunning = false;
            rotate();
        }
    }, 5000);
}

function initializeEnergyFlowAnimation() {
    const energyFlow = document.getElementById('energyFlow');
    if (!energyFlow) return;
    
    // Create energy particles
    createEnergyParticles(energyFlow);
}

function createEnergyParticles(container) {
    const particleCount = 3;
    const particles = [];
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'energy-particle';
        particle.style.cssText = `
            position: absolute;
            width: 10px;
            height: 10px;
            background: #f39c12;
            border-radius: 50%;
            animation: energy-travel 3s ease-in-out infinite;
            animation-delay: ${i * 1}s;
        `;
        
        container.appendChild(particle);
        particles.push(particle);
    }
}

function initializeHydropowerCounters() {
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

// Hydropower Dashboard
function initializeHydropowerDashboard() {
    initializeCapacityMonitoring();
    initializeRenewablePercentage();
    initializeHomesPowered();
}

function initializeCapacityMonitoring() {
    // Simulate real-time capacity updates
    const capacityElement = document.querySelector('.stat-number[data-count="150"]');
    if (capacityElement) {
        updateCapacityData();
        setInterval(updateCapacityData, 10000);
    }
}

function updateCapacityData() {
    const capacityElement = document.querySelector('.stat-number[data-count="150"]');
    if (!capacityElement) return;
    
    // Simulate capacity changes based on demand
    const baseCapacity = 150;
    const variation = Math.floor(Math.random() * 20 - 10);
    const newCapacity = Math.max(100, baseCapacity + variation);
    
    // Animate the change
    animateCounter(capacityElement, parseInt(capacityElement.textContent), newCapacity, 1000);
}

function initializeRenewablePercentage() {
    // Update renewable percentage with animation
    const renewableElement = document.querySelector('.stat-number[data-count="85"]');
    if (renewableElement) {
        // Add pulsing effect to indicate renewable energy
        setInterval(() => {
            renewableElement.style.animation = 'pulse 1s ease';
            setTimeout(() => {
                renewableElement.style.animation = '';
            }, 1000);
        }, 5000);
    }
}

function initializeHomesPowered() {
    // Simulate homes powered updates
    const homesElement = document.querySelector('.stat-number[data-count="50000"]');
    if (homesElement) {
        updateHomesPowered();
        setInterval(updateHomesPowered, 15000);
    }
}

function updateHomesPowered() {
    const homesElement = document.querySelector('.stat-number[data-count="50000"]');
    if (!homesElement) return;
    
    // Simulate changes based on population and demand
    const baseHomes = 50000;
    const variation = Math.floor(Math.random() * 2000 - 1000);
    const newHomes = Math.max(40000, baseHomes + variation);
    
    animateCounter(homesElement, parseInt(homesElement.textContent), newHomes, 1500);
}

// Process Flow
function initializeProcessFlow() {
    const processSteps = document.querySelectorAll('.process-step');
    const processArrows = document.querySelectorAll('.process-arrow');
    
    // Animate process flow
    animateProcessFlow(processSteps, processArrows);
}

function animateProcessFlow(steps, arrows) {
    // Staggered animation for process steps
    steps.forEach((step, index) => {
        step.style.opacity = '0';
        step.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            step.style.transition = 'all 0.6s ease';
            step.style.opacity = '1';
            step.style.transform = 'translateY(0)';
        }, index * 200);
    });
    
    // Animate arrows
    arrows.forEach((arrow, index) => {
        arrow.style.opacity = '0';
        
        setTimeout(() => {
            arrow.style.transition = 'opacity 0.5s ease';
            arrow.style.opacity = '1';
            arrow.style.animation = 'arrow-flow 2s ease-in-out infinite';
        }, (index + 1) * 200 + 300);
    });
}

// Environmental Impact
function initializeEnvironmentalImpact() {
    const impactCards = document.querySelectorAll('.impact-card');
    
    // Add interactive hover effects
    impactCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            
            // Animate list items
            const listItems = this.querySelectorAll('li');
            listItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.animation = 'slide-in-left 0.5s ease';
                    setTimeout(() => {
                        item.style.animation = '';
                    }, 500);
                }, index * 100);
            });
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Initialize impact metrics
    updateImpactMetrics();
    setInterval(updateImpactMetrics, 20000);
}

function updateImpactMetrics() {
    // Simulate changes in environmental impact metrics
    const trendIndicators = document.querySelectorAll('.trend-indicator');
    
    trendIndicators.forEach(indicator => {
        const random = Math.random();
        indicator.classList.remove('up', 'down', 'stable');
        
        if (random < 0.4) {
            indicator.classList.add('down');
            indicator.innerHTML = '<i class="fas fa-arrow-down"></i><span>Decreasing</span>';
        } else if (random < 0.7) {
            indicator.classList.add('stable');
            indicator.innerHTML = '<i class="fas fa-minus"></i><span>Stable</span>';
        } else {
            indicator.classList.add('up');
            indicator.innerHTML = '<i class="fas fa-arrow-up"></i><span>Increasing</span>';
        }
    });
}

// Real-time Monitoring
function initializeRealTimeMonitoring() {
    // Simulate real-time power generation data
    simulatePowerGeneration();
    
    // Simulate environmental monitoring
    simulateEnvironmentalMonitoring();
    
    // Initialize data refresh intervals
    setInterval(simulatePowerGeneration, 5000);
    setInterval(simulateEnvironmentalMonitoring, 10000);
}

function simulatePowerGeneration() {
    // Update power generation metrics
    const powerMetrics = document.querySelectorAll('.stat-number');
    
    powerMetrics.forEach(metric => {
        if (metric.textContent.includes('MW') || metric.textContent.includes('kW')) {
            const currentValue = parseInt(metric.textContent);
            const variation = Math.floor(Math.random() * 10 - 5);
            const newValue = Math.max(0, currentValue + variation);
            
            if (newValue !== currentValue) {
                animateCounter(metric, currentValue, newValue, 1000);
            }
        }
    });
}

function simulateEnvironmentalMonitoring() {
    // Update environmental parameters
    const processSteps = document.querySelectorAll('.process-step');
    
    processSteps.forEach(step => {
        // Simulate minor changes in process efficiency
        const efficiency = Math.random() * 20 + 80; // 80-100%
        step.style.setProperty('--efficiency', efficiency + '%');
    });
}

// Interactive Features
function addInteractiveFeatures() {
    // Add click interactions to stats
    const statItems = document.querySelectorAll('.stat-item');
    
    statItems.forEach(item => {
        item.addEventListener('click', function() {
            // Show detailed information
            showDetailedStats(this);
        });
    });
    
    // Add hover effects to process steps
    const processSteps = document.querySelectorAll('.process-step');
    
    processSteps.forEach(step => {
        step.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
            this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.2)';
        });
        
        step.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
}

function showDetailedStats(statItem) {
    const statNumber = statItem.querySelector('.stat-number').textContent;
    const statLabel = statItem.querySelector('.stat-label').textContent;
    
    // Create detailed information modal
    const modal = createDetailedStatsModal(statNumber, statLabel);
    document.body.appendChild(modal);
    
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
}

function createDetailedStatsModal(number, label) {
    const modal = document.createElement('div');
    modal.className = 'stats-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close">&times;</button>
            <h2>${label} Details</h2>
            <div class="stats-details">
                <div class="detail-chart">
                    <canvas id="detailChart" width="400" height="200"></canvas>
                </div>
                <div class="detail-info">
                    <h3>Current Status</h3>
                    <p>Real-time monitoring shows optimal performance within specified parameters.</p>
                    <h3>Historical Data</h3>
                    <p>30-day average: ${number}</p>
                    <p>Peak performance: ${parseInt(number) * 1.1}</p>
                    <p>Efficiency trend: Improving</p>
                </div>
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
        max-width: 600px;
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
    
    // Initialize detail chart
    setTimeout(() => {
        createDetailChart();
    }, 100);
    
    return modal;
}

function createDetailChart() {
    const canvas = document.getElementById('detailChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const data = generateDetailData();
    
    // Create gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, 200);
    gradient.addColorStop(0, '#3498db');
    gradient.addColorStop(1, 'rgba(52, 152, 219, 0.1)');
    
    drawDetailChart(ctx, data, gradient);
}

function generateDetailData() {
    const data = [];
    for (let i = 0; i < 30; i++) {
        data.push(Math.sin(i * 0.2) * 20 + 80 + Math.random() * 10);
    }
    return data;
}

function drawDetailChart(ctx, data, gradient) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
    // Draw area
    ctx.beginPath();
    ctx.moveTo(0, 200);
    data.forEach((point, index) => {
        const x = (index / (data.length - 1)) * ctx.canvas.width;
        const y = 200 - (point / 100) * 180;
        ctx.lineTo(x, y);
    });
    ctx.lineTo(ctx.canvas.width, 200);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();
    
    // Draw line
    ctx.beginPath();
    data.forEach((point, index) => {
        const x = (index / (data.length - 1)) * ctx.canvas.width;
        const y = 200 - (point / 100) * 180;
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    ctx.strokeStyle = '#3498db';
    ctx.lineWidth = 2;
    ctx.stroke();
}

// Utility Functions
function animateChartUpdate(ctx, data, gradient) {
    let frame = 0;
    const totalFrames = 30;
    
    function animate() {
        frame++;
        const progress = frame / totalFrames;
        
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        
        // Draw with animation
        ctx.beginPath();
        ctx.moveTo(0, ctx.canvas.height);
        data.forEach((point, index) => {
            const x = (index / (data.length - 1)) * ctx.canvas.width;
            const y = ctx.canvas.height - (point / 50) * ctx.canvas.height * progress;
            ctx.lineTo(x, y);
        });
        ctx.lineTo(ctx.canvas.width, ctx.canvas.height);
        ctx.closePath();
        ctx.fillStyle = gradient;
        ctx.fill();
        
        ctx.beginPath();
        data.forEach((point, index) => {
            const x = (index / (data.length - 1)) * ctx.canvas.width;
            const y = ctx.canvas.height - (point / 50) * ctx.canvas.height * progress;
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        ctx.strokeStyle = gradient.addColorStop(0, '#3498db') ? '#3498db' : '#e74c3c';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        if (frame < totalFrames) {
            requestAnimationFrame(animate);
        }
    }
    animate();
}

// Add CSS animations
const hydropowerStyles = document.createElement('style');
hydropowerStyles.textContent = `
    @keyframes energy-travel {
        0%, 100% { transform: translateY(0px) scale(1); opacity: 1; }
        50% { transform: translateY(-30px) scale(1.5); opacity: 0.7; }
    }
    
    @keyframes turbine-spin {
        from { transform: translateY(-50%) rotate(0deg); }
        to { transform: translateY(-50%) rotate(360deg); }
    }
    
    @keyframes arrow-flow {
        0%, 100% { opacity: 0.7; }
        50% { opacity: 1; box-shadow: 0 0 10px rgba(243, 156, 18, 0.5); }
    }
    
    .water-wave {
        animation: water-flow 4s ease-in-out infinite;
    }
    
    .energy-particle {
        animation: energy-travel 3s ease-in-out infinite;
    }
    
    .turbine-animation {
        animation: turbine-spin 2s linear infinite;
    }
    
    .process-arrow {
        animation: arrow-flow 2s ease-in-out infinite;
    }
    
    .stat-item {
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .stat-item:hover {
        transform: translateY(-5px) scale(1.05);
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    }
    
    .process-step {
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .impact-card {
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .impact-card:hover {
        transform: translateY(-5px) scale(1.02);
        box-shadow: 0 15px 30px var(--shadow-dark);
    }
    
    .impact-card ul {
        list-style: none;
        padding: 0;
    }
    
    .impact-card li {
        padding: 0.5rem 0;
        padding-left: 1.5rem;
        position: relative;
        color: var(--text-secondary);
        transition: all 0.3s ease;
    }
    
    .impact-card li::before {
        content: "▶";
        position: absolute;
        left: 0;
        color: var(--accent-color);
        transition: all 0.3s ease;
    }
    
    .impact-card:hover li {
        padding-left: 2rem;
    }
    
    .impact-card:hover li::before {
        transform: translateX(5px);
    }
    
    .trend-indicator {
        transition: all 0.3s ease;
    }
    
    .trend-indicator:hover {
        transform: scale(1.05);
    }
    
    .positive .impact-icon {
        background: linear-gradient(45deg, #27ae60, #2ecc71);
    }
    
    .challenge .impact-icon {
        background: linear-gradient(45deg, #e74c3c, #c0392b);
    }
    
    .solution .impact-icon {
        background: linear-gradient(45deg, #3498db, #2980b9);
    }
`;
document.head.appendChild(hydropowerStyles);

// Initialize interactive features
addInteractiveFeatures();

// Real-time monitoring
initializeRealTimeMonitoring();

// Add interactive features
function addInteractiveFeatures() {
    // Add click interactions to stats
    const statItems = document.querySelectorAll('.stat-item');
    
    statItems.forEach(item => {
        item.addEventListener('click', function() {
            showDetailedStats(this);
        });
    });
    
    // Add hover effects to process steps
    const processSteps = document.querySelectorAll('.process-step');
    
    processSteps.forEach(step => {
        step.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
            this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.2)';
        });
        
        step.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
    
    // Add interactive energy flow
    const energyParticles = document.querySelectorAll('.energy-particle');
    
    energyParticles.forEach(particle => {
        particle.addEventListener('click', function() {
            this.style.animation = 'energy-burst 0.5s ease';
            setTimeout(() => {
                this.style.animation = 'energy-travel 3s ease-in-out infinite';
            }, 500);
        });
    });
}

function showDetailedStats(statItem) {
    const statNumber = statItem.querySelector('.stat-number').textContent;
    const statLabel = statItem.querySelector('.stat-label').textContent;
    
    // Create detailed information modal
    const modal = createDetailedStatsModal(statNumber, statLabel);
    document.body.appendChild(modal);
    
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
}

function createDetailedStatsModal(number, label) {
    const modal = document.createElement('div');
    modal.className = 'stats-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close">&times;</button>
            <h2>${label} Details</h2>
            <div class="stats-details">
                <div class="detail-chart">
                    <canvas id="detailChart" width="400" height="200"></canvas>
                </div>
                <div class="detail-info">
                    <h3>Current Status</h3>
                    <p>Real-time monitoring shows optimal performance within specified parameters.</p>
                    <h3>Historical Data</h3>
                    <p>30-day average: ${number}</p>
                    <p>Peak performance: ${parseInt(number) * 1.1}</p>
                    <p>Efficiency trend: Improving</p>
                </div>
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
        max-width: 600px;
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
    
    // Initialize detail chart
    setTimeout(() => {
        createDetailChart();
    }, 100);
    
    return modal;
}

function createDetailChart() {
    const canvas = document.getElementById('detailChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const data = generateDetailData();
    
    // Create gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, 200);
    gradient.addColorStop(0, '#3498db');
    gradient.addColorStop(1, 'rgba(52, 152, 219, 0.1)');
    
    drawDetailChart(ctx, data, gradient);
}

function generateDetailData() {
    const data = [];
    for (let i = 0; i < 30; i++) {
        data.push(Math.sin(i * 0.2) * 20 + 80 + Math.random() * 10);
    }
    return data;
}

function drawDetailChart(ctx, data, gradient) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
    // Draw area
    ctx.beginPath();
    ctx.moveTo(0, 200);
    data.forEach((point, index) => {
        const x = (index / (data.length - 1)) * ctx.canvas.width;
        const y = 200 - (point / 100) * 180;
        ctx.lineTo(x, y);
    });
    ctx.lineTo(ctx.canvas.width, 200);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();
    
    // Draw line
    ctx.beginPath();
    data.forEach((point, index) => {
        const x = (index / (data.length - 1)) * ctx.canvas.width;
        const y = 200 - (point / 100) * 180;
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    ctx.strokeStyle = '#3498db';
    ctx.lineWidth = 2;
    ctx.stroke();
}

// Add CSS animations
const hydropowerStyles = document.createElement('style');
hydropowerStyles.textContent = `
    @keyframes energy-travel {
        0%, 100% { transform: translateY(0px) scale(1); opacity: 1; }
        50% { transform: translateY(-30px) scale(1.5); opacity: 0.7; }
    }
    
    @keyframes turbine-spin {
        from { transform: translateY(-50%) rotate(0deg); }
        to { transform: translateY(-50%) rotate(360deg); }
    }
    
    @keyframes arrow-flow {
        0%, 100% { opacity: 0.7; }
        50% { opacity: 1; box-shadow: 0 0 10px rgba(243, 156, 18, 0.5); }
    }
    
    .water-wave {
        animation: water-flow 4s ease-in-out infinite;
    }
    
    .energy-particle {
        animation: energy-travel 3s ease-in-out infinite;
    }
    
    .turbine-animation {
        animation: turbine-spin 2s linear infinite;
    }
    
    .process-arrow {
        animation: arrow-flow 2s ease-in-out infinite;
    }
    
    .stat-item {
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .stat-item:hover {
        transform: translateY(-5px) scale(1.05);
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    }
    
    .process-step {
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .impact-card {
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .impact-card:hover {
        transform: translateY(-5px) scale(1.02);
        box-shadow: 0 15px 30px var(--shadow-dark);
    }
    
    .impact-card ul {
        list-style: none;
        padding: 0;
    }
    
    .impact-card li {
        padding: 0.5rem 0;
        padding-left: 1.5rem;
        position: relative;
        color: var(--text-secondary);
        transition: all 0.3s ease;
    }
    
    .impact-card li::before {
        content: "▶";
        position: absolute;
        left: 0;
        color: var(--accent-color);
        transition: all 0.3s ease;
    }
    
    .impact-card:hover li {
        padding-left: 2rem;
    }
    
    .impact-card:hover li::before {
        transform: translateX(5px);
    }
    
    .trend-indicator {
        transition: all 0.3s ease;
    }
    
    .trend-indicator:hover {
        transform: scale(1.05);
    }
    
    .positive .impact-icon {
        background: linear-gradient(45deg, #27ae60, #2ecc71);
    }
    
    .challenge .impact-icon {
        background: linear-gradient(45deg, #e74c3c, #c0392b);
    }
    
    .solution .impact-icon {
        background: linear-gradient(45deg, #3498db, #2980b9);
    }
`;
document.head.appendChild(hydropowerStyles);

// Initialize interactive features
addInteractiveFeatures();

// Real-time monitoring
initializeRealTimeMonitoring();