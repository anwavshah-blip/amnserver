// ==========================================
// Civil Engineering Hub - Main JavaScript
// ==========================================

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
// Initialize all components
initLoadingScreen();
initNavigation();
initScrollEffects();
initBackToTop();
initForms();
initInteractiveElements();
initAnimations();
initParticles();
initGeologyMap();
initResearchActions();
});

// Loading Screen
function initLoadingScreen() {
const loadingScreen = document.getElementById('loading-screen');
const loader = document.querySelector('.loader-bar');

// Simulate loading progress
let progress = 0;
const loadingInterval = setInterval(() => {
progress += Math.random() * 15;
if (progress >= 100) {
progress = 100;
clearInterval(loadingInterval);

// Hide loading screen
setTimeout(() => {
loadingScreen.style.opacity = '0';
setTimeout(() => {
loadingScreen.style.display = 'none';
document.body.classList.add('loaded');
}, 500);
}, 500);
}
loader.style.width = progress + '%';
}, 200);
}

// Navigation
function initNavigation() {
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const dropdowns = document.querySelectorAll('.dropdown');

// Mobile menu toggle
hamburger?.addEventListener('click', function() {
hamburger.classList.toggle('active');
navMenu.classList.toggle('active');
document.body.classList.toggle('menu-open');
});

// Close mobile menu when clicking on links
document.querySelectorAll('.nav-link').forEach(link => {
link.addEventListener('click', () => {
hamburger?.classList.remove('active');
navMenu?.classList.remove('active');
document.body.classList.remove('menu-open');
});
});

// Dropdown menu for mobile
dropdowns.forEach(dropdown => {
const link = dropdown.querySelector('.nav-link');
link?.addEventListener('click', function(e) {
if (window.innerWidth <= 991) {
e.preventDefault();
dropdown.classList.toggle('active');
}
});
});

// Navbar scroll effect
let lastScroll = 0;
window.addEventListener('scroll', function() {
const currentScroll = window.pageYOffset;

if (currentScroll > 100) {
navbar.classList.add('scrolled');
if (currentScroll > lastScroll && currentScroll > 200) {
navbar.classList.add('hidden');
} else {
navbar.classList.remove('hidden');
}
} else {
navbar.classList.remove('scrolled', 'hidden');
}

lastScroll = currentScroll;
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
anchor.addEventListener('click', function(e) {
e.preventDefault();
const target = document.querySelector(this.getAttribute('href'));
if (target) {
target.scrollIntoView({
behavior: 'smooth',
block: 'start'
});
}
});
});
}

// Scroll Effects
function initScrollEffects() {
// Scroll progress bar
const scrollProgress = document.createElement('div');
scrollProgress.className = 'scroll-progress';
document.body.appendChild(scrollProgress);

window.addEventListener('scroll', function() {
const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
scrollProgress.style.width = scrolled + '%';
});

// Intersection Observer for animations
const observerOptions = {
threshold: 0.1,
rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
entries.forEach(entry => {
if (entry.isIntersecting) {
entry.target.classList.add('animated');

// Special animations for specific elements
if (entry.target.classList.contains('counter')) {
animateCounter(entry.target);
}

if (entry.target.classList.contains('progress-bar')) {
animateProgressBar(entry.target);
}
}
});
}, observerOptions);

// Observe elements
document.querySelectorAll('.animate-on-scroll, .slide-in-left, .slide-in-right, .fade-in-up, .fade-in-down, .fade-in-left, .fade-in-right, .scale-in, .rotate-in, .bounce-in, .flip-in, .zoom-in, .elastic-in').forEach(el => {
observer.observe(el);
});
}

// Back to Top Button
function initBackToTop() {
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', function() {
if (window.pageYOffset > 300) {
backToTop.classList.add('show');
} else {
backToTop.classList.remove('show');
}
});

backToTop?.addEventListener('click', function() {
window.scrollTo({
top: 0,
behavior: 'smooth'
});
});
}

// Forms
function initForms() {
// Newsletter form
const newsletterForm = document.querySelector('.newsletter-form');
newsletterForm?.addEventListener('submit', function(e) {
e.preventDefault();
const email = this.querySelector('input[type="email"]').value;

// Simulate form submission
const button = this.querySelector('button');
const originalText = button.innerHTML;
button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
button.disabled = true;

setTimeout(() => {
button.innerHTML = '<i class="fas fa-check"></i> Subscribed!';
button.style.background = '#10b981';

setTimeout(() => {
button.innerHTML = originalText;
button.disabled = false;
button.style.background = '';
this.reset();
}, 2000);
}, 1500);
});

// Contact form (if exists)
const contactForm = document.querySelector('.contact-form');
contactForm?.addEventListener('submit', function(e) {
e.preventDefault();

// Get form data
const formData = new FormData(this);
const data = Object.fromEntries(formData);

// Simulate form submission
const submitBtn = this.querySelector('button[type="submit"]');
const originalText = submitBtn.innerHTML;

submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
submitBtn.disabled = true;

setTimeout(() => {
submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
submitBtn.style.background = '#10b981';

setTimeout(() => {
submitBtn.innerHTML = originalText;
submitBtn.disabled = false;
submitBtn.style.background = '';
this.reset();
}, 3000);
}, 2000);
});
}

