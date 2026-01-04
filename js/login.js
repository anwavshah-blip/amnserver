// ==========================================
// Civil Engineering Hub - Login JavaScript
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
initLoginForm();
initPasswordToggle();
initPasswordReset();
initSocialLogin();
initDemoAccess();
initFormValidation();
});

// Login Form Handler
function initLoginForm() {
const loginForm = document.getElementById('loginForm');
const submitBtn = loginForm.querySelector('.btn-login');

loginForm.addEventListener('submit', async function(e) {
e.preventDefault();

// Get form data
const formData = new FormData(this);
const email = formData.get('email');
const password = formData.get('password');
const remember = formData.get('remember');

// Basic validation
if (!validateEmail(email)) {
showError('Please enter a valid email address');
return;
}

if (password.length < 6) {
showError('Password must be at least 6 characters');
return;
}

// Show loading state
submitBtn.classList.add('loading');
submitBtn.disabled = true;

try {
// Simulate API call
await simulateLogin(email, password, remember);

// Successful login
showSuccess('Login successful! Redirecting...');

// Store login state
if (remember) {
localStorage.setItem('rememberedEmail', email);
}

// Redirect after delay
setTimeout(() => {
window.location.href = 'dashboard.html';
}, 1500);

} catch (error) {
showError(error.message);
} finally {
submitBtn.classList.remove('loading');
submitBtn.disabled = false;
}
});
}

// Password Toggle Visibility
function initPasswordToggle() {
const toggleBtns = document.querySelectorAll('.toggle-password');

toggleBtns.forEach(btn => {
btn.addEventListener('click', function() {
const input = this.previousElementSibling;
const icon = this.querySelector('i');

if (input.type === 'password') {
input.type = 'text';
icon.classList.remove('fa-eye');
icon.classList.add('fa-eye-slash');
} else {
input.type = 'password';
icon.classList.remove('fa-eye-slash');
icon.classList.add('fa-eye');
}
});
});
}

// Password Reset Modal
function initPasswordReset() {
const forgotPasswordLink = document.querySelector('.forgot-password');
const modal = document.getElementById('passwordResetModal');
const closeBtn = modal.querySelector('.modal-close');
const resetForm = document.getElementById('passwordResetForm');

forgotPasswordLink.addEventListener('click', function(e) {
e.preventDefault();
modal.classList.add('active');
});

closeBtn.addEventListener('click', function() {
modal.classList.remove('active');
});

modal.addEventListener('click', function(e) {
if (e.target === modal) {
modal.classList.remove('active');
}
});

resetForm.addEventListener('submit', async function(e) {
e.preventDefault();

const email = this.resetEmail.value;

if (!validateEmail(email)) {
showError('Please enter a valid email address', this);
return;
}

const submitBtn = this.querySelector('.btn-primary');
const originalText = submitBtn.innerHTML;

submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
submitBtn.disabled = true;

try {
await simulatePasswordReset(email);
showSuccess('Password reset link sent! Check your email.', this);

setTimeout(() => {
modal.classList.remove('active');
this.reset();
}, 2000);

} catch (error) {
showError(error.message, this);
} finally {
submitBtn.innerHTML = originalText;
submitBtn.disabled = false;
}
});
}

