// Advanced Structure Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeStructureAnimations();
    initializeStructuralDashboard();
    initialize3DViewer();
    initializeMaterialProperties();
    initializeSafetyCompliance();
    initializeStructuralCalculations();
});

// Structure Animations
function initializeStructureAnimations() {
    // Initialize grid animation
    animateStructureGrid();
    
    // Initialize force animation
    animateForceVectors();
    
    // Initialize counter animations
    initializeStructureCounters();
}

function animateStructureGrid() {
    const grid = document.getElementById('structureGrid');
    if (!grid) return;
    
    // Create dynamic grid effect
    setInterval(() => {
        grid.style.opacity = Math.random() * 0.3 + 0.1;
    }, 2000);
}

function animateForceVectors() {
    const forceAnimation = document.getElementById('forceAnimation');
    if (!forceAnimation) return;
    
    // Create dynamic force vectors
    setInterval(() => {
        const intensity = Math.random() * 0.8 + 0.2;
        forceAnimation.style.opacity = intensity;
        
        // Change colors based on intensity
        const hue = Math.floor(intensity * 60); // 0-60 degrees (red to yellow)
        forceAnimation.style.setProperty('--force-color', `hsl(${hue}, 70%, 50%)`);
    }, 1000);
}

function initializeStructureCounters() {
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

// Structural Dashboard
function initializeStructuralDashboard() {
    initializeStressMonitoring();
    initializeVibrationMonitoring();
    initializeDeformationMonitoring();
    initializeLoadMonitoring();
}

function initializeStressMonitoring() {
    // Simulate real-time stress updates
    const stressValue = document.querySelector('.stress-value');
    const stressFill = document.querySelector('.stress-fill');
    const stressStatus = document.querySelector('.stress-status');
    
    if (stressValue && stressFill && stressStatus) {
        updateStressData();
        setInterval(updateStressData, 5000);
    }
}

function updateStressData() {
    const stressValue = document.querySelector('.stress-value');
    const stressFill = document.querySelector('.stress-fill');
    const stressStatus = document.querySelector('.stress-status');
    
    // Simulate stress changes
    const baseStress = 45;
    const variation = Math.random() * 20 - 10;
    const newStress = Math.max(0, baseStress + variation);
    const stressPercentage = (newStress / 250) * 100;
    
    // Update display
    stressValue.textContent = newStress.toFixed(1) + ' MPa';
    stressFill.style.width = stressPercentage + '%';
    
    // Update status
    stressStatus.classList.remove('safe', 'warning', 'critical');
    if (stressPercentage < 60) {
        stressStatus.classList.add('safe');
        stressStatus.textContent = 'Safe';
    } else if (stressPercentage < 85) {
        stressStatus.classList.add('warning');
        stressStatus.textContent = 'Warning';
    } else {
        stressStatus.classList.add('critical');
        stressStatus.textContent = 'Critical';
    }
    
    // Animate the change
    animateValueChange(stressValue, newStress.toFixed(1));
}

function initializeVibrationMonitoring() {
    const vibrationChart = document.getElementById('vibrationChart');
    if (vibrationChart) {
        createVibrationChart(vibrationChart);
    }
}

function createVibrationChart(canvas) {
    const ctx = canvas.getContext('2d');
    const data = generateVibrationData();
    
    // Create gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, 100);
    gradient.addColorStop(0, '#3498db');
    gradient.addColorStop(1, 'rgba(52, 152, 219, 0.1)');
    
    // Draw chart
    drawVibrationChart(ctx, data, gradient);
    
    // Update chart periodically
    setInterval(() => {
        updateVibrationChart(canvas);
    }, 3000);
}

function generateVibrationData() {
    const data = [];
    for (let i = 0; i < 50; i++) {
        data.push(Math.sin(i * 0.2) * 20 + Math.random() * 10 + 30);
    }
    return data;
}

function drawVibrationChart(ctx, data, gradient) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
    // Draw area
    ctx.beginPath();
    ctx.moveTo(0, 100);
    data.forEach((point, index) => {
        const x = (index / (data.length - 1)) * ctx.canvas.width;
        const y = 100 - (point / 50) * 80;
        ctx.lineTo(x, y);
    });
    ctx.lineTo(ctx.canvas.width, 100);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();
    
    // Draw line
    ctx.beginPath();
    data.forEach((point, index) => {
        const x = (index / (data.length - 1)) * ctx.canvas.width;
        const y = 100 - (point / 50) * 80;
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

function updateVibrationChart(canvas) {
    const data = generateVibrationData();
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 100);
    gradient.addColorStop(0, '#3498db');
    gradient.addColorStop(1, 'rgba(52, 152, 219, 0.1)');
    
    animateChartUpdate(ctx, data, gradient);
}

function initializeDeformationMonitoring() {
    // Simulate LVDT readings
    const lvdtItems = document.querySelectorAll('.lvdt-item span:last-child');
    
    updateDeformationData();
    setInterval(updateDeformationData, 8000);
}

function updateDeformationData() {
    const lvdtItems = document.querySelectorAll('.lvdt-item span:last-child');
    
    lvdtItems.forEach((item, index) => {
        const baseValues = [0.2, 0.1, 0.3];
        const variation = (Math.random() - 0.5) * 0.1;
        const newValue = Math.max(0, baseValues[index] + variation);
        
        item.textContent = newValue.toFixed(2) + ' mm';
        animateValueChange(item, newValue.toFixed(2));
    });
}

function initializeLoadMonitoring() {
    const loadChart = document.getElementById('loadChart');
    if (loadChart) {
        createLoadChart(loadChart);
    }
}

function createLoadChart(canvas) {
    const ctx = canvas.getContext('2d');
    
    // Create pie chart for load distribution
    const data = [
        { label: 'Dead Load', value: 60, color: '#3498db' },
        { label: 'Live Load', value: 25, color: '#e74c3c' },
        { label: 'Wind Load', value: 15, color: '#f39c12' }
    ];
    
    drawPieChart(ctx, data);
}

function drawPieChart(ctx, data) {
    const centerX = ctx.canvas.width / 2;
    const centerY = ctx.canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 20;
    
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
    let currentAngle = -Math.PI / 2;
    
    data.forEach(segment => {
        const angle = (segment.value / 100) * 2 * Math.PI;
        
        // Draw segment
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + angle);
        ctx.closePath();
        ctx.fillStyle = segment.color;
        ctx.fill();
        
        currentAngle += angle;
    });
}

// 3D Structure Viewer
function initialize3DViewer() {
    const viewerControls = document.querySelectorAll('.control-btn');
    const structureModel = document.getElementById('structureModel');
    const elementInfo = document.getElementById('elementInfo');
    
    // Handle view controls
    viewerControls.forEach(control => {
        control.addEventListener('click', function() {
            // Update active button
            viewerControls.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Change view
            const view = this.getAttribute('data-view');
            changeStructureView(view);
        });
    });
    
    // Handle element interactions
    const modelElements = document.querySelectorAll('.model-element');
    modelElements.forEach(element => {
        element.addEventListener('click', function() {
            const elementType = this.getAttribute('data-element');
            showElementInfo(elementType, elementInfo);
        });
        
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.boxShadow = '0 0 20px rgba(66, 153, 225, 0.6)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
}

function changeStructureView(view) {
    const model = document.getElementById('structureModel');
    
    switch(view) {
        case 'perspective':
            model.style.transform = 'rotateX(-10deg) rotateY(20deg)';
            break;
        case 'front':
            model.style.transform = 'rotateX(0deg) rotateY(0deg)';
            break;
        case 'side':
            model.style.transform = 'rotateX(0deg) rotateY(90deg)';
            break;
        case 'top':
            model.style.transform = 'rotateX(90deg) rotateY(0deg)';
            break;
    }
}

function showElementInfo(elementType, infoContainer) {
    const elementData = {
        beam: {
            title: 'Structural Beam',
            description: 'Horizontal structural element designed to carry loads primarily in bending. Made of reinforced concrete with steel reinforcement for optimal strength and durability.',
            properties: [
                'Length: 6.0m',
                'Cross-section: 300mm × 500mm',
                'Reinforcement: 4Φ20 + 2Φ16',
                'Concrete Grade: C30/37',
                'Design Load: 25 kN/m'
            ]
        },
        column: {
            title: 'Structural Column',
            description: 'Vertical structural element designed to carry compressive loads. Provides primary support for the structural system.',
            properties: [
                'Height: 3.0m',
                'Cross-section: 400mm × 400mm',
                'Reinforcement: 8Φ20',
                'Concrete Grade: C35/45',
                'Load Capacity: 2000 kN'
            ]
        },
        foundation: {
            title: 'Foundation System',
            description: 'Structural element that transfers loads from the building to the ground. Designed based on geotechnical analysis.',
            properties: [
                'Type: Raft Foundation',
                'Thickness: 600mm',
                'Reinforcement:双层Φ16@150',
                'Concrete Grade: C30/37',
                'Bearing Capacity: 250 kPa'
            ]
        },
        slab: {
            title: 'Floor Slab',
            description: 'Horizontal structural element that forms floors and roofs. Designed to carry both dead and live loads.',
            properties: [
                'Thickness: 200mm',
                'Span: 6.0m × 6.0m',
                'Reinforcement: Φ12@150',
                'Concrete Grade: C25/30',
                'Live Load: 3.0 kN/m²'
            ]
        }
    };
    
    const data = elementData[elementType];
    if (data) {
        infoContainer.innerHTML = `
            <h3>${data.title}</h3>
            <p>${data.description}</p>
            <h4>Technical Properties:</h4>
            <ul>
                ${data.properties.map(prop => `<li>${prop}</li>`).join('')}
            </ul>
            <div class="element-actions">
                <button class="btn-detail" onclick="showDetailedAnalysis('${elementType}')">
                    <i class="fas fa-chart-line"></i> Detailed Analysis
                </button>
                <button class="btn-report" onclick="generateReport('${elementType}')">
                    <i class="fas fa-file-alt"></i> Generate Report
                </button>
            </div>
        `;
    }
}

function showDetailedAnalysis(elementType) {
    // Create modal with detailed structural analysis
    const modal = createAnalysisModal(elementType);
    document.body.appendChild(modal);
    
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
}

function createAnalysisModal(elementType) {
    const modal = document.createElement('div');
    modal.className = 'analysis-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close">&times;</button>
            <h2>Structural Analysis - ${elementType}</h2>
            <div class="analysis-charts">
                <canvas id="stressChart" width="400" height="200"></canvas>
                <canvas id="deflectionChart" width="400" height="200"></canvas>
            </div>
            <div class="analysis-results">
                <h3>Analysis Results</h3>
                <div class="results-grid">
                    <div class="result-item">
                        <span>Maximum Stress</span>
                        <span>45.2 MPa</span>
                    </div>
                    <div class="result-item">
                        <span>Safety Factor</span>
                        <span>2.8</span>
                    </div>
                    <div class="result-item">
                        <span>Maximum Deflection</span>
                        <span>12.5 mm</span>
                    </div>
                    <div class="result-item">
                        <span>Utilization Ratio</span>
                        <span>68%</span>
                    </div>
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
        max-width: 800px;
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
    
    // Initialize charts
    setTimeout(() => {
        initializeAnalysisCharts();
    }, 100);
    
    return modal;
}

function initializeAnalysisCharts() {
    const stressChart = document.getElementById('stressChart');
    const deflectionChart = document.getElementById('deflectionChart');
    
    if (stressChart) {
        createStressChart(stressChart);
    }
    
    if (deflectionChart) {
        createDeflectionChart(deflectionChart);
    }
}

function createStressChart(canvas) {
    const ctx = canvas.getContext('2d');
    const data = generateStressData();
    
    // Create gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, 200);
    gradient.addColorStop(0, '#e74c3c');
    gradient.addColorStop(1, 'rgba(231, 76, 60, 0.1)');
    
    drawStressChart(ctx, data, gradient);
}

function createDeflectionChart(canvas) {
    const ctx = canvas.getContext('2d');
    const data = generateDeflectionData();
    
    // Create gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, 200);
    gradient.addColorStop(0, '#3498db');
    gradient.addColorStop(1, 'rgba(52, 152, 219, 0.1)');
    
    drawDeflectionChart(ctx, data, gradient);
}

function generateStressData() {
    const data = [];
    for (let i = 0; i < 20; i++) {
        data.push(Math.sin(i * 0.3) * 15 + 35 + Math.random() * 5);
    }
    return data;
}

function generateDeflectionData() {
    const data = [];
    for (let i = 0; i < 20; i++) {
        data.push(Math.sin(i * 0.2) * 5 + 10 + Math.random() * 2);
    }
    return data;
}

function drawStressChart(ctx, data, gradient) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
    // Draw area
    ctx.beginPath();
    ctx.moveTo(0, 200);
    data.forEach((point, index) => {
        const x = (index / (data.length - 1)) * ctx.canvas.width;
        const y = 200 - (point / 50) * 180;
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
        const y = 200 - (point / 50) * 180;
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    ctx.strokeStyle = '#e74c3c';
    ctx.lineWidth = 2;
    ctx.stroke();
}

function drawDeflectionChart(ctx, data, gradient) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
    // Draw area
    ctx.beginPath();
    ctx.moveTo(0, 200);
    data.forEach((point, index) => {
        const x = (index / (data.length - 1)) * ctx.canvas.width;
        const y = 200 - (point / 20) * 180;
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
        const y = 200 - (point / 20) * 180;
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

function generateReport(elementType) {
    // Simulate report generation
    const notification = createNotification('Report Generated', `Detailed analysis report for ${elementType} has been created.`);
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'fade-out 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Material Properties
function initializeMaterialProperties() {
    const materialCards = document.querySelectorAll('.material-card');
    
    materialCards.forEach(card => {
        card.addEventListener('click', function() {
            // Highlight selected material
            materialCards.forEach(c => c.classList.remove('selected'));
            this.classList.add('selected');
            
            // Show detailed material properties
            showMaterialDetails(this);
        });
    });
}

function showMaterialDetails(card) {
    const materialType = card.querySelector('h3').textContent;
    
    // Add pulse animation to properties
    const properties = card.querySelectorAll('.property-item');
    properties.forEach((prop, index) => {
        setTimeout(() => {
            prop.style.animation = 'highlight 0.5s ease';
            setTimeout(() => {
                prop.style.animation = '';
            }, 500);
        }, index * 100);
    });
}

// Safety & Compliance
function initializeSafetyCompliance() {
    // Add interactive compliance monitoring
    const complianceItems = document.querySelectorAll('.compliance-item');
    
    complianceItems.forEach(item => {
        item.addEventListener('click', function() {
            // Show detailed compliance information
            showComplianceDetails(this);
        });
    });
    
    // Simulate periodic compliance updates
    updateComplianceData();
    setInterval(updateComplianceData, 30000);
}

function updateComplianceData() {
    // Simulate minor changes in compliance values
    const complianceValues = document.querySelectorAll('.compliance-value');
    
    complianceValues.forEach(value => {
        const currentValue = parseFloat(value.textContent);
        if (!isNaN(currentValue)) {
            const variation = (Math.random() - 0.5) * 0.2;
            const newValue = Math.max(0, currentValue + variation);
            value.textContent = newValue.toFixed(1);
        }
    });
}

function showComplianceDetails(item) {
    const complianceType = item.querySelector('h3').textContent;
    
    // Create detailed compliance modal
    const modal = createComplianceModal(complianceType);
    document.body.appendChild(modal);
    
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
}

function createComplianceModal(type) {
    const modal = document.createElement('div');
    modal.className = 'compliance-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close">&times;</button>
            <h2>${type} Compliance Details</h2>
            <div class="compliance-details">
                <h3>Standards & Codes</h3>
                <ul>
                    <li>IS 456:2000 - Plain and Reinforced Concrete</li>
                    <li>IS 875:1987 - Code of Practice for Design Loads</li>
                    <li>IS 1893:2016 - Criteria for Earthquake Resistant Design</li>
                </ul>
                <h3>Test Results</h3>
                <div class="test-results">
                    <div class="test-item">
                        <span>Compressive Strength Test</span>
                        <span class="result pass">PASS</span>
                    </div>
                    <div class="test-item">
                        <span>Slump Test</span>
                        <span class="result pass">PASS</span>
                    </div>
                    <div class="test-item">
                        <span>Reinforcement Check</span>
                        <span class="result pass">PASS</span>
                    </div>
                </div>
                <h3>Certifications</h3>
                <div class="certifications">
                    <div class="cert-item">
                        <i class="fas fa-certificate"></i>
                        <span>ISO 9001:2015 Certified</span>
                    </div>
                    <div class="cert-item">
                        <i class="fas fa-certificate"></i>
                        <span>Green Building Certified</span>
                    </div>
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
    
    return modal;
}

// Structural Calculations
function initializeStructuralCalculations() {
    // Add interactive calculation tools
    addCalculationTools();
    
    // Initialize real-time structural analysis
    initializeRealTimeAnalysis();
}

function addCalculationTools() {
    // Add calculation buttons to relevant sections
    const calculationSections = document.querySelectorAll('.dashboard-card, .material-card');
    
    calculationSections.forEach(section => {
        const calcButton = document.createElement('button');
        calcButton.className = 'calc-btn';
        calcButton.innerHTML = '<i class="fas fa-calculator"></i> Calculate';
        calcButton.addEventListener('click', () => {
            showCalculationTool(section);
        });
        
        section.appendChild(calcButton);
    });
}

function showCalculationTool(section) {
    const sectionType = section.querySelector('h3').textContent;
    
    // Create calculation modal based on section type
    const modal = createCalculationModal(sectionType);
    document.body.appendChild(modal);
    
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
}

function createCalculationModal(type) {
    const modal = document.createElement('div');
    modal.className = 'calculation-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close">&times;</button>
            <h2>Structural Calculator - ${type}</h2>
            <div class="calculator-form">
                <div class="input-group">
                    <label>Load (kN):</label>
                    <input type="number" id="loadInput" value="100">
                </div>
                <div class="input-group">
                    <label>Span (m):</label>
                    <input type="number" id="spanInput" value="6">
                </div>
                <div class="input-group">
                    <label>Material:</label>
                    <select id="materialSelect">
                        <option value="concrete">Concrete</option>
                        <option value="steel">Steel</option>
                        <option value="timber">Timber</option>
                    </select>
                </div>
                <button class="calculate-btn" onclick="performCalculation()">
                    <i class="fas fa-calculator"></i> Calculate
                </button>
            </div>
            <div class="calculation-results" id="calcResults">
                <p>Enter values and click calculate to see results.</p>
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

function performCalculation() {
    const load = parseFloat(document.getElementById('loadInput').value);
    const span = parseFloat(document.getElementById('spanInput').value);
    const material = document.getElementById('materialSelect').value;
    
    // Perform structural calculations
    const results = calculateStructuralParameters(load, span, material);
    
    // Display results
    displayCalculationResults(results);
}

function calculateStructuralParameters(load, span, material) {
    // Simplified structural calculations
    const moment = (load * span * span) / 8; // kNm
    const shear = (load * span) / 2; // kN
    
    let requiredArea, sectionModulus;
    
    switch(material) {
        case 'concrete':
            requiredArea = (moment * 1000) / (0.85 * 30 * 0.9 * span * 1000); // mm²
            sectionModulus = moment * 1000 / 15; // mm³
            break;
        case 'steel':
            requiredArea = (moment * 1000) / (275 * 0.9); // mm²
            sectionModulus = moment * 1000 / 275; // mm³
            break;
        case 'timber':
            requiredArea = (moment * 1000) / (24 * 0.9); // mm²
            sectionModulus = moment * 1000 / 24; // mm³
            break;
    }
    
    return {
        moment: moment.toFixed(2),
        shear: shear.toFixed(2),
        requiredArea: requiredArea.toFixed(0),
        sectionModulus: sectionModulus.toFixed(0),
        material: material
    };
}

function displayCalculationResults(results) {
    const resultsContainer = document.getElementById('calcResults');
    
    resultsContainer.innerHTML = `
        <div class="results-summary">
            <h3>Calculation Results</h3>
            <div class="result-grid">
                <div class="result-item">
                    <span>Bending Moment</span>
                    <span>${results.moment} kNm</span>
                </div>
                <div class="result-item">
                    <span>Shear Force</span>
                    <span>${results.shear} kN</span>
                </div>
                <div class="result-item">
                    <span>Required Area</span>
                    <span>${results.requiredArea} mm²</span>
                </div>
                <div class="result-item">
                    <span>Section Modulus</span>
                    <span>${results.sectionModulus} mm³</span>
                </div>
            </div>
            <div class="recommendation">
                <i class="fas fa-lightbulb"></i>
                <span>Recommended section size calculated based on ${results.material} properties</span>
            </div>
        </div>
    `;
}

function initializeRealTimeAnalysis() {
    // Simulate real-time structural analysis updates
    setInterval(() => {
        updateStructuralParameters();
    }, 10000);
}

function updateStructuralParameters() {
    // Update stress, deformation, and other parameters
    const stressValue = document.querySelector('.stress-value');
    if (stressValue) {
        updateStressData();
    }
    
    const deformationValues = document.querySelectorAll('.lvdt-item span:last-child');
    if (deformationValues.length > 0) {
        updateDeformationData();
    }
}

// Utility Functions
function animateValueChange(element, newValue) {
    element.style.transition = 'all 0.3s ease';
    element.style.transform = 'scale(1.1)';
    element.style.color = '#e74c3c';
    
    setTimeout(() => {
        element.style.transform = '';
        element.style.color = '';
    }, 300);
}

function createNotification(title, message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <div class="notification-icon">
            <i class="fas fa-check-circle"></i>
        </div>
        <div class="notification-content">
            <h4>${title}</h4>
            <p>${message}</p>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #27ae60;
        color: white;
        padding: 1rem;
        border-radius: 10px;
        display: flex;
        align-items: center;
        gap: 1rem;
        z-index: 9999;
        animation: slide-in-right 0.3s ease;
        max-width: 400px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    `;
    
    return notification;
}

// Add CSS animations
const structureStyles = document.createElement('style');
structureStyles.textContent = `
    @keyframes slide-in-right {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes fade-out {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
    
    @keyframes highlight {
        0% {
            background: transparent;
        }
        50% {
            background: rgba(66, 153, 225, 0.2);
        }
        100% {
            background: transparent;
        }
    }
    
    .material-card.selected {
        border-color: var(--accent-color);
        transform: translateY(-5px);
        box-shadow: 0 20px 40px var(--shadow-dark);
    }
    
    .calc-btn {
        background: var(--accent-color);
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 8px;
        cursor: pointer;
        margin-top: 1rem;
        transition: all 0.3s ease;
    }
    
    .calc-btn:hover {
        background: var(--accent-hover);
        transform: translateY(-2px);
    }
    
    .element-actions {
        display: flex;
        gap: 1rem;
        margin-top: 1.5rem;
    }
    
    .btn-detail, .btn-report {
        background: var(--accent-color);
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 8px;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        transition: all 0.3s ease;
    }
    
    .btn-detail:hover, .btn-report:hover {
        background: var(--accent-hover);
        transform: translateY(-2px);
    }
    
    .input-group {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        margin-bottom: 1rem;
    }
    
    .input-group label {
        color: var(--text-primary);
        font-weight: 500;
    }
    
    .input-group input, .input-group select {
        padding: 0.5rem;
        border: 1px solid var(--border-color);
        border-radius: 8px;
        background: var(--bg-primary);
        color: var(--text-primary);
    }
    
    .calculate-btn {
        background: var(--accent-color);
        color: white;
        border: none;
        padding: 0.75rem 1.5rem;
        border-radius: 8px;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-top: 1rem;
        transition: all 0.3s ease;
    }
    
    .calculate-btn:hover {
        background: var(--accent-hover);
        transform: translateY(-2px);
    }
    
    .results-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
        margin: 1rem 0;
    }
    
    .result-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.5rem;
        background: rgba(0, 0, 0, 0.05);
        border-radius: 8px;
    }
    
    .recommendation {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 1rem;
        background: rgba(39, 174, 96, 0.1);
        border-radius: 8px;
        color: #27ae60;
        margin-top: 1rem;
    }
`;
document.head.appendChild(structureStyles);