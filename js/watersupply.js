// Water Supply Systems JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeWaterSupplySystem();
    initializeWaterQualityMonitoring();
    initializeSystemMap();
    initializeConservationChart();
    initializeWaterAnimations();
    initializeInteractiveElements();
});

// Initialize Water Supply System
function initializeWaterSupplySystem() {
    // Start real-time monitoring
    startRealTimeMonitoring();
    
    // Initialize system components
    initializeWaterCycle();
    
    console.log('Water Supply System initialized');
}

// Water Cycle Animation
function initializeWaterCycle() {
    const cycleSteps = document.querySelectorAll('.cycle-step');
    
    cycleSteps.forEach((step, index) => {
        step.addEventListener('click', function() {
            showCycleDetails(index);
        });
        
        // Add hover effects
        step.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
            this.style.background = 'rgba(255, 255, 255, 0.2)';
        });
        
        step.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.background = 'rgba(255, 255, 255, 0.1)';
        });
    });
}

function showCycleDetails(stepIndex) {
    const cycleInfo = [
        {
            title: 'Water Collection',
            description: 'Water is collected from natural sources including mountain springs, rivers, and underground aquifers.',
            details: 'Collection points are strategically located to ensure sustainable water extraction while protecting natural habitats.'
        },
        {
            title: 'Water Treatment',
            description: 'Raw water undergoes multiple treatment processes to ensure it meets quality standards.',
            details: 'Treatment includes filtration, sedimentation, disinfection, and quality testing before distribution.'
        },
        {
            title: 'Distribution',
            description: 'Clean water is distributed through an extensive network of pipes to communities and conservation areas.',
            details: 'Smart distribution systems monitor usage patterns and maintain optimal pressure throughout the network.'
        }
    ];
    
    const info = cycleInfo[stepIndex];
    showNotification(`${info.title}: ${info.description}`, 'info');
}

// Water Quality Monitoring
function initializeWaterQualityMonitoring() {
    const monitorCards = document.querySelectorAll('.monitor-card');
    
    monitorCards.forEach(card => {
        card.addEventListener('click', function() {
            const valueElement = this.querySelector('.monitor-value');
            const labelElement = this.querySelector('.monitor-label');
            showDetailedReading(labelElement.textContent, valueElement.textContent);
        });
    });
    
    // Start real-time quality updates
    startQualityUpdates();
}

function startQualityUpdates() {
    // Update water quality parameters every 5 seconds
    setInterval(() => {
        updateQualityParameters();
    }, 5000);
}

function updateQualityParameters() {
    // Temperature updates
    const temperatureElement = document.getElementById('temperature');
    if (temperatureElement) {
        const currentTemp = parseFloat(temperatureElement.textContent);
        const newTemp = currentTemp + (Math.random() - 0.5) * 0.5;
        temperatureElement.textContent = newTemp.toFixed(1) + '°C';
        updateStatusIndicator(temperatureElement.parentElement, newTemp, 15, 25, '°C');
    }
    
    // pH updates
    const phElement = document.getElementById('ph');
    if (phElement) {
        const currentPh = parseFloat(phElement.textContent);
        const newPh = currentPh + (Math.random() - 0.5) * 0.2;
        phElement.textContent = newPh.toFixed(1);
        updateStatusIndicator(phElement.parentElement, newPh, 6.5, 8.5, 'pH');
    }
    
    // Turbidity updates
    const turbidityElement = document.getElementById('turbidity');
    if (turbidityElement) {
        const currentTurbidity = parseFloat(turbidityElement.textContent);
        const newTurbidity = currentTurbidity + (Math.random() - 0.5) * 0.5;
        turbidityElement.textContent = newTurbidity.toFixed(1) + ' NTU';
        updateStatusIndicator(turbidityElement.parentElement, newTurbidity, 0, 4, 'NTU');
    }
    
    // Dissolved oxygen updates
    const oxygenElement = document.getElementById('oxygen');
    if (oxygenElement) {
        const currentOxygen = parseFloat(oxygenElement.textContent);
        const newOxygen = currentOxygen + (Math.random() - 0.5) * 0.3;
        oxygenElement.textContent = newOxygen.toFixed(1) + ' mg/L';
        updateStatusIndicator(oxygenElement.parentElement, newOxygen, 6, 12, 'mg/L');
    }
}

function updateStatusIndicator(card, value, minGood, maxGood, unit) {
    const statusElement = card.querySelector('.monitor-status');
    const valueElement = card.querySelector('.monitor-value');
    
    // Remove existing status classes
    statusElement.classList.remove('good', 'warning', 'bad');
    
    // Determine status based on value ranges
    if (value >= minGood && value <= maxGood) {
        statusElement.classList.add('good');
        statusElement.textContent = 'Optimal';
        valueElement.style.color = '#27ae60';
    } else if (value >= minGood - 2 && value <= maxGood + 2) {
        statusElement.classList.add('warning');
        statusElement.textContent = 'Fair';
        valueElement.style.color = '#f39c12';
    } else {
        statusElement.classList.add('bad');
        statusElement.textContent = 'Poor';
        valueElement.style.color = '#e74c3c';
    }
    
    // Animate value change
    valueElement.style.transform = 'scale(1.1)';
    setTimeout(() => {
        valueElement.style.transform = 'scale(1)';
    }, 200);
}

