// 🚀 ULTRA-COOL TRANSPORTATION JAVASCRIPT - Premium Animations & Interactive Features

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Initializing Ultra-Cool Transportation System...');
    
    initializePremiumAnimations();
    initializeAdvancedTrafficAnalytics();
    initializeInteractiveRoutePlanner();
    initializePremiumTransportModes();
    initializeWildlifeCrossings();
    initializeImpactMetrics();
    initializeParticleSystem();
    initializePremiumEffects();
    startRealTimeMonitoring();
    
    console.log('✅ Ultra-Cool Transportation System Ready!');
});

// 🎨 PREMIUM ANIMATIONS
function initializePremiumAnimations() {
    // Hero text animations
    animateHeroText();
    
    // Floating animations for cards
    initializeFloatingCards();
    
    // Neon glow effects
    initializeNeonEffects();
    
    // Advanced hover effects
    initializePremiumHovers();
}

function animateHeroText() {
    const title = document.querySelector('.transportation-hero-title');
    const subtitle = document.querySelector('.transportation-hero-subtitle');
    const badge = document.querySelector('.transportation-badge');
    
    if (title) {
        title.style.opacity = '0';
        title.style.transform = 'translateY(50px) scale(0.9)';
        
        setTimeout(() => {
            title.style.transition = 'all 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            title.style.opacity = '1';
            title.style.transform = 'translateY(0) scale(1)';
        }, 300);
    }
    
    if (subtitle) {
        subtitle.style.opacity = '0';
        subtitle.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            subtitle.style.transition = 'all 1.2s ease 0.3s';
            subtitle.style.opacity = '1';
            subtitle.style.transform = 'translateY(0)';
        }, 600);
    }
    
    if (badge) {
        badge.style.opacity = '0';
        badge.style.transform = 'scale(0)';
        
        setTimeout(() => {
            badge.style.transition = 'all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.6s';
            badge.style.opacity = '1';
            badge.style.transform = 'scale(1)';
        }, 900);
    }
}

function initializeFloatingCards() {
    const cards = document.querySelectorAll('.analytics-card, .mode-card, .crossing-item, .metric-card');
    
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px) rotateX(-10deg)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) rotateX(0)';
        }, index * 150 + 1000);
        
        // Add continuous floating animation
        card.style.animation = `card-float-${index % 3} 6s infinite ease-in-out`;
        card.style.animationDelay = `${index * 0.5}s`;
    });
    
    // Create floating animations
    const floatKeyframes = `
        @keyframes card-float-0 {
            0%, 100% { transform: translateY(0) rotateX(0); }
            50% { transform: translateY(-10px) rotateX(2deg); }
        }
        @keyframes card-float-1 {
            0%, 100% { transform: translateY(0) rotateX(0); }
            50% { transform: translateY(-15px) rotateX(-1deg); }
        }
        @keyframes card-float-2 {
            0%, 100% { transform: translateY(0) rotateX(0); }
            50% { transform: translateY(-8px) rotateX(1deg); }
        }
    `;
    
    const style = document.createElement('style');
    style.textContent = floatKeyframes;
    document.head.appendChild(style);
}

function initializeNeonEffects() {
    // Add neon glow to interactive elements
    const neonElements = document.querySelectorAll('.route-option input[type="radio"]:checked + label, .mode-item:hover, .crossing-item:hover');
    
    neonElements.forEach(element => {
        element.classList.add('neon-active');
    });
    
    // Create neon glow CSS
    const neonCSS = `
        .neon-active {
            box-shadow: 
                0 0 10px var(--glow-primary),
                0 0 20px var(--glow-primary),
                0 0 30px var(--glow-primary),
                inset 0 0 10px rgba(255, 255, 255, 0.1);
            animation: neon-pulse 2s infinite;
        }
        
        @keyframes neon-pulse {
            0%, 100% { box-shadow: 0 0 10px var(--glow-primary), 0 0 20px var(--glow-primary), 0 0 30px var(--glow-primary); }
            50% { box-shadow: 0 0 20px var(--glow-primary), 0 0 40px var(--glow-primary), 0 0 60px var(--glow-primary); }
        }
    `;
    
    const style = document.createElement('style');
    style.textContent = neonCSS;
    document.head.appendChild(style);
}

function initializePremiumHovers() {
    // Advanced hover effects with parallax
    const hoverElements = document.querySelectorAll('.analytics-card, .mode-card, .crossing-item, .metric-card');
    
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-20px) rotateX(-10deg) scale(1.03)';
            this.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            
            // Add ripple effect
            createRippleEffect(this, event);
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateX(0) scale(1)';
        });
        
        // Add tilt effect based on mouse position
        element.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `translateY(-20px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
        });
    });
}

function createRippleEffect(element, event) {
    const ripple = document.createElement('div');
    ripple.className = 'premium-ripple';
    
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: radial-gradient(circle, rgba(255, 255, 255, 0.6) 0%, transparent 70%);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple-premium 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        pointer-events: none;
        z-index: 1000;
    `;
    
    element.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 800);
}