// Interactive Elements
function initInteractiveElements() {
// Ripple effect for buttons
document.querySelectorAll('.btn').forEach(button => {
button.addEventListener('click', function(e) {
const ripple = document.createElement('span');
const rect = this.getBoundingClientRect();
const size = Math.max(rect.width, rect.height);
const x = e.clientX - rect.left - size / 2;
const y = e.clientY - rect.top - size / 2;

ripple.style.width = ripple.style.height = size + 'px';
ripple.style.left = x + 'px';
ripple.style.top = y + 'px';
ripple.classList.add('ripple-effect');

this.appendChild(ripple);

setTimeout(() => {
ripple.remove();
}, 600);
});
});

// Interactive map points
document.querySelectorAll('.map-point').forEach(point => {
point.addEventListener('click', function() {
// Remove active class from all points
document.querySelectorAll('.map-point').forEach(p => p.classList.remove('active'));
// Add active class to clicked point
this.classList.add('active');

// Get location data
const location = this.dataset.location;
console.log(`Selected location: ${location}`);

// You can add more interactive features here
// like loading detailed information about the location
});
});

// Card hover effects
document.querySelectorAll('.feature-card, .research-card, .project-card, .team-member').forEach(card => {
card.addEventListener('mouseenter', function() {
this.classList.add('hovered');
});

card.addEventListener('mouseleave', function() {
this.classList.remove('hovered');
});
});
}

// Animations
function initAnimations() {
// Counter animation
function animateCounter(element) {
const target = parseInt(element.dataset.target || element.textContent);
const duration = 2000;
const increment = target / (duration / 16);
let current = 0;

const timer = setInterval(() => {
current += increment;
if (current >= target) {
current = target;
clearInterval(timer);
}
element.textContent = Math.floor(current);
}, 16);
}

// Progress bar animation
function animateProgressBar(element) {
const target = element.dataset.progress || element.style.width;
element.style.width = '0%';

setTimeout(() => {
element.style.width = target;
}, 300);
}

// Text typing animation
function typeWriter(element, text, speed = 50) {
let i = 0;
element.textContent = '';

function type() {
if (i < text.length) {
element.textContent += text.charAt(i);
i++;
setTimeout(type, speed);
}
}

type();
}

// Add counters and progress bars to viewport observer
document.querySelectorAll('.counter').forEach(counter => {
const observer = new IntersectionObserver(entries => {
entries.forEach(entry => {
if (entry.isIntersecting) {
animateCounter(entry.target);
observer.unobserve(entry.target);
}
});
});
observer.observe(counter);
});

document.querySelectorAll('.progress-bar').forEach(bar => {
const observer = new IntersectionObserver(entries => {
entries.forEach(entry => {
if (entry.isIntersecting) {
animateProgressBar(entry.target);
observer.unobserve(entry.target);
}
});
});
observer.observe(bar);
});
}

// Particles.js Configuration
function initParticles() {
if (typeof particlesJS !== 'undefined') {
particlesJS('particles-js', {
particles: {
number: { value: 80, density: { enable: true, value_area: 800 } },
color: { value: '#ffffff' },
shape: { type: 'circle' },
opacity: { value: 0.5, random: true },
size: { value: 3, random: true },
line_linked: {
enable: true,
distance: 150,
color: '#ffffff',
opacity: 0.4,
width: 1
},
move: {
enable: true,
speed: 2,
direction: 'none',
random: true,
straight: false,
out_mode: 'out',
bounce: false
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
push: { particles_nb: 4 }
}
},
retina_detect: true
});
}
}

// Geology Map Interactions
function initGeologyMap() {
const mapContainer = document.querySelector('.map-container');
if (!mapContainer) return;

// Add zoom functionality
let scale = 1;
let translateX = 0;
let translateY = 0;

mapContainer.addEventListener('wheel', function(e) {
e.preventDefault();

const delta = e.deltaY > 0 ? 0.9 : 1.1;
const rect = this.getBoundingClientRect();
const x = e.clientX - rect.left;
const y = e.clientY - rect.top;

scale *= delta;
scale = Math.min(Math.max(0.5, scale), 3);

this.style.transform = `scale(${scale}) translate(${translateX}px, ${translateY}px)`;
});

// Add pan functionality
let isDragging = false;
let startX, startY;

mapContainer.addEventListener('mousedown', function(e) {
isDragging = true;
startX = e.clientX - translateX;
startY = e.clientY - translateY;
this.style.cursor = 'grabbing';
});

document.addEventListener('mousemove', function(e) {
if (!isDragging) return;

translateX = e.clientX - startX;
translateY = e.clientY - startY;

mapContainer.style.transform = `scale(${scale}) translate(${translateX}px, ${translateY}px)`;
});

document.addEventListener('mouseup', function() {
isDragging = false;
mapContainer.style.cursor = 'grab';
});
}

