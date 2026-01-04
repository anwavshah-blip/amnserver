// ==========================================
// Civil Engineering Hub - Particles Configuration
// ==========================================

// Advanced particle systems for different sections
const particlesConfig = {
// Hero Section Particles
hero: {
particles: {
number: { value: 120, density: { enable: true, value_area: 800 } },
color: { value: '#ffffff' },
shape: {
type: ['circle', 'triangle', 'polygon'],
polygon: { nb_sides: 6 }
},
opacity: {
value: 0.6,
random: true,
anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false }
},
size: {
value: 3,
random: true,
anim: { enable: true, speed: 2, size_min: 0.1, sync: false }
},
line_linked: {
enable: true,
distance: 150,
color: '#ffffff',
opacity: 0.4,
width: 1
},
move: {
enable: true,
speed: 1,
direction: 'none',
random: true,
straight: false,
out_mode: 'out',
bounce: false,
attract: { enable: false, rotateX: 600, rotateY: 1200 }
}
},
interactivity: {
detect_on: 'canvas',
events: {
onhover: { enable: true, mode: 'grab' },
onclick: { enable: true, mode: 'push' },
resize: true
},
modes: {
grab: { distance: 140, line_linked: { opacity: 1 } },
bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
repulse: { distance: 200, duration: 0.4 },
push: { particles_nb: 4 },
remove: { particles_nb: 2 }
}
},
retina_detect: true
},

// Research Section Particles
research: {
particles: {
number: { value: 80, density: { enable: true, value_area: 600 } },
color: { value: ['#2563eb', '#1e40af', '#f59e0b'] },
shape: { type: 'circle' },
opacity: { value: 0.5, random: true },
size: { value: 2, random: true },
line_linked: {
enable: true,
distance: 100,
color: '#2563eb',
opacity: 0.3,
width: 1
},
move: {
enable: true,
speed: 0.8,
direction: 'none',
random: true,
straight: false,
out_mode: 'out'
}
},
interactivity: {
detect_on: 'canvas',
events: {
onhover: { enable: true, mode: 'repulse' },
onclick: { enable: true, mode: 'push' },
resize: true
},
modes: {
repulse: { distance: 100, duration: 0.4 },
push: { particles_nb: 3 }
}
}
},

// Geology Section Particles (Earth-themed)
geology: {
particles: {
number: { value: 60, density: { enable: true, value_area: 800 } },
color: { value: ['#8b4513', '#a0522d', '#d2691e', '#cd853f'] },
shape: {
type: ['circle', 'polygon'],
polygon: { nb_sides: 8 }
},
opacity: { value: 0.6, random: true },
size: { value: 4, random: true },
line_linked: {
enable: true,
distance: 120,
color: '#8b4513',
opacity: 0.4,
width: 1
},
move: {
enable: true,
speed: 0.5,
direction: 'none',
random: true,
straight: false,
out_mode: 'out'
}
},
interactivity: {
detect_on: 'canvas',
events: {
onhover: { enable: true, mode: 'bubble' },
onclick: { enable: true, mode: 'repulse' },
resize: true
},
modes: {
bubble: { distance: 200, size: 10, duration: 2, opacity: 0.8 },
repulse: { distance: 150, duration: 0.4 }
}
}
},

// Water Section Particles (Flowing water effect)
water: {
particles: {
number: { value: 100, density: { enable: true, value_area: 700 } },
color: { value: ['#00bfff', '#1e90ff', '#87ceeb'] },
shape: { type: 'circle' },
opacity: {
value: 0.7,
random: true,
anim: { enable: true, speed: 2, opacity_min: 0.1, sync: false }
},
size: {
value: 3,
random: true,
anim: { enable: true, speed: 2, size_min: 0.1, sync: false }
},
line_linked: {
enable: true,
distance: 130,
color: '#00bfff',
opacity: 0.4,
width: 1
},
move: {
enable: true,
speed: 2,
direction: 'bottom',
random: true,
straight: false,
out_mode: 'out'
}
},
interactivity: {
detect_on: 'canvas',
events: {
onhover: { enable: true, mode: 'bubble' },
onclick: { enable: true, mode: 'push' },
resize: true
},
modes: {
bubble: { distance: 150, size: 8, duration: 2, opacity: 0.8 },
push: { particles_nb: 4 }
}
}
},

// Minimal particles for clean sections
minimal: {
particles: {
number: { value: 30, density: { enable: true, value_area: 1000 } },
color: { value: '#cccccc' },
shape: { type: 'circle' },
opacity: { value: 0.3, random: true },
size: { value: 2, random: true },
line_linked: {
enable: false
},
move: {
enable: true,
speed: 0.5,
direction: 'none',
random: true,
straight: false,
out_mode: 'out'
}
},
interactivity: {
detect_on: 'canvas',
events: {
onhover: { enable: false },
onclick: { enable: false },
resize: true
}
}
}
};

// Initialize particles for different sections
function initializeSectionParticles() {
// Hero particles
if (document.getElementById('particles-js')) {
particlesJS('particles-js', particlesConfig.hero);
}

// Research section particles
const researchParticles = document.getElementById('research-particles');
if (researchParticles) {
const canvas = document.createElement('canvas');
canvas.className = 'particles-canvas';
researchParticles.appendChild(canvas);
particlesJS('research-particles', particlesConfig.research);
}

// Geology section particles
const geologyParticles = document.getElementById('geology-particles');
if (geologyParticles) {
particlesJS('geology-particles', particlesConfig.geology);
}

// Water section particles
const waterParticles = document.getElementById('water-particles');
if (waterParticles) {
particlesJS('water-particles', particlesConfig.water);
}

// Minimal particles for other sections
const minimalParticles = document.querySelectorAll('.particles-minimal');
minimalParticles.forEach(container => {
const canvas = document.createElement('canvas');
canvas.className = 'particles-canvas';
container.appendChild(canvas);
particlesJS(container.id, particlesConfig.minimal);
});
}