// 📊 ADVANCED TRAFFIC ANALYTICS
function initializeAdvancedTrafficAnalytics() {
    // Premium traffic flow chart
    const flowChart = document.getElementById('trafficFlowChart');
    if (flowChart) {
        createPremiumTrafficFlowChart(flowChart);
    }
    
    // Real-time data updates with smooth transitions
    startPremiumTrafficUpdates();
    
    // Add click effects with sound simulation
    const analyticsCards = document.querySelectorAll('.analytics-card');
    analyticsCards.forEach(card => {
        card.addEventListener('click', function() {
            createPremiumClickEffect(this);
            showPremiumAnalyticsDetails(this);
        });
    });
}

function createPremiumTrafficFlowChart(canvas) {
    const ctx = canvas.getContext('2d');
    
    // Set canvas size for retina displays
    const dpr = window.devicePixelRatio || 1;
    canvas.width = 300 * dpr;
    canvas.height = 150 * dpr;
    ctx.scale(dpr, dpr);
    
    // Create premium gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, 150);
    gradient.addColorStop(0, '#667eea');
    gradient.addColorStop(1, 'rgba(102, 126, 234, 0.1)');
    
    // Generate smooth traffic data
    const data = generatePremiumTrafficData();
    
    // Draw premium chart
    drawPremiumAreaChart(ctx, data, gradient);
    drawPremiumLineChart(ctx, data, '#667eea');
    
    // Add glow effect
    addChartGlow(ctx, canvas);
    
    // Update with premium animations
    setInterval(() => {
        updatePremiumTrafficFlowChart(canvas);
    }, 4000);
}

function generatePremiumTrafficData() {
    const data = [];
    const baseFlow = 2000;
    
    for (let i = 0; i < 30; i++) {
        const hour = i / 3;
        const flow = baseFlow + 
                    Math.sin(hour * Math.PI / 8) * 800 + 
                    Math.cos(hour * Math.PI / 4) * 200 +
                    Math.random() * 100;
        data.push(Math.max(800, flow));
    }
    
    return data;
}

function drawPremiumAreaChart(ctx, data, gradient) {
    const padding = 20;
    const chartWidth = 300 - padding * 2;
    const chartHeight = 150 - padding * 2;
    
    ctx.beginPath();
    ctx.moveTo(padding, 150 - padding);
    
    data.forEach((value, index) => {
        const x = padding + (index / (data.length - 1)) * chartWidth;
        const y = padding + (1 - value / 3000) * chartHeight;
        ctx.lineTo(x, y);
    });
    
    ctx.lineTo(300 - padding, 150 - padding);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();
}

function drawPremiumLineChart(ctx, data, color) {
    const padding = 20;
    const chartWidth = 300 - padding * 2;
    const chartHeight = 150 - padding * 2;
    
    ctx.beginPath();
    data.forEach((value, index) => {
        const x = padding + (index / (data.length - 1)) * chartWidth;
        const y = padding + (1 - value / 3000) * chartHeight;
        
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            // Smooth curves
            const prevX = padding + ((index - 1) / (data.length - 1)) * chartWidth;
            const prevY = padding + (1 - data[index - 1] / 3000) * chartHeight;
            const cpx = (prevX + x) / 2;
            const cpy = (prevY + y) / 2;
            ctx.quadraticCurveTo(cpx, cpy, x, y);
        }
    });
    
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
}

function addChartGlow(ctx, canvas) {
    // Add outer glow
    ctx.shadowColor = 'rgba(102, 126, 234, 0.5)';
    ctx.shadowBlur = 20;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
}

function updatePremiumTrafficFlowChart(canvas) {
    const ctx = canvas.getContext('2d');
    const data = generatePremiumTrafficData();
    
    // Smooth animation
    let frame = 0;
    const totalFrames = 30;
    
    function animate() {
        frame++;
        const progress = frame / totalFrames;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Animate data transition
        const currentData = data.map(value => value * progress);
        
        // Recreate gradient for animation
        const gradient = ctx.createLinearGradient(0, 0, 0, 150);
        gradient.addColorStop(0, '#667eea');
        gradient.addColorStop(1, 'rgba(102, 126, 234, 0.1)');
        
        drawPremiumAreaChart(ctx, currentData, gradient);
        drawPremiumLineChart(ctx, currentData, '#667eea');
        addChartGlow(ctx, canvas);
        
        if (frame < totalFrames) {
            requestAnimationFrame(animate);
        }
    }
    animate();
}

function startPremiumTrafficUpdates() {
    // Smooth metric updates with easing
    setInterval(() => {
        updatePremiumTrafficMetrics();
    }, 3000);
}