function showDetailedReading(parameter, value) {
    const details = {
        'Temperature': `Water temperature affects aquatic life and treatment efficiency. Current: ${value}`,
        'pH Level': `pH indicates water acidity/alkalinity. Optimal range: 6.5-8.5. Current: ${value}`,
        'Turbidity': `Turbidity measures water clarity. Lower values indicate cleaner water. Current: ${value}`,
        'Dissolved O₂': `Oxygen levels support aquatic ecosystems. Current: ${value}`
    };
    
    showNotification(details[parameter] || `${parameter}: ${value}`, 'info');
}

// System Map Interactions
function initializeSystemMap() {
    const mapComponents = document.querySelectorAll('.map-source, .map-treatment, .map-reservoir, .map-distribution');
    
    mapComponents.forEach(component => {
        component.addEventListener('click', function() {
            const title = this.querySelector('h3').textContent;
            const description = this.querySelector('p').textContent;
            showSystemComponentDetails(title, description);
        });
        
        // Add pulse animation on hover
        component.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.source-icon, .treatment-icon, .reservoir-icon, .distribution-icon');
            icon.style.animation = 'pulse 1s infinite';
        });
        
        component.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.source-icon, .treatment-icon, .reservoir-icon, .distribution-icon');
            icon.style.animation = '';
        });
    });
}

function showSystemComponentDetails(title, description) {
    const details = {
        'Mountain Source': 'Natural springs provide the purest water source, requiring minimal treatment while supporting local ecosystems.',
        'Treatment Plant': 'Advanced filtration and purification systems ensure water quality meets international standards for human consumption and wildlife safety.',
        'Storage Reservoir': 'Strategic water storage maintains supply during dry periods and provides emergency reserves for conservation areas.',
        'Distribution': 'Smart distribution networks deliver water efficiently while monitoring usage patterns and detecting leaks in real-time.'
    };
    
    showNotification(`${title}: ${details[title] || description}`, 'info');
}

// Conservation Impact Chart
function initializeConservationChart() {
    const chartCanvas = document.getElementById('conservationChart');
    if (!chartCanvas) return;
    
    createConservationChart(chartCanvas);
    
    // Update chart periodically
    setInterval(() => {
        updateConservationChart(chartCanvas);
    }, 10000);
}

function createConservationChart(canvas) {
    const ctx = canvas.getContext('2d');
    const data = generateConservationData();
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Create gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#3498db');
    gradient.addColorStop(1, 'rgba(52, 152, 219, 0.1)');
    
    // Draw chart
    drawLineChart(ctx, data, gradient, '#3498db');
    
    // Add labels
    addChartLabels(ctx, canvas, data);
}

function generateConservationData() {
    const data = [];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    
    for (let i = 0; i < months.length; i++) {
        data.push({
            month: months[i],
            value: Math.random() * 40 + 30, // 30-70% range
            target: 50
        });
    }
    
    return data;
}

