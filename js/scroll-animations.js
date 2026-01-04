// ==========================================
// Civil Engineering Hub - Scroll Animations
// ==========================================

// Advanced Scroll Animations using GSAP and ScrollTrigger
if (typeof gsap !== 'undefined') {
gsap.registerPlugin(ScrollTrigger);

// Hero Parallax Effect
gsap.to('.hero-background', {
yPercent: -50,
ease: 'none',
scrollTrigger: {
trigger: '.hero',
start: 'top top',
end: 'bottom top',
scrub: true
}
});

// Hero Content Animation
gsap.from('.hero-content > *', {
y: 100,
opacity: 0,
duration: 1,
stagger: 0.2,
ease: 'power3.out',
scrollTrigger: {
trigger: '.hero',
start: 'top 80%',
toggleActions: 'play none none reverse'
}
});

// Features Cards Stagger Animation
gsap.from('.feature-card', {
y: 50,
opacity: 0,
duration: 0.8,
stagger: 0.1,
ease: 'power3.out',
scrollTrigger: {
trigger: '.features-grid',
start: 'top 80%',
toggleActions: 'play none none reverse'
}
});

// Project Cards Animation
gsap.from('.project-card', {
y: 60,
opacity: 0,
duration: 1,
stagger: 0.2,
ease: 'power3.out',
scrollTrigger: {
trigger: '.projects-carousel',
start: 'top 80%',
toggleActions: 'play none none reverse'
}
});

// Research Cards Animation
gsap.from('.research-card', {
x: -50,
opacity: 0,
duration: 0.8,
stagger: 0.15,
ease: 'power3.out',
scrollTrigger: {
trigger: '.research-grid',
start: 'top 80%',
toggleActions: 'play none none reverse'
}
});

// Team Members Animation
gsap.from('.team-member', {
y: 80,
opacity: 0,
duration: 1,
stagger: 0.1,
ease: 'power3.out',
scrollTrigger: {
trigger: '.team-grid',
start: 'top 80%',
toggleActions: 'play none none reverse'
}
});

// Geology Map Animation
gsap.from('.geology-map', {
x: -100,
opacity: 0,
duration: 1.2,
ease: 'power3.out',
scrollTrigger: {
trigger: '.geology-content',
start: 'top 80%',
toggleActions: 'play none none reverse'
}
});

gsap.from('.geology-info', {
x: 100,
opacity: 0,
duration: 1.2,
ease: 'power3.out',
scrollTrigger: {
trigger: '.geology-content',
start: 'top 80%',
toggleActions: 'play none none reverse'
}
});

// Section Headers Animation
gsap.from('.section-header', {
y: 50,
opacity: 0,
duration: 0.8,
ease: 'power3.out',
scrollTrigger: {
trigger: '.section-header',
start: 'top 90%',
toggleActions: 'play none none reverse'
}
});

// Newsletter Animation
gsap.from('.newsletter-content', {
scale: 0.8,
opacity: 0,
duration: 1,
ease: 'power3.out',
scrollTrigger: {
trigger: '.newsletter',
start: 'top 80%',
toggleActions: 'play none none reverse'
}
});

// Feature Icons Rotation
gsap.to('.feature-icon', {
rotation: 360,
duration: 20,
ease: 'none',
repeat: -1,
scrollTrigger: {
trigger: '.features',
start: 'top bottom',
end: 'bottom top',
scrub: 1
}
});

// Project Card Hover Effect
document.querySelectorAll('.project-card').forEach((card, index) => {
gsap.to(card, {
y: -10,
duration: 0.3,
ease: 'power2.out',
paused: true,
scrollTrigger: {
trigger: card,
start: 'top 80%',
toggleActions: 'play none none reverse',
onEnter: () => {
card.addEventListener('mouseenter', () => {
gsap.to(card, { y: -10, duration: 0.3 });
});
card.addEventListener('mouseleave', () => {
gsap.to(card, { y: 0, duration: 0.3 });
});
}
}
});
});

// Parallax Background for Sections
gsap.to('.features', {
backgroundPosition: '50% 100%',
ease: 'none',
scrollTrigger: {
trigger: '.features',
start: 'top bottom',
end: 'bottom top',
scrub: true
}
});

// Text Reveal Animation
document.querySelectorAll('.text-reveal').forEach(element => {
const text = element.textContent;
element.innerHTML = '';

text.split('').forEach(char => {
const span = document.createElement('span');
span.textContent = char === ' ' ? '\u00A0' : char;
span.style.display = 'inline-block';
span.style.opacity = '0';
span.style.transform = 'translateY(50px)';
element.appendChild(span);
});

gsap.to(element.querySelectorAll('span'), {
opacity: 1,
y: 0,
duration: 0.5,
stagger: 0.02,
ease: 'power3.out',
scrollTrigger: {
trigger: element,
start: 'top 80%',
toggleActions: 'play none none reverse'
}
});
});

// Counter Animation
document.querySelectorAll('.counter').forEach(counter => {
const target = parseInt(counter.dataset.target);
const duration = parseInt(counter.dataset.duration) || 2000;

gsap.from(counter, {
innerHTML: 0,
duration: duration / 1000,
ease: 'power3.out',
snap: { innerHTML: 1 },
scrollTrigger: {
trigger: counter,
start: 'top 80%',
toggleActions: 'play none none reverse'
},
onUpdate: function() {
counter.innerHTML = Math.ceil(this.targets()[0].innerHTML);
},
onComplete: function() {
counter.innerHTML = target;
}
});
});

// Progress Bar Animation
document.querySelectorAll('.progress-bar').forEach(bar => {
const targetWidth = bar.dataset.width || bar.style.width;

gsap.from(bar, {
width: '0%',
duration: 1.5,
ease: 'power3.out',
scrollTrigger: {
trigger: bar,
start: 'top 80%',
toggleActions: 'play none none reverse'
},
onComplete: function() {
bar.style.width = targetWidth;
}
});
});

// Icon Float Animation
gsap.to('.feature-icon', {
y: -10,
duration: 2,
ease: 'power2.inOut',
yoyo: true,
repeat: -1,
stagger: 0.2,
scrollTrigger: {
trigger: '.features-grid',
start: 'top 80%',
end: 'bottom 20%',
scrub: 1
}
});

// Map Points Animation
gsap.from('.map-point', {
scale: 0,
opacity: 0,
duration: 0.6,
stagger: 0.1,
ease: 'back.out(1.7)',
scrollTrigger: {
trigger: '.geology-map',
start: 'top 80%',
toggleActions: 'play none none reverse'
}
});

// Team Member Social Icons
document.querySelectorAll('.team-member').forEach(member => {
const socialIcons = member.querySelectorAll('.member-social a');

gsap.from(socialIcons, {
scale: 0,
rotation: -180,
duration: 0.4,
stagger: 0.1,
ease: 'back.out(1.7)',
scrollTrigger: {
trigger: member,
start: 'top 80%',
toggleActions: 'play none none reverse'
}
});
});

// Research Card Hover Animation
document.querySelectorAll('.research-card').forEach((card, index) => {
card.addEventListener('mouseenter', () => {
gsap.to(card, {
y: -10,
scale: 1.02,
duration: 0.3,
ease: 'power2.out'
});
});

card.addEventListener('mouseleave', () => {
gsap.to(card, {
y: 0,
scale: 1,
duration: 0.3,
ease: 'power2.out'
});
});
});

// Button Hover Effects
document.querySelectorAll('.btn').forEach(button => {
button.addEventListener('mouseenter', () => {
gsap.to(button, {
scale: 1.05,
duration: 0.2,
ease: 'power2.out'
});
});

button.addEventListener('mouseleave', () => {
gsap.to(button, {
scale: 1,
duration: 0.2,
ease: 'power2.out'
});
});
});

// Newsletter Form Animation
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
gsap.from(newsletterForm, {
y: 50,
opacity: 0,
duration: 1,
ease: 'power3.out',
scrollTrigger: {
trigger: newsletterForm,
start: 'top 80%',
toggleActions: 'play none none reverse'
}
});
}