function updatePremiumTrafficMetrics() {
    // Update flow with smooth transition
    const flowValue = document.querySelector('.flow-value');
    if (flowValue) {
        const currentFlow = parseInt(flowValue.textContent.replace(',', ''));
        const targetFlow = currentFlow + (Math.random() - 0.5) * 400;
        animateValue(flowValue, currentFlow, Math.max(1000, Math.round(targetFlow)), 1500);
    }
    
    // Update speed with easing
    const speedValue = document.querySelector('.speed-value');
    if (speedValue) {
        const currentSpeed = parseInt(speedValue.textContent);
        const targetSpeed = currentSpeed + (Math.random() - 0.5) * 10;
        animateValue(speedValue, currentSpeed, Math.max(20, Math.min(80, Math.round(targetSpeed))), 1200);
    }
    
    // Update congestion smoothly
    const congestionFill = document.querySelector('.congestion-fill');
    if (congestionFill) {
        const currentWidth = parseInt(congestionFill.style.width);
        const targetWidth = currentWidth + (Math.random() - 0.5) * 20;
        animateValue(congestionFill, currentWidth, Math.max(20, Math.min(90, Math.round(targetWidth))), 1000, '%', 'width');
    }
}

function animateValue(element, start, end, duration, suffix = '', property = 'textContent') {
    const range = end - start;
    const startTime = performance.now();
    
    function animate(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (easeOutCubic)
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        
        const current = start + (range * easeProgress);
        
        if (property === 'textContent') {
            element.textContent = Math.round(current) + suffix;
        } else if (property === 'width') {
            element.style.width = Math.round(current) + suffix;
        }
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }
    
    requestAnimationFrame(animate);
}

function createPremiumClickEffect(element) {
    // Create multiple ripple effects
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            const ripple = document.createElement('div');
            ripple.className = 'premium-click-ripple';
            
            const rect = element.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height) * 1.5;
            const x = Math.random() * rect.width - size / 2;
            const y = Math.random() * rect.height - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: radial-gradient(circle, rgba(102, 126, 234, 0.6) 0%, transparent 70%);
                border-radius: 50%;
                transform: scale(0);
                animation: premium-click-ripple 1s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                pointer-events: none;
                z-index: 1000;
            `;
            
            element.appendChild(ripple);
            setTimeout(() => ripple.remove(), 1000);
        }, i * 100);
    }
}

function showPremiumAnalyticsDetails(card) {
    const cardType = card.classList[1];
    const details = {
        flow: '📈 Real-time traffic flow analysis with predictive algorithms',
        speed: '⚡ Advanced speed monitoring with safety optimization',
        congestion: '🚦 Smart congestion detection with alternative routing',
        emissions: '🌱 Premium emission tracking for environmental goals'
    };
    
    showPremiumNotification(details[cardType] || 'Premium analytics data', 'info');
}

// 🗺️ INTERACTIVE ROUTE PLANNER
function initializeInteractiveRoutePlanner() {
    const routeOptions = document.querySelectorAll('input[name="route"]');
    
    routeOptions.forEach(option => {
        option.addEventListener('change', function() {
            updatePremiumRoute(this.value);
        });
    });
    
    // Premium route point interactions
    const routePoints = document.querySelectorAll('.route-point');
    routePoints.forEach(point => {
        point.addEventListener('click', function() {
            createPointClickEffect(this);
            showPremiumRoutePointDetails(this);
        });
        
        // Add magnetic hover effect
        point.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2) translateY(-5px)';
            this.style.boxShadow = '0 15px 35px rgba(66, 153, 225, 0.6)';
        });
        
        point.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) translateY(0)';
            this.style.boxShadow = '';
        });
    });
    
    // Wildlife corridor premium interaction
    const wildlifeCorridor = document.getElementById('wildlifeCorridor');
    if (wildlifeCorridor) {
        wildlifeCorridor.addEventListener('click', function() {
            createWildlifeEffect(this);
            showPremiumWildlifeCorridorInfo();
        });
    }
}

function updatePremiumRoute(routeType) {
    const routeLine = document.getElementById('routeLine');
    const routeStats = document.querySelector('.route-stats');
    
    // Premium route configurations with animations
    const routes = {
        fastest: {
            distance: '15.2 km',
            co2: '2.3 kg',
            impact: 'Moderate',
            time: '25 min',
            color: '#e74c3c',
            animation: 'fastest-route 2s ease'
        },
        eco: {
            distance: '18.5 km',
            co2: '1.8 kg',
            impact: 'Minimal',
            time: '32 min',
            color: '#27ae60',
            animation: 'eco-route 2s ease'
        },
        scenic: {
            distance: '22.1 km',
            co2: '2.0 kg',
            impact: 'Very Low',
            time: '40 min',
            color: '#f39c12',
            animation: 'scenic-route 2s ease'
        }
    };
    
    const selectedRoute = routes[routeType];
    
    // Animate route line
    if (routeLine) {
        routeLine.style.background = `linear-gradient(90deg, ${selectedRoute.color}, #27ae60, ${selectedRoute.color})`;
        routeLine.style.animation = selectedRoute.animation;
    }
    
    // Animate stats update
    animateStatsUpdate(routeStats, selectedRoute);
    
    // Premium notification
    showPremiumNotification(`🌟 Premium route: ${routeType} selected (${selectedRoute.time})`, 'success');
}