// Research Actions (Like, Comment, Download)
function initResearchActions() {
// Like buttons
document.querySelectorAll('.btn-like').forEach(button => {
button.addEventListener('click', function() {
const icon = this.querySelector('i');
const count = this.querySelector('span') || this;
const currentCount = parseInt(count.textContent) || parseInt(count.innerHTML.match(/\d+/)[0]);

if (this.classList.contains('liked')) {
this.classList.remove('liked');
icon.classList.remove('fas');
icon.classList.add('far');
if (count.tagName === 'SPAN') {
count.textContent = currentCount - 1;
} else {
this.innerHTML = `<i class="far fa-heart"></i> ${currentCount - 1}`;
}
} else {
this.classList.add('liked');
icon.classList.remove('far');
icon.classList.add('fas');
if (count.tagName === 'SPAN') {
count.textContent = currentCount + 1;
} else {
this.innerHTML = `<i class="fas fa-heart"></i> ${currentCount + 1}`;
}

// Add pulse animation
this.classList.add('pulse-animation');
setTimeout(() => {
this.classList.remove('pulse-animation');
}, 300);
}
});
});

// Comment buttons
document.querySelectorAll('.btn-comment').forEach(button => {
button.addEventListener('click', function() {
const researchCard = this.closest('.research-card');
let commentSection = researchCard.querySelector('.comment-section');

if (!commentSection) {
commentSection = document.createElement('div');
commentSection.className = 'comment-section';
commentSection.innerHTML = `
<div class="comment-form">
<textarea placeholder="Add your comment..." rows="3"></textarea>
<div class="comment-actions">
<button class="btn btn-primary btn-sm">Post Comment</button>
<button class="btn btn-secondary btn-sm cancel-comment">Cancel</button>
</div>
</div>
`;
researchCard.appendChild(commentSection);

// Add event listeners for comment form
const cancelBtn = commentSection.querySelector('.cancel-comment');
const postBtn = commentSection.querySelector('.btn-primary');
const textarea = commentSection.querySelector('textarea');

cancelBtn.addEventListener('click', () => {
commentSection.remove();
});

postBtn.addEventListener('click', () => {
const comment = textarea.value.trim();
if (comment) {
// Simulate posting comment
postBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Posting...';
postBtn.disabled = true;

setTimeout(() => {
commentSection.remove();
// Update comment count
const commentBtn = researchCard.querySelector('.btn-comment');
const count = commentBtn.innerHTML.match(/\d+/);
if (count) {
commentBtn.innerHTML = `<i class="fas fa-comment"></i> Comment (${parseInt(count[0]) + 1})`;
}
}, 1000);
}
});
} else {
commentSection.remove();
}
});
});

// Download buttons
document.querySelectorAll('.btn-download').forEach(button => {
button.addEventListener('click', function(e) {
e.preventDefault();

const originalText = this.innerHTML;
this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Downloading...';
this.classList.add('downloading');

// Simulate download
setTimeout(() => {
this.innerHTML = '<i class="fas fa-check"></i> Downloaded!';
this.style.background = '#10b981';
this.style.borderColor = '#10b981';

setTimeout(() => {
this.innerHTML = originalText;
this.classList.remove('downloading');
this.style.background = '';
this.style.borderColor = '';
}, 2000);
}, 1500);
});
});
}

// Utility Functions
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

// Error Handling
window.addEventListener('error', function(e) {
console.error('JavaScript Error:', e.error);
// You can add error reporting here
});

// Performance Monitoring
if ('PerformanceObserver' in window) {
const perfObserver = new PerformanceObserver((list) => {
for (const entry of list.getEntries()) {
console.log(`Performance: ${entry.name} - ${entry.duration}ms`);
}
});
perfObserver.observe({ entryTypes: ['measure', 'navigation'] });
}

// Add CSS for dynamic elements
const dynamicStyles = document.createElement('style');
dynamicStyles.textContent = `
.pulse-animation {
animation: pulse 0.3s ease-in-out;
}

@keyframes pulse {
0% { transform: scale(1); }
50% { transform: scale(1.1); }
100% { transform: scale(1); }
}

.comment-section {
margin-top: 1rem;
padding-top: 1rem;
border-top: 1px solid var(--border-color);
}

.comment-form textarea {
width: 100%;
padding: 0.5rem;
border: 1px solid var(--border-color);
border-radius: 0.5rem;
resize: vertical;
margin-bottom: 0.5rem;
}

.comment-actions {
display: flex;
gap: 0.5rem;
}

.btn-sm {
padding: 0.25rem 0.75rem;
font-size: 0.875rem;
}

.loading-dots::after {
content: '.';
animation: loading-dots 1.5s infinite;
}

@keyframes loading-dots {
0%, 20% { content: '.'; }
40% { content: '..'; }
60%, 100% { content: '...'; }
}
`;
document.head.appendChild(dynamicStyles);