// Custom particle effects
function createFloatingParticles(container, options = {}) {
const defaults = {
count: 50,
colors: ['#ffffff'],
size: { min: 1, max: 5 },
speed: { min: 0.5, max: 2 },
duration: { min: 10, max: 20 }
};

const config = { ...defaults, ...options };
const particles = [];

for (let i = 0; i < config.count; i++) {
const particle = document.createElement('div');
particle.className = 'floating-particle';
particle.style.cssText = `
position: absolute;
width: ${Math.random() * (config.size.max - config.size.min) + config.size.min}px;
height: ${Math.random() * (config.size.max - config.size.min) + config.size.min}px;
background: ${config.colors[Math.floor(Math.random() * config.colors.length)]};
border-radius: 50%;
opacity: ${Math.random() * 0.5 + 0.3};
pointer-events: none;
z-index: 1;
`;

// Random starting position
particle.style.left = Math.random() * 100 + '%';
particle.style.top = Math.random() * 100 + '%';

container.appendChild(particle);
particles.push(particle);

// Animate particle
animateFloatingParticle(particle, config);
}

return particles;
}

function animateFloatingParticle(particle, config) {
const duration = Math.random() * (config.duration.max - config.duration.min) + config.duration.min;
const delay = Math.random() * 5;

gsap.to(particle, {
x: `+=${(Math.random() - 0.5) * 200}`,
y: `+=${(Math.random() - 0.5) * 200}`,
rotation: Math.random() * 360,
duration: duration,
delay: delay,
ease: 'none',
repeat: -1,
yoyo: true
});
}

// Particle explosion effect
function createParticleExplosion(x, y, container, options = {}) {
const defaults = {
count: 30,
colors: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24'],
size: { min: 2, max: 8 },
speed: { min: 100, max: 300 },
duration: 1.5
};

const config = { ...defaults, ...options };

for (let i = 0; i < config.count; i++) {
const particle = document.createElement('div');
particle.className = 'explosion-particle';
particle.style.cssText = `
position: absolute;
width: ${Math.random() * (config.size.max - config.size.min) + config.size.min}px;
height: ${Math.random() * (config.size.max - config.size.min) + config.size.min}px;
background: ${config.colors[Math.floor(Math.random() * config.colors.length)]};
border-radius: 50%;
pointer-events: none;
z-index: 9999;
left: ${x}px;
top: ${y}px;
`;

container.appendChild(particle);

// Calculate random direction and distance
const angle = (Math.PI * 2 * i) / config.count;
const distance = Math.random() * (config.speed.max - config.speed.min) + config.speed.min;
const endX = x + Math.cos(angle) * distance;
const endY = y + Math.sin(angle) * distance;

// Animate explosion
gsap.to(particle, {
x: endX - x,
y: endY - y,
opacity: 0,
scale: 0,
duration: config.duration,
ease: 'power3.out',
onComplete: () => {
particle.remove();
}
});
}
}

// Interactive particle cursor
function createParticleCursor() {
const cursor = document.createElement('div');
cursor.className = 'particle-cursor';
cursor.style.cssText = `
position: fixed;
width: 20px;
height: 20px;
background: radial-gradient(circle, rgba(37, 99, 235, 0.8) 0%, transparent 70%);
border-radius: 50%;
pointer-events: none;
z-index: 9999;
transition: transform 0.1s ease;
`;
document.body.appendChild(cursor);

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

document.addEventListener('mousemove', (e) => {
mouseX = e.clientX;
mouseY = e.clientY;

// Create trail particles
if (Math.random() > 0.8) {
createTrailParticle(mouseX, mouseY);
}
});

function animateCursor() {
cursorX += (mouseX - cursorX) * 0.1;
cursorY += (mouseY - cursorY) * 0.1;

cursor.style.left = cursorX + 'px';
cursor.style.top = cursorY + 'px';

requestAnimationFrame(animateCursor);
}

animateCursor();
}

function createTrailParticle(x, y) {
const particle = document.createElement('div');
particle.style.cssText = `
position: fixed;
width: 4px;
height: 4px;
background: rgba(37, 99, 235, 0.6);
border-radius: 50%;
pointer-events: none;
z-index: 9998;
left: ${x}px;
top: ${y}px;
`;

document.body.appendChild(particle);

gsap.to(particle, {
opacity: 0,
scale: 0,
duration: 1,
ease: 'power2.out',
onComplete: () => {
particle.remove();
}
});
}

// Particle cleanup function
function cleanupParticles() {
document.querySelectorAll('.floating-particle, .explosion-particle, .trail-particle').forEach(particle => {
particle.remove();
});
}

// Performance optimization for particles
function optimizeParticles() {
// Reduce particle count on mobile devices
if (window.innerWidth < 768) {
Object.keys(particlesConfig).forEach(key => {
if (particlesConfig[key].particles) {
particlesConfig[key].particles.number.value = Math.floor(particlesConfig[key].particles.number.value * 0.5);
}
});
}

// Disable particles on low-end devices
if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
document.querySelectorAll('.particles-canvas').forEach(canvas => {
canvas.style.display = 'none';
});
}
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
initializeSectionParticles();
optimizeParticles();

// Add particle cursor for desktop
if (window.innerWidth > 768 && !matchMedia('(pointer: coarse)').matches) {
createParticleCursor();
}
});

// Cleanup on page unload
window.addEventListener('beforeunload', cleanupParticles);

// Export functions for external use
window.ParticleSystem = {
createFloatingParticles,
createParticleExplosion,
cleanupParticles,
particlesConfig
};