function animateStatsUpdate(statsContainer, routeData) {
    const statItems = statsContainer.querySelectorAll('.stat-item');
    
    statItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
            
            // Update content with animation
            const icon = item.querySelector('i');
            const text = item.querySelector('span');
            
            if (index === 0) text.textContent = `Distance: ${routeData.distance}`;
            if (index === 1) text.textContent = `CO₂ Saved: ${routeData.co2}`;
            if (index === 2) text.textContent = `Wildlife Impact: ${routeData.impact}`;
            
        }, index * 200);
    });
}

function createPointClickEffect(point) {
    // Create explosion effect
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.className = 'point-particle';
        
        const angle = (i / 8) * Math.PI * 2;
        const distance = 50;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        
        particle.style.cssText = `
            position: absolute;
            width: 6px;
            height: 6px;
            background: var(--accent-color);
            border-radius: 50%;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            animation: point-explosion 1s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            pointer-events: none;
            z-index: 1000;
        `;
        
        particle.style.setProperty('--end-x', `${x}px`);
        particle.style.setProperty('--end-y', `${y}px`);
        
        point.appendChild(particle);
        setTimeout(() => particle.remove(), 1000);
    }
}

function showPremiumRoutePointDetails(point) {
    const pointType = point.classList.contains('start') ? 'start' : 'end';
    const details = {
        start: '🚀 Premium starting point: Advanced transit hub with multi-modal connectivity',
        end: '🏁 Premium destination: Eco-conservation zone with sustainable facilities'
    };
    
    showPremiumNotification(details[pointType], 'info');
}

function createWildlifeEffect(corridor) {
    // Create wildlife particles
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.className = 'wildlife-particle';
            particle.innerHTML = '🦌';
            particle.style.cssText = `
                position: absolute;
                font-size: 1.5rem;
                animation: wildlife-cross 3s ease-in-out;
                pointer-events: none;
                z-index: 1000;
            `;
            
            particle.style.left = Math.random() * 80 + 10 + '%';
            particle.style.top = Math.random() * 80 + 10 + '%';
            
            corridor.appendChild(particle);
            setTimeout(() => particle.remove(), 3000);
        }, i * 200);
    }
}

function showPremiumWildlifeCorridorInfo() {
    showPremiumNotification('🌿 Premium wildlife corridor: Advanced eco-passage with smart monitoring systems', 'success');
}

// 🚴 PREMIUM TRANSPORT MODES
function initializePremiumTransportModes() {
    const modeCards = document.querySelectorAll('.mode-card');
    
    modeCards.forEach(card => {
        card.addEventListener('click', function() {
            const modeType = this.classList[1];
            highlightPremiumMode(modeType);
            showPremiumModeDetails(modeType);
        });
        
        // Premium hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-20px) rotateX(-10deg) scale(1.03)';
            this.style.boxShadow = '0 30px 60px rgba(0, 0, 0, 0.4)';
            
            // Add particle effect
            createModeParticleEffect(this);
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateX(0) scale(1)';
            this.style.boxShadow = '';
        });
    });
    
    // Animate impact scores with premium effects
    animatePremiumImpactScores();
}

function highlightPremiumMode(modeType) {
    const modes = document.querySelectorAll('.mode-card');
    
    modes.forEach(mode => {
        mode.style.opacity = '0.7';
        mode.style.transform = 'scale(0.95)';
        mode.style.filter = 'grayscale(0.5)';
    });
    
    const selectedMode = document.querySelector(`.mode-card.${modeType}`);
    if (selectedMode) {
        selectedMode.style.opacity = '1';
        selectedMode.style.transform = 'scale(1.1)';
        selectedMode.style.filter = 'grayscale(0)';
        selectedMode.style.boxShadow = '0 35px 70px rgba(0, 0, 0, 0.5)';
        
        // Add special effect
        createModeSpecialEffect(selectedMode);
    }
    
    setTimeout(() => {
        modes.forEach(mode => {
            mode.style.opacity = '';
            mode.style.transform = '';
            mode.style.filter = '';
            mode.style.boxShadow = '';
        });
    }, 3000);
}