function drawLineChart(ctx, data, gradient, color) {
    const padding = 40;
    const chartWidth = ctx.canvas.width - padding * 2;
    const chartHeight = ctx.canvas.height - padding * 2;
    
    // Draw area
    ctx.beginPath();
    ctx.moveTo(padding, ctx.canvas.height - padding);
    
    data.forEach((point, index) => {
        const x = padding + (index / (data.length - 1)) * chartWidth;
        const y = padding + (1 - point.value / 100) * chartHeight;
        ctx.lineTo(x, y);
    });
    
    ctx.lineTo(ctx.canvas.width - padding, ctx.canvas.height - padding);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();
    
    // Draw line
    ctx.beginPath();
    data.forEach((point, index) => {
        const x = padding + (index / (data.length - 1)) * chartWidth;
        const y = padding + (1 - point.value / 100) * chartHeight;
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.stroke();
    
    // Draw target line
    const targetY = padding + (1 - 0.5) * chartHeight;
    ctx.beginPath();
    ctx.moveTo(padding, targetY);
    ctx.lineTo(ctx.canvas.width - padding, targetY);
    ctx.strokeStyle = '#f39c12';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.stroke();
    ctx.setLineDash([]);
}

function addChartLabels(ctx, canvas, data) {
    const padding = 40;
    
    // Add month labels
    ctx.fillStyle = '#666';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    
    data.forEach((point, index) => {
        const x = padding + (index / (data.length - 1)) * (canvas.width - padding * 2);
        ctx.fillText(point.month, x, canvas.height - 10);
    });
}

function updateConservationChart(canvas) {
    const ctx = canvas.getContext('2d');
    const data = generateConservationData();
    
    // Animate the update
    animateChartUpdate(ctx, data);
}

function animateChartUpdate(ctx, data) {
    const gradient = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);
    gradient.addColorStop(0, '#3498db');
    gradient.addColorStop(1, 'rgba(52, 152, 219, 0.1)');
    
    let frame = 0;
    const totalFrames = 30;
    
    function animate() {
        frame++;
        const progress = frame / totalFrames;
        
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        
        // Animate chart update
        const currentData = data.map(point => ({
            ...point,
            value: point.value * progress
        }));
        
        drawLineChart(ctx, currentData, gradient, '#3498db');
        addChartLabels(ctx, ctx.canvas, data);
        
        if (frame < totalFrames) {
            requestAnimationFrame(animate);
        }
    }
    animate();
}

// Water Animations
function initializeWaterAnimations() {
    // Create water drops
    const waterDropsContainer = document.getElementById('waterDrops');
    if (waterDropsContainer) {
        createWaterDrops(waterDropsContainer);
    }
    
    // Create pipe network
    const pipeNetworkContainer = document.getElementById('pipeNetwork');
    if (pipeNetworkContainer) {
        createPipeNetwork(pipeNetworkContainer);
    }
}

function createWaterDrops(container) {
    const dropCount = 20;
    
    for (let i = 0; i < dropCount; i++) {
        const drop = document.createElement('div');
        drop.className = 'water-drop';
        
        // Random position and timing
        drop.style.left = Math.random() * 100 + '%';
        drop.style.animationDelay = Math.random() * 4 + 's';
        drop.style.animationDuration = (Math.random() * 2 + 3) + 's';
        
        container.appendChild(drop);
    }
}

function createPipeNetwork(container) {
    const pipeCount = 8;
    
    for (let i = 0; i < pipeCount; i++) {
        const pipe = document.createElement('div');
        pipe.className = 'pipe-segment';
        
        // Random position and orientation
        pipe.style.top = Math.random() * 100 + '%';
        pipe.style.left = Math.random() * 100 + '%';
        pipe.style.width = (Math.random() * 150 + 100) + 'px';
        pipe.style.transform = `rotate(${Math.random() * 60 - 30}deg)`;
        pipe.style.animationDelay = Math.random() * 2 + 's';
        
        container.appendChild(pipe);
    }
}

// Interactive Elements
function initializeInteractiveElements() {
    // Add click effects to metric items
    const metricItems = document.querySelectorAll('.metric-item');
    
    metricItems.forEach(item => {
        item.addEventListener('click', function() {
            const number = this.querySelector('.metric-number').textContent;
            const label = this.querySelector('.metric-label').textContent;
            showMetricDetails(label, number);
        });
    });
    
    // Add hover effects to monitor cards
    const monitorCards = document.querySelectorAll('.monitor-card');
    monitorCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

function showMetricDetails(label, value) {
    const details = {
        'Water Savings': 'Advanced treatment and distribution systems reduce water waste by 35% compared to traditional methods.',
        'Species Protected': 'Clean water access supports over 50 local species including the endangered Spiny Babbler.',
        'Hectares Conserved': 'Water management programs have enabled conservation of 2000 hectares of natural habitat.'
    };
    
    showNotification(`${label}: ${details[label] || 'Detailed information available'}`, 'info');
}

// Real-time Monitoring
function startRealTimeMonitoring() {
    // Simulate real-time data updates
    setInterval(() => {
        simulateSystemUpdates();
    }, 8000);
}

function simulateSystemUpdates() {
    // Random system events
    const events = [
        { type: 'info', message: 'Water quality check completed - all parameters optimal' },
        { type: 'success', message: 'Treatment plant operating at 95% efficiency' },
        { type: 'warning', message: 'Minor pressure fluctuation detected in Zone 3' },
        { type: 'info', message: 'Daily water savings: 15,000 liters' }
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
        background: ${type === 'success' ? '#48bb78' : type === 'warning' ? '#f6ad55' : '#3498db'};
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

// Add CSS animations dynamically
const waterSupplyStyles = document.createElement('style');
waterSupplyStyles.textContent = `
    @keyframes counter-up {
        from {
            transform: scale(0);
            opacity: 0;
        }
        to {
            transform: scale(1);
            opacity: 1;
        }
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    .notification:hover {
        transform: translateX(0) scale(1.02);
    }
    
    .monitor-value {
        transition: all 0.3s ease;
    }
    
    .monitor-status {
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(waterSupplyStyles);

// Export functions for use in other scripts
window.WaterSupplySystem = {
    showNotification,
    updateQualityParameters,
    createConservationChart
};