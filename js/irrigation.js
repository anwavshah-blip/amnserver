// Smart Irrigation Systems JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeIrrigationSystem();
    initializeDashboardCharts();
    initializeZoneControls();
    initializeConservationCharts();
    initializeSprinklerAnimation();
    initializeCropGrowthAnimation();
});

// Initialize Irrigation System
function initializeIrrigationSystem() {
    // Control mode switching
    const controlButtons = document.querySelectorAll('.control-btn');
    controlButtons.forEach(button => {
        button.addEventListener('click', function() {
            const mode = this.dataset.mode;
            switchIrrigationMode(mode);
        });
    });

    // Initialize real-time data updates
    startRealTimeUpdates();
}

// Switch Irrigation Mode
function switchIrrigationMode(mode) {
    // Update active button
    document.querySelectorAll('.control-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-mode="${mode}"]`).classList.add('active');

    // Update system behavior based on mode
    switch(mode) {
        case 'auto':
            enableAutoMode();
            break;
        case 'manual':
            enableManualMode();
            break;
        case 'schedule':
            enableScheduleMode();
            break;
    }

    // Show notification
    showNotification(`Switched to ${mode.charAt(0).toUpperCase() + mode.slice(1)} Mode`, 'info');
}

// Mode-specific functions
function enableAutoMode() {
    console.log('Auto mode enabled - System will automatically adjust irrigation based on sensors');
    // Add auto mode logic here
}

function enableManualMode() {
    console.log('Manual mode enabled - User controls irrigation zones manually');
    // Add manual mode logic here
}

function enableScheduleMode() {
    console.log('Schedule mode enabled - Irrigation follows predefined schedules');
    // Add schedule mode logic here
}

// Dashboard Charts
function initializeDashboardCharts() {
    // Moisture Chart
    const moistureCanvas = document.getElementById('moistureChart');
    if (moistureCanvas) {
        createMoistureChart(moistureCanvas);
    }

    // Efficiency Gauge
    const efficiencyCanvas = document.getElementById('efficiencyGauge');
    if (efficiencyCanvas) {
        createEfficiencyGauge(efficiencyCanvas);
    }
}

function createMoistureChart(canvas) {
    const ctx = canvas.getContext('2d');
    const data = generateMoistureData();
    
    // Create gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, 100);
    gradient.addColorStop(0, '#1abc9c');
    gradient.addColorStop(1, 'rgba(26, 188, 156, 0.1)');

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
    ctx.strokeStyle = '#1abc9c';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Update chart periodically
    setInterval(() => {
        updateMoistureChart(canvas);
    }, 5000);
}

function createEfficiencyGauge(canvas) {
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 60;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background arc
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, Math.PI * 0.7, Math.PI * 2.3);
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 12;
    ctx.stroke();

    // Draw progress arc
    const efficiency = 92; // Current efficiency
    const endAngle = Math.PI * 0.7 + (efficiency / 100) * Math.PI * 1.6;
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, Math.PI * 0.7, endAngle);
    
    // Create gradient
    const gradient = ctx.createLinearGradient(centerX - radius, centerY, centerX + radius, centerY);
    gradient.addColorStop(0, '#1abc9c');
    gradient.addColorStop(1, '#16a085');
    
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 12;
    ctx.stroke();

    // Update efficiency periodically
    setInterval(() => {
        updateEfficiencyGauge(canvas);
    }, 10000);
}

function generateMoistureData() {
    const data = [];
    for (let i = 0; i < 20; i++) {
        data.push(Math.random() * 30 + 60); // 60-90% range
    }
    return data;
}

function updateMoistureChart(canvas) {
    const ctx = canvas.getContext('2d');
    const data = generateMoistureData();
    
    // Animate the update
    animateChartUpdate(canvas, data, '#1abc9c');
}

function updateEfficiencyGauge(canvas) {
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 60;
    
    // Generate new efficiency value
    const currentEfficiency = 92;
    const change = Math.floor(Math.random() * 6) - 3;
    const newEfficiency = Math.max(80, Math.min(100, currentEfficiency + change));
    
    // Update display
    const gaugeValue = document.querySelector('.gauge-value');
    if (gaugeValue) {
        gaugeValue.textContent = newEfficiency + '%';
    }
    
    // Redraw gauge with new value
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Background arc
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, Math.PI * 0.7, Math.PI * 2.3);
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 12;
    ctx.stroke();
    
    // Progress arc
    const endAngle = Math.PI * 0.7 + (newEfficiency / 100) * Math.PI * 1.6;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, Math.PI * 0.7, endAngle);
    
    const gradient = ctx.createLinearGradient(centerX - radius, centerY, centerX + radius, centerY);
    gradient.addColorStop(0, '#1abc9c');
    gradient.addColorStop(1, '#16a085');
    
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 12;
    ctx.stroke();
}

function animateChartUpdate(canvas, data, color) {
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 100);
    gradient.addColorStop(0, color);
    gradient.addColorStop(1, `${color}33`);
    
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
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.stroke();
        
        if (frame < totalFrames) {
            requestAnimationFrame(animate);
        }
    }
    animate();
}