function createModeParticleEffect(card) {
    // Create floating particles around the card
    for (let i = 0; i < 10; i++) {
        const particle = document.createElement('div');
        particle.className = 'mode-particle';
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: var(--accent-color);
            border-radius: 50%;
            animation: mode-particle-float 3s infinite;
            pointer-events: none;
            z-index: 1000;
        `;
        
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 3 + 's';
        
        card.appendChild(particle);
        
        // Remove particles after animation
        setTimeout(() => particle.remove(), 3000);
    }
}

function createModeSpecialEffect(card) {
    // Create special glow effect
    card.classList.add('mode-special-glow');
    
    const glowCSS = `
        .mode-special-glow {
            box-shadow: 
                0 0 30px var(--glow-primary),
                0 0 60px var(--glow-primary),
                0 0 90px var(--glow-primary),
                inset 0 0 20px rgba(255, 255, 255, 0.1);
            animation: mode-special-pulse 2s infinite;
        }
        
        @keyframes mode-special-pulse {
            0%, 100% { 
                box-shadow: 
                    0 0 30px var(--glow-primary),
                    0 0 60px var(--glow-primary),
                    inset 0 0 20px rgba(255, 255, 255, 0.1);
            }
            50% { 
                box-shadow: 
                    0 0 50px var(--glow-primary),
                    0 0 100px var(--glow-primary),
                    inset 0 0 30px rgba(255, 255, 255, 0.2);
            }
        }
    `;
    
    const style = document.createElement('style');
    style.textContent = glowCSS;
    document.head.appendChild(style);
    
    // Remove after animation
    setTimeout(() => {
        card.classList.remove('mode-special-glow');
    }, 2000);
}

function showPremiumModeDetails(modeType) {
    const details = {
        pedestrian: '🚶 Premium pedestrian infrastructure with smart crossings and wildlife detection',
        cycling: '🚴 Premium cycling network with solar-powered smart lanes',
        public: '🚌 Premium electric transit with AI optimization and real-time tracking',
        electric: '⚡ Premium charging infrastructure with renewable energy integration'
    };
    
    showPremiumNotification(details[modeType] || 'Premium transport mode', 'success');
}

function animatePremiumImpactScores() {
    const scoreValues = document.querySelectorAll('.score-value');
    
    scoreValues.forEach((score, index) => {
        const finalValue = parseInt(score.textContent);
        
        // Create dramatic entrance
        score.style.opacity = '0';
        score.style.transform = 'scale(0) rotate(180deg)';
        
        setTimeout(() => {
            score.style.transition = 'all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            score.style.opacity = '1';
            score.style.transform = 'scale(1) rotate(0deg)';
            
            // Add glow effect during animation
            score.style.textShadow = '0 0 20px currentColor';
            
            // Animate counting with premium effect
            animateValue(score, 0, finalValue, 2000, '%');
            
            // Remove glow after animation
            setTimeout(() => {
                score.style.textShadow = '';
            }, 2000);
        }, index * 300 + 1500);
    });
}

// 🦌 WILDLIFE CROSSINGS - Premium Features
function initializeWildlifeCrossings() {
    const crossingItems = document.querySelectorAll('.crossing-item');
    
    crossingItems.forEach(item => {
        item.addEventListener('click', function() {
            const crossingType = this.classList[1];
            createCrossingSpecialEffect(this, crossingType);
            showPremiumCrossingDetails(crossingType);
        });
        
        // Premium hover with sound simulation
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
            this.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.4)';
            
            // Create wildlife sound effect (visual)
            createWildlifeSoundEffect(this);
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        });
    });
    
    // Premium crossing stats animation
    animatePremiumCrossingStats();
}

function createCrossingSpecialEffect(item, type) {
    // Type-specific effects
    const effects = {
        bridge: 'bridge-effect',
        tunnel: 'tunnel-effect',
        fence: 'fence-effect'
    };
    
    item.classList.add(effects[type]);
    
    const effectCSS = `
        .bridge-effect {
            animation: bridge-build 2s ease;
        }
        
        @keyframes bridge-build {
            0% { transform: scale(0.8) rotateX(90deg); }
            50% { transform: scale(1.1) rotateX(-10deg); }
            100% { transform: scale(1) rotateX(0deg); }
        }
        
        .tunnel-effect {
            animation: tunnel-dig 2s ease;
        }
        
        @keyframes tunnel-dig {
            0% { transform: scaleX(0); }
            50% { transform: scaleX(1.2); }
            100% { transform: scaleX(1); }
        }
        
        .fence-effect {
            animation: fence-build 2s ease;
        }
        
        @keyframes fence-build {
            0% { transform: scaleY(0); }
            50% { transform: scaleY(1.2); }
            100% { transform: scaleY(1); }
        }
    `;
    
    const style = document.createElement('style');
    style.textContent = effectCSS;
    document.head.appendChild(style);
    
    // Remove after animation
    setTimeout(() => {
        item.classList.remove(effects[type]);
    }, 2000);
}

function createWildlifeSoundEffect(item) {
    // Create visual sound waves
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            const wave = document.createElement('div');
            wave.className = 'sound-wave';
            wave.innerHTML = '♪';
            wave.style.cssText = `
                position: absolute;
                font-size: 1rem;
                color: #27ae60;
                animation: sound-wave-float 2s ease-out;
                pointer-events: none;
                z-index: 1000;
            `;
            
            wave.style.left = Math.random() * 80 + 10 + '%';
            wave.style.top = Math.random() * 80 + 10 + '%';
            
            item.appendChild(wave);
            setTimeout(() => wave.remove(), 2000);
        }, i * 300);
    }
}

function showPremiumCrossingDetails(crossingType) {
    const details = {
        bridge: '🌉 Premium eco-bridge with smart wildlife detection and monitoring',
        tunnel: '🚇 Premium wildlife tunnel with climate control and safety systems',
        fence: '🚧 Premium guiding fence with reflective technology and durability'
    };
    
    showPremiumNotification(details[crossingType] || 'Premium wildlife crossing', 'success');
}

function animatePremiumCrossingStats() {
    const statNumbers = document.querySelectorAll('.crossing-stats .stat-number');
    
    statNumbers.forEach((stat, index) => {
        const finalValue = stat.textContent;
        const numericValue = parseInt(finalValue.replace(/[^0-9]/g, ''));
        
        if (!isNaN(numericValue)) {
            // Premium entrance animation
            stat.style.opacity = '0';
            stat.style.transform = 'scale(0) rotate(-180deg)';
            
            setTimeout(() => {
                stat.style.transition = 'all 1s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                stat.style.opacity = '1';
                stat.style.transform = 'scale(1) rotate(0deg)';
                
                // Add bounce effect
                setTimeout(() => {
                    stat.style.transform = 'scale(1.2)';
                    setTimeout(() => {
                        stat.style.transform = 'scale(1)';
                    }, 200);
                }, 800);
                
                animateValue(stat, 0, numericValue, 1500);
            }, index * 200 + 1000);
        }
    });
}

// 📊 IMPACT METRICS - Premium Visualization
function initializeImpactMetrics() {
    const metricCards = document.querySelectorAll('.metric-card');
    
    metricCards.forEach(card => {
        card.addEventListener('click', function() {
            const metricType = this.classList[1];
            createMetricSpecialEffect(this, metricType);
            showPremiumImpactDetails(metricType);
        });
        
        // Premium hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.03)';
            this.style.boxShadow = '0 30px 60px rgba(0, 0, 0, 0.4)';
            
            // Create metric glow effect
            createMetricGlowEffect(this);
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        });
    });
    
    // Premium metric values animation
    animatePremiumMetricValues();
}

function createMetricSpecialEffect(card, type) {
    // Create type-specific effects
    const colors = {
        emissions: '#27ae60',
        noise: '#f39c12',
        safety: '#e74c3c',
        efficiency: '#3498db'
    };
    
    const color = colors[type];
    
    // Create explosion of particles
    for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        particle.className = 'metric-particle';
        particle.style.cssText = `
            position: absolute;
            width: 6px;
            height: 6px;
            background: ${color};
            border-radius: 50%;
            animation: metric-explosion 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            pointer-events: none;
            z-index: 1000;
        `;
        
        const angle = (i / 12) * Math.PI * 2;
        const distance = 80;
        particle.style.setProperty('--angle', angle + 'rad');
        particle.style.setProperty('--distance', distance + 'px');
        
        card.appendChild(particle);
        setTimeout(() => particle.remove(), 1500);
    }
}

function createMetricGlowEffect(card) {
    const colors = {
        emissions: 'rgba(39, 174, 96, 0.6)',
        noise: 'rgba(243, 156, 18, 0.6)',
        safety: 'rgba(231, 76, 60, 0.6)',
        efficiency: 'rgba(52, 152, 219, 0.6)'
    };
    
    const type = card.classList[1];
    const color = colors[type];
    
    card.style.boxShadow = `
        0 0 30px ${color},
        0 0 60px ${color},
        0 30px 60px rgba(0, 0, 0, 0.4)
    `;
}

function showPremiumImpactDetails(metricType) {
    const details = {
        emissions: '🌟 Premium emission reduction: Advanced monitoring shows 35% CO₂ reduction',
        noise: '🔊 Premium noise reduction: Smart traffic management reduced noise by 28%',
        safety: '🛡️ Premium safety improvement: Wildlife protection systems reduced accidents by 90%',
        efficiency: '⚡ Premium efficiency boost: AI-powered optimization improved efficiency by 25%'
    };
    
    showPremiumNotification(details[metricType] || 'Premium impact metrics', 'success');
}

function animatePremiumMetricValues() {
    const metricValues = document.querySelectorAll('.metric-value');
    
    metricValues.forEach((value, index) => {
        const finalValue = value.textContent;
        const numericValue = parseInt(finalValue.replace(/[^0-9]/g, ''));
        
        // Premium entrance with rotation
        value.style.opacity = '0';
        value.style.transform = 'scale(0) rotateY(180deg)';
        
        setTimeout(() => {
            value.style.transition = 'all 1.2s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            value.style.opacity = '1';
            value.style.transform = 'scale(1) rotateY(0deg)';
            
            // Add color-specific glow
            const type = value.closest('.metric-card').classList[1];
            const colors = {
                emissions: 'rgba(39, 174, 96, 0.8)',
                noise: 'rgba(243, 156, 18, 0.8)',
                safety: 'rgba(231, 76, 60, 0.8)',
                efficiency: 'rgba(52, 152, 219, 0.8)'
            };
            
            value.style.textShadow = `0 0 30px ${colors[type]}`;
            
            // Animate number counting
            if (!isNaN(numericValue)) {
                animateValue(value, 0, numericValue, 2000, '%');
            }
            
            // Remove glow after animation
            setTimeout(() => {
                value.style.textShadow = '';
            }, 2000);
        }, index * 300 + 1500);
    });
}

// ✨ PARTICLE SYSTEM - Premium Effects
function initializeParticleSystem() {
    // Create floating particles in hero section
    createHeroParticles();
    
    // Create interactive particles
    createInteractiveParticles();
}

function createHeroParticles() {
    const hero = document.querySelector('.transportation-hero');
    if (!hero) return;
    
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'hero-particle';
        particle.style.cssText = `
            position: absolute;
            width: 3px;
            height: 3px;
            background: rgba(102, 126, 234, 0.8);
            border-radius: 50%;
            animation: hero-particle-float ${15 + Math.random() * 10}s infinite linear;
            pointer-events: none;
            z-index: 1;
        `;
        
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        
        hero.appendChild(particle);
    }
}

function createInteractiveParticles() {
    // Add mouse-following particles
    document.addEventListener('mousemove', function(e) {
        if (Math.random() < 0.1) { // 10% chance to create particle
            createMouseParticle(e.clientX, e.clientY);
        }
    });
}

function createMouseParticle(x, y) {
    const particle = document.createElement('div');
    particle.className = 'mouse-particle';
    particle.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: radial-gradient(circle, rgba(245, 87, 108, 0.8), transparent);
        border-radius: 50%;
        left: ${x}px;
        top: ${y}px;
        animation: mouse-particle-fade 2s ease-out;
        pointer-events: none;
        z-index: 9999;
    `;
    
    document.body.appendChild(particle);
    setTimeout(() => particle.remove(), 2000);
}

// 🎆 PREMIUM EFFECTS
function initializePremiumEffects() {
    // Add premium CSS effects
    addPremiumCSS();
    
    // Initialize sound effects (visual)
    initializeVisualSoundEffects();
    
    // Add premium scroll effects
    initializePremiumScrollEffects();
}

function addPremiumCSS() {
    const premiumCSS = `
        @keyframes hero-particle-float {
            0% { transform: translateY(100vh) translateX(0) scale(0); opacity: 0; }
            10% { opacity: 1; transform: scale(1); }
            90% { opacity: 1; }
            100% { transform: translateY(-100vh) translateX(50px) scale(0); opacity: 0; }
        }
        
        @keyframes mouse-particle-fade {
            0% { opacity: 1; transform: scale(1); }
            100% { opacity: 0; transform: scale(0) translateY(-50px); }
        }
        
        @keyframes point-explosion {
            0% { 
                transform: translate(-50%, -50%) scale(0);
                opacity: 1;
            }
            100% { 
                transform: translate(calc(-50% + var(--end-x)), calc(-50% + var(--end-y))) scale(1);
                opacity: 0;
            }
        }
        
        @keyframes mode-particle-float {
            0% { 
                transform: translate(0, 0) scale(1);
                opacity: 1;
            }
            100% { 
                transform: translate(50px, -100px) scale(0);
                opacity: 0;
            }
        }
        
        @keyframes metric-explosion {
            0% { 
                transform: translate(-50%, -50%) scale(0) rotate(0deg);
                opacity: 1;
            }
            100% { 
                transform: translate(calc(-50% + cos(var(--angle)) * var(--distance)), calc(-50% + sin(var(--angle)) * var(--distance))) scale(1) rotate(360deg);
                opacity: 0;
            }
        }
        
        @keyframes wildlife-cross {
            0% { 
                transform: translateX(-50px) scale(0);
                opacity: 0;
            }
            50% { 
                transform: translateX(0) scale(1);
                opacity: 1;
            }
            100% { 
                transform: translateX(50px) scale(0);
                opacity: 0;
            }
        }
        
        @keyframes sound-wave-float {
            0% { 
                transform: translateY(0) scale(1);
                opacity: 1;
            }
            100% { 
                transform: translateY(-100px) scale(0);
                opacity: 0;
            }
        }
        
        @keyframes fastest-route {
            0% { transform: scaleX(0); }
            100% { transform: scaleX(1); }
        }
        
        @keyframes eco-route {
            0% { transform: scale(0) rotate(180deg); }
            100% { transform: scale(1) rotate(0deg); }
        }
        
        @keyframes scenic-route {
            0% { transform: translateY(-20px) scale(0.8); }
            100% { transform: translateY(0) scale(1); }
        }
        
        .premium-click-ripple {
            animation: premium-click-ripple 1s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        
        @keyframes premium-click-ripple {
            0% { 
                transform: translate(-50%, -50%) scale(0);
                opacity: 1;
            }
            100% { 
                transform: translate(-50%, -50%) scale(4);
                opacity: 0;
            }
        }
    `;
    
    const style = document.createElement('style');
    style.textContent = premiumCSS;
    document.head.appendChild(style);
}

function initializeVisualSoundEffects() {
    // Create visual feedback for interactions
    const soundElements = document.querySelectorAll('.mode-card, .crossing-item, .metric-card');
    
    soundElements.forEach(element => {
        element.addEventListener('click', function() {
            createVisualSoundWave(this);
        });
    });
}

function createVisualSoundWave(element) {
    const wave = document.createElement('div');
    wave.className = 'sound-visual-wave';
    wave.innerHTML = '♪';
    wave.style.cssText = `
        position: absolute;
        font-size: 1.5rem;
        color: var(--accent-color);
        animation: sound-wave-float 1.5s ease-out;
        pointer-events: none;
        z-index: 1000;
    `;
    
    const rect = element.getBoundingClientRect();
    wave.style.left = '50%';
    wave.style.top = '20%';
    wave.style.transform = 'translateX(-50%)';
    
    element.appendChild(wave);
    setTimeout(() => wave.remove(), 1500);
}

function initializePremiumScrollEffects() {
    // Parallax scrolling for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        // Parallax for background elements
        const heroElements = document.querySelectorAll('.route-highway, .futuristic-vehicle');
        heroElements.forEach(element => {
            element.style.transform = `translateY(${rate}px)`;
        });
        
        // Fade in elements on scroll
        const fadeElements = document.querySelectorAll('.analytics-card, .mode-card, .crossing-item, .metric-card');
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    });
}