// Footer Animation
gsap.from('.footer-section', {
y: 50,
opacity: 0,
duration: 0.8,
stagger: 0.1,
ease: 'power3.out',
scrollTrigger: {
trigger: '.footer',
start: 'top 80%',
toggleActions: 'play none none reverse'
}
});

// Back to Top Button Animation
const backToTop = document.getElementById('backToTop');
if (backToTop) {
gsap.from(backToTop, {
scale: 0,
rotation: -180,
duration: 0.5,
ease: 'back.out(1.7)',
scrollTrigger: {
trigger: 'body',
start: 'top -100',
toggleActions: 'play none none reverse'
}
});
}
}

// Custom Scroll Animations without GSAP
function initCustomScrollAnimations() {
// Fallback animations for when GSAP is not available
if (typeof gsap === 'undefined') {
const observerOptions = {
threshold: 0.1,
rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
entries.forEach(entry => {
if (entry.isIntersecting) {
entry.target.classList.add('animated');
}
});
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('[class*="animate"], [class*="fade"], [class*="slide"], [class*="zoom"], [class*="rotate"]').forEach(el => {
observer.observe(el);
});
}
}

// Initialize custom animations
initCustomScrollAnimations();

// Smooth scroll behavior for older browsers
if (!('scrollBehavior' in document.documentElement.style)) {
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
anchor.addEventListener('click', function(e) {
e.preventDefault();
const target = document.querySelector(this.getAttribute('href'));
if (target) {
const targetPosition = target.offsetTop - 80;
window.scrollTo({
top: targetPosition,
behavior: 'smooth'
});
}
});
});
}