// Social Login
function initSocialLogin() {
const socialButtons = document.querySelectorAll('.btn-social');

socialButtons.forEach(btn => {
btn.addEventListener('click', function() {
const provider = this.classList.contains('btn-google') ? 'Google' : 'LinkedIn';

// Simulate social login
this.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Connecting with ${provider}...`;
this.disabled = true;

setTimeout(() => {
showSuccess(`Successfully connected with ${provider}!`);
window.location.href = 'dashboard.html';
}, 2000);
});
});
}

// Demo Access
function initDemoAccess() {
const demoBtn = document.querySelector('.btn-demo');

demoBtn.addEventListener('click', function() {
// Fill in demo credentials
document.getElementById('email').value = 'demo@cehub.com';
document.getElementById('password').value = 'demo123';

// Show notification
showSuccess('Demo credentials filled. Click Login to continue.');

// Add visual feedback
this.innerHTML = '<i class="fas fa-check"></i> Demo Ready!';
this.style.background = '#10b981';
this.style.color = 'white';

setTimeout(() => {
this.innerHTML = 'Try Demo Access';
this.style.background = '';
this.style.color = '';
}, 2000);
});
}

// Form Validation
function initFormValidation() {
const inputs = document.querySelectorAll('.input-wrapper input');

inputs.forEach(input => {
// Real-time validation
input.addEventListener('blur', function() {
validateField(this);
});

input.addEventListener('input', function() {
clearError(this);
});
});
}

// Field Validation
function validateField(field) {
const value = field.value.trim();
const fieldName = field.name;

clearError(field);

if (!value) {
showFieldError(field, `${fieldName} is required`);
return false;
}

if (fieldName === 'email' && !validateEmail(value)) {
showFieldError(field, 'Please enter a valid email address');
return false;
}

if (fieldName === 'password' && value.length < 6) {
showFieldError(field, 'Password must be at least 6 characters');
return false;
}

return true;
}

// Email Validation
function validateEmail(email) {
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
return emailRegex.test(email);
}

// Error Handling
function showError(message, form = null) {
const errorContainer = createErrorContainer(message);
const targetForm = form || document.querySelector('.login-form');
targetForm.insertBefore(errorContainer, targetForm.firstChild);

// Auto-hide after 5 seconds
setTimeout(() => {
errorContainer.remove();
}, 5000);
}

function showFieldError(field, message) {
const errorElement = document.createElement('div');
errorElement.className = 'field-error';
errorElement.textContent = message;

const inputWrapper = field.closest('.input-wrapper');
inputWrapper.classList.add('error');
inputWrapper.appendChild(errorElement);
}

function clearError(field) {
const inputWrapper = field.closest('.input-wrapper');
const errorElement = inputWrapper.querySelector('.field-error');

if (errorElement) {
errorElement.remove();
}

inputWrapper.classList.remove('error');
}

function createErrorContainer(message) {
const errorDiv = document.createElement('div');
errorDiv.className = 'error-message';
errorDiv.innerHTML = `
<i class="fas fa-exclamation-circle"></i>
<span>${message}</span>
<button type="button" class="close-error">&times;</button>
`;

errorDiv.querySelector('.close-error').addEventListener('click', function() {
errorDiv.remove();
});

return errorDiv;
}

// Success Message
function showSuccess(message, form = null) {
const successContainer = createSuccessContainer(message);
const targetForm = form || document.querySelector('.login-form');
targetForm.insertBefore(successContainer, targetForm.firstChild);

// Auto-hide after 3 seconds
setTimeout(() => {
successContainer.remove();
}, 3000);
}

function createSuccessContainer(message) {
const successDiv = document.createElement('div');
successDiv.className = 'success-message';
successDiv.innerHTML = `
<i class="fas fa-check-circle"></i>
<span>${message}</span>
`;

return successDiv;
}

// Simulate API Calls
async function simulateLogin(email, password, remember) {
return new Promise((resolve, reject) => {
setTimeout(() => {
// Simulate successful login for demo credentials
if (email === 'demo@cehub.com' && password === 'demo123') {
resolve({ success: true, user: { email, name: 'Demo User' } });
} else if (email === 'admin@cehub.com' && password === 'admin123') {
resolve({ success: true, user: { email, name: 'Admin User', role: 'admin' } });
} else {
// Simulate random failures
if (Math.random() > 0.7) {
reject(new Error('Invalid email or password'));
} else {
resolve({ success: true, user: { email, name: 'User' } });
}
}
}, 1500);
});
}

async function simulatePasswordReset(email) {
return new Promise((resolve, reject) => {
setTimeout(() => {
if (Math.random() > 0.2) {
resolve({ success: true, message: 'Reset link sent' });
} else {
reject(new Error('Email not found in our system'));
}
}, 1000);
});
}

// Remember Me Functionality
function initRememberMe() {
const rememberedEmail = localStorage.getItem('rememberedEmail');
if (rememberedEmail) {
document.getElementById('email').value = rememberedEmail;
document.getElementById('remember').checked = true;
}
}

// Auto-login for demo purposes
function initAutoLogin() {
const urlParams = new URLSearchParams(window.location.search);
const demo = urlParams.get('demo');

if (demo === 'true') {
document.getElementById('email').value = 'demo@cehub.com';
document.getElementById('password').value = 'demo123';

// Trigger login after a short delay
setTimeout(() => {
document.getElementById('loginForm').dispatchEvent(new Event('submit'));
}, 1000);
}
}

// Add CSS for dynamic elements
const loginStyles = document.createElement('style');
loginStyles.textContent = `
.error-message {
background: #fef2f2;
border: 1px solid #fecaca;
color: #dc2626;
padding: var(--spacing-sm) var(--spacing-md);
border-radius: var(--radius-md);
margin-bottom: var(--spacing-md);
display: flex;
align-items: center;
gap: var(--spacing-sm);
font-size: 0.875rem;
}

.error-message .close-error {
background: none;
border: none;
color: #dc2626;
cursor: pointer;
margin-left: auto;
font-size: 1.25rem;
}

.success-message {
background: #f0fdf4;
border: 1px solid #bbf7d0;
color: #16a34a;
padding: var(--spacing-sm) var(--spacing-md);
border-radius: var(--radius-md);
margin-bottom: var(--spacing-md);
display: flex;
align-items: center;
gap: var(--spacing-sm);
font-size: 0.875rem;
}

.field-error {
color: #dc2626;
font-size: 0.75rem;
margin-top: var(--spacing-xs);
}

.input-wrapper.error input {
border-color: #dc2626;
}

.remember-me {
font-size: 0.875rem;
}

.forgot-password {
font-size: 0.875rem;
}
`;

document.head.appendChild(loginStyles);

// Initialize additional features
initRememberMe();
initAutoLogin();

// Export functions for external use
window.LoginModule = {
validateEmail,
simulateLogin,
simulatePasswordReset,
showError,
showSuccess
};