// 📡 REAL-TIME MONITORING - Premium Updates
function startRealTimeMonitoring() {
    // Premium real-time updates with smart timing
    setInterval(() => {
        simulatePremiumTransportationUpdates();
    }, 5000);
    
    // Initialize premium notifications
    initializePremiumNotifications();
}

function simulatePremiumTransportationUpdates() {
    const premiumEvents = [
        { type: 'success', message: '🌟 Premium eco-route saved 3.2kg CO₂ today', priority: 'high' },
        { type: 'info', message: '🚀 AI traffic optimization: 25% efficiency improvement', priority: 'medium' },
        { type: 'success', message: '🦌 Premium wildlife crossing: 18 animals safely crossed', priority: 'high' },
        { type: 'info', message: '⚡ Premium charging network: 98% uptime maintained', priority: 'low' },
        { type: 'warning', message: '🚦 Smart congestion detected: Alternative route suggested', priority: 'medium' },
        { type: 'success', message: '🌍 Premium impact: 35% emission reduction achieved', priority: 'high' }
    ];
    
    const randomEvent = premiumEvents[Math.floor(Math.random() * premiumEvents.length)];
    showPremiumNotification(randomEvent.message, randomEvent.type, randomEvent.priority);
}

function initializePremiumNotifications() {
    // Create notification container
    const container = document.createElement('div');
    container.className = 'premium-notification-container';
    container.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        pointer-events: none;
    `;
    document.body.appendChild(container);
}

function showPremiumNotification(message, type = 'info', priority = 'medium') {
    const colors = {
        success: '#27ae60',
        info: '#3498db',
        warning: '#f39c12',
        error: '#e74c3c'
    };
    
    const notification = document.createElement('div');
    notification.className = 'premium-notification';
    notification.innerHTML = `
        <div class="notification-icon">${type === 'success' ? '✅' : type === 'warning' ? '⚠️' : 'ℹ️'}</div>
        <div class="notification-content">${message}</div>
        <div class="notification-progress"></div>
    `;
    
    notification.style.cssText = `
        position: relative;
        background: linear-gradient(135deg, ${colors[type]}, ${colors[type]}dd);
        color: white;
        padding: 1.5rem 2rem;
        border-radius: 15px;
        margin-bottom: 1rem;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        transform: translateX(100%);
        transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        max-width: 400px;
        position: relative;
        overflow: hidden;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        font-weight: 500;
    `;
    
    // Priority-based styling
    if (priority === 'high') {
        notification.style.borderLeft = '4px solid #fff';
        notification.style.boxShadow += ', 0 0 30px ' + colors[type];
    }
    
    const container = document.querySelector('.premium-notification-container');
    container.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Progress bar animation
    const progress = notification.querySelector('.notification-progress');
    progress.style.cssText = `
        position: absolute;
        bottom: 0;
        left: 0;
        height: 3px;
        background: rgba(255, 255, 255, 0.8);
        width: 100%;
        animation: notification-progress 4s linear;
    `;
    
    // Animate out
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 500);
    }, 4000);
}

// Add progress animation CSS
const progressCSS = `
    @keyframes notification-progress {
        0% { width: 100%; }
        100% { width: 0%; }
    }
`;

const style = document.createElement('style');
style.textContent = progressCSS;
document.head.appendChild(style);

// 🌟 FINAL TOUCHES
document.addEventListener('DOMContentLoaded', function() {
    // Add premium loading effect
    setTimeout(() => {
        document.body.style.opacity = '1';
        document.body.style.transform = 'scale(1)';
    }, 100);
    
    // Add welcome message
    setTimeout(() => {
        showPremiumNotification('🌟 Welcome to Premium Transportation Experience!', 'success', 'high');
    }, 2000);
});

// Export premium functions
window.PremiumTransportation = {
    showPremiumNotification,
    createPremiumClickEffect,
    animateValue,
    createPremiumTrafficFlowChart,
    updatePremiumRoute,
    createModeSpecialEffect,
    createCrossingSpecialEffect,
    createMetricSpecialEffect
};