// Zone Controls
function initializeZoneControls() {
    const zoneCards = document.querySelectorAll('.zone-card');
    
    zoneCards.forEach(card => {
        card.addEventListener('click', function() {
            const zoneId = this.dataset.zone;
            openZoneControl(zoneId);
        });
        
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

function openZoneControl(zoneId) {
    // Create zone control modal
    const modal = createZoneModal(zoneId);
    document.body.appendChild(modal);
    
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
}

function createZoneModal(zoneId) {
    const modal = document.createElement('div');
    modal.className = 'zone-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close">&times;</button>
            <h2>Zone ${zoneId} Controls</h2>
            <div class="zone-controls">
                <div class="control-group">
                    <label>Water Flow Rate</label>
                    <input type="range" class="flow-slider" min="0" max="30" value="15">
                    <span class="flow-value">15 L/min</span>
                </div>
                <div class="control-group">
                    <label>Irrigation Duration</label>
                    <input type="range" class="duration-slider" min="5" max="120" value="45">
                    <span class="duration-value">45 min</span>
                </div>
                <div class="control-group">
                    <label>Soil Moisture Threshold</label>
                    <input type="range" class="moisture-slider" min="30" max="90" value="70">
                    <span class="moisture-value">70%</span>
                </div>
                <div class="control-buttons">
                    <button class="start-btn">Start Irrigation</button>
                    <button class="stop-btn">Stop Irrigation</button>
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
        max-width: 400px;
        width: 90%;
        transform: scale(0.9);
        transition: transform 0.3s ease;
    `;
    
    // Add slider functionality
    const flowSlider = modal.querySelector('.flow-slider');
    const flowValue = modal.querySelector('.flow-value');
    flowSlider.addEventListener('input', function() {
        flowValue.textContent = this.value + ' L/min';
    });
    
    const durationSlider = modal.querySelector('.duration-slider');
    const durationValue = modal.querySelector('.duration-value');
    durationSlider.addEventListener('input', function() {
        durationValue.textContent = this.value + ' min';
    });
    
    const moistureSlider = modal.querySelector('.moisture-slider');
    const moistureValue = modal.querySelector('.moisture-value');
    moistureSlider.addEventListener('input', function() {
        moistureValue.textContent = this.value + '%';
    });
    
    // Control buttons
    const startBtn = modal.querySelector('.start-btn');
    const stopBtn = modal.querySelector('.stop-btn');
    
    startBtn.addEventListener('click', function() {
        showNotification('Irrigation started for Zone ' + zoneId, 'success');
        updateZoneStatus(zoneId, 'active');
    });
    
    stopBtn.addEventListener('click', function() {
        showNotification('Irrigation stopped for Zone ' + zoneId, 'warning');
        updateZoneStatus(zoneId, 'standby');
    });
    
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

function updateZoneStatus(zoneId, status) {
    const zoneCard = document.querySelector(`[data-zone="${zoneId}"]`);
    if (zoneCard) {
        const statusElement = zoneCard.querySelector('.zone-status');
        statusElement.className = 'zone-status ' + status;
        statusElement.textContent = status.charAt(0).toUpperCase() + status.slice(1);
        
        // Update progress bar
        const progressFill = zoneCard.querySelector('.progress-fill');
        if (status === 'active') {
            progressFill.style.width = '0%';
            setTimeout(() => {
                progressFill.style.width = '100%';
            }, 100);
        } else {
            progressFill.style.width = '0%';
        }
    }
}

// Conservation Benefits Charts
function initializeConservationCharts() {
    const chartBars = document.querySelectorAll('.chart-bar');
    
    // Animate chart bars on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const value = bar.dataset.value;
                setTimeout(() => {
                    bar.querySelector('::before').style.width = value + '%';
                }, 500);
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });
    
    chartBars.forEach(bar => observer.observe(bar));
}

// Sprinkler Animation
function initializeSprinklerAnimation() {
    const sprinklerContainer = document.getElementById('sprinklerAnimation');
    if (!sprinklerContainer) return;
    
    // Create sprinkler head
    const sprinklerHead = document.createElement('div');
    sprinklerHead.className = 'sprinkler-head';
    sprinklerContainer.appendChild(sprinklerHead);
    
    // Create water jets
    for (let i = 0; i < 4; i++) {
        const waterJet = document.createElement('div');
        waterJet.className = 'water-jet';
        sprinklerHead.appendChild(waterJet);
    }
    
    // Add multiple sprinklers
    for (let i = 0; i < 3; i++) {
        createSprinkler(sprinklerContainer, i);
    }
}

function createSprinkler(container, index) {
    const sprinkler = document.createElement('div');
    sprinkler.className = 'sprinkler-animation';
    sprinkler.style.cssText = `
        position: absolute;
        top: ${20 + index * 30}%;
        left: ${10 + index * 25}%;
        width: 150px;
        height: 150px;
        animation-delay: ${index * 0.5}s;
    `;
    
    const head = document.createElement('div');
    head.className = 'sprinkler-head';
    
    for (let i = 0; i < 4; i++) {
        const jet = document.createElement('div');
        jet.className = 'water-jet';
        head.appendChild(jet);
    }
    
    sprinkler.appendChild(head);
    container.appendChild(sprinkler);
}

// Crop Growth Animation
function initializeCropGrowthAnimation() {
    const cropContainer = document.getElementById('cropGrowth');
    if (!cropContainer) return;
    
    // Create crop plants
    for (let i = 0; i < 8; i++) {
        createCropPlant(cropContainer, i);
    }
}

function createCropPlant(container, index) {
    const plant = document.createElement('div');
    plant.className = 'crop-plant';
    plant.style.left = `${10 + index * 12}%`;
    
    const stem = document.createElement('div');
    stem.className = 'crop-stem';
    
    const leaves = document.createElement('div');
    leaves.className = 'crop-leaves';
    
    plant.appendChild(stem);
    plant.appendChild(leaves);
    container.appendChild(plant);
}

// Real-time Updates
function startRealTimeUpdates() {
    // Update dashboard data
    setInterval(() => {
        updateDashboardData();
    }, 5000);
    
    // Update zone information
    setInterval(() => {
        updateZoneData();
    }, 10000);
}

function updateDashboardData() {
    // Update moisture level
    const moistureIndicator = document.querySelector('.level-indicator');
    if (moistureIndicator) {
        const currentLevel = parseInt(moistureIndicator.dataset.level);
        const change = Math.floor(Math.random() * 6) - 3;
        const newLevel = Math.max(50, Math.min(95, currentLevel + change));
        moistureIndicator.dataset.level = newLevel;
        moistureIndicator.style.background = `conic-gradient(#1abc9c 0% ${newLevel}%, #ecf0f1 ${newLevel}% 100%)`;
        
        const levelText = document.querySelector('.level-text');
        if (levelText) {
            levelText.textContent = newLevel + '% - ' + getMoistureStatus(newLevel);
        }
    }
    
    // Update weather data
    updateWeatherData();
}

function updateWeatherData() {
    const weatherItems = document.querySelectorAll('.weather-item .weather-value');
    weatherItems.forEach(item => {
        const label = item.parentElement.querySelector('.weather-label').textContent;
        let currentValue = parseFloat(item.textContent);
        
        switch(label) {
            case 'Temperature':
                currentValue += (Math.random() - 0.5) * 2;
                item.textContent = currentValue.toFixed(1) + '°C';
                break;
            case 'Humidity':
                currentValue += (Math.random() - 0.5) * 5;
                item.textContent = Math.max(30, Math.min(90, currentValue)).toFixed(0) + '%';
                break;
            case 'Wind Speed':
                currentValue += (Math.random() - 0.5) * 3;
                item.textContent = Math.max(0, currentValue).toFixed(1) + ' km/h';
                break;
        }
    });
}

function updateZoneData() {
    const zoneCards = document.querySelectorAll('.zone-card');
    zoneCards.forEach(card => {
        const flowRateElement = card.querySelector('.info-item:nth-child(1) span');
        const durationElement = card.querySelector('.info-item:nth-child(2) span');
        
        if (flowRateElement && flowRateElement.textContent.includes('L/min')) {
            const currentFlow = parseFloat(flowRateElement.textContent);
            const newFlow = currentFlow + (Math.random() - 0.5) * 2;
            flowRateElement.textContent = `Flow Rate: ${Math.max(0, newFlow).toFixed(1)} L/min`;
        }
        
        if (durationElement && durationElement.textContent.includes('min')) {
            const currentDuration = parseFloat(durationElement.textContent);
            const newDuration = Math.max(5, currentDuration + (Math.random() - 0.5) * 10);
            durationElement.textContent = `Duration: ${newDuration.toFixed(0)} min`;
        }
    });
}

function getMoistureStatus(level) {
    if (level >= 80) return 'Optimal';
    if (level >= 60) return 'Good';
    if (level >= 40) return 'Fair';
    return 'Low';
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
        background: ${type === 'success' ? '#48bb78' : type === 'warning' ? '#f6ad55' : '#4299e1'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add CSS for notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes sprinkler-rotate {
        from { transform: translate(-50%, -50%) rotate(0deg); }
        to { transform: translate(-50%, -50%) rotate(360deg); }
    }
    
    @keyframes jet-expand {
        0%, 100% { transform: translateY(-50%) scaleX(1); opacity: 0.8; }
        50% { transform: translateY(-50%) scaleX(1.5); opacity: 0.5; }
    }
    
    @keyframes crop-grow {
        0%, 100% { transform: scaleY(0.6); }
        50% { transform: scaleY(1); }
    }
    
    @keyframes leaf-wave {
        0%, 100% { transform: translateX(-50%) rotate(-5deg); }
        50% { transform: translateX(-50%) rotate(5deg); }
    }
`;
document.head.appendChild(notificationStyles);