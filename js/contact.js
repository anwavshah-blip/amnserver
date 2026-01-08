// Contact Form Handling and Validation

document.addEventListener('DOMContentLoaded', function() {
    initializeContactForm();
    initializeContactMap();
});

function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    const formInputs = contactForm.querySelectorAll('input, textarea');
    const submitBtn = contactForm.querySelector('.submit-btn');
    
    // Real-time validation
    formInputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearError);
    });
    
    // Form submission
    contactForm.addEventListener('submit', handleFormSubmit);
    
    // Add input animations
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (this.value === '') {
                this.parentElement.classList.remove('focused');
            }
        });
    });
}

function validateField(event) {
    const field = event.target;
    const value = field.value.trim();
    const fieldName = field.name;
    let isValid = true;
    let errorMessage = '';
    
    // Remove previous error
    clearError(event);
    
    // Validation rules
    switch(fieldName) {
        case 'name':
            if (value.length < 2) {
                isValid = false;
                errorMessage = 'Name must be at least 2 characters long';
            } else if (value.length > 50) {
                isValid = false;
                errorMessage = 'Name must be less than 50 characters';
            } else if (!/^[a-zA-Z\s'-]+$/.test(value)) {
                isValid = false;
                errorMessage = 'Name can only contain letters, spaces, hyphens, and apostrophes';
            }
            break;
            
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            } else if (value.length > 100) {
                isValid = false;
                errorMessage = 'Email address is too long';
            }
            break;
            
        case 'subject':
            if (value.length < 5) {
                isValid = false;
                errorMessage = 'Subject must be at least 5 characters long';
            } else if (value.length > 100) {
                isValid = false;
                errorMessage = 'Subject must be less than 100 characters';
            }
            break;
            
        case 'message':
            if (value.length < 10) {
                isValid = false;
                errorMessage = 'Message must be at least 10 characters long';
            } else if (value.length > 1000) {
                isValid = false;
                errorMessage = 'Message must be less than 1000 characters';
            }
            break;
    }
    
    if (!isValid) {
        showFieldError(field, errorMessage);
    }
    
    return isValid;
}

function showFieldError(field, message) {
    // Remove existing error
    const existingError = field.parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add error styling
    field.parentElement.classList.add('error');
    field.classList.add('error');
    
    // Create error message element
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    // Insert after field
    field.parentElement.appendChild(errorDiv);
    
    // Add animation
    errorDiv.style.animation = 'slideInDown 0.3s ease';
}

function clearError(event) {
    const field = event.target;
    const parent = field.parentElement;
    
    parent.classList.remove('error');
    field.classList.remove('error');
    
    const errorMessage = parent.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.style.animation = 'slideOutUp 0.3s ease';
        setTimeout(() => errorMessage.remove(), 300);
    }
}

function handleFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitBtn = form.querySelector('.submit-btn');
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Validate all fields
    const fields = form.querySelectorAll('input, textarea');
    let isFormValid = true;
    
    fields.forEach(field => {
        if (!validateField({ target: field })) {
            isFormValid = false;
        }
    });
    
    if (!isFormValid) {
        // Focus first error field
        const firstError = form.querySelector('.error');
        if (firstError) {
            firstError.focus();
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
    }
    
    // Show loading state
    const originalHTML = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission
    simulateFormSubmission(data)
        .then(response => {
            // Success state
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent Successfully!';
            submitBtn.style.background = '#48bb78';
            
            // Show success message
            showSuccessMessage('Your message has been sent successfully! We\'ll get back to you soon.');
            
            // Reset form
            form.reset();
            fields.forEach(field => {
                field.parentElement.classList.remove('focused');
            });
            
            // Reset button after delay
            setTimeout(() => {
                submitBtn.innerHTML = originalHTML;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
            }, 3000);
        })
        .catch(error => {
            // Error state
            submitBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Failed to Send';
            submitBtn.style.background = '#f56565';
            
            showErrorMessage('Failed to send your message. Please try again later.');
            
            // Reset button after delay
            setTimeout(() => {
                submitBtn.innerHTML = originalHTML;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
            }, 3000);
            
            console.error('Form submission error:', error);
        });
}

function simulateFormSubmission(data) {
    // Simulate API call
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate 90% success rate
            if (Math.random() > 0.1) {
                console.log('Form data submitted:', data);
                resolve({ success: true, data });
            } else {
                reject({ success: false, error: 'Network error' });
            }
        }, 2000);
    });
}

function showSuccessMessage(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'alert alert-success';
    successDiv.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
        <button class="close-btn" onclick="this.parentElement.remove()">&times;</button>
    `;
    
    const form = document.getElementById('contactForm');
    form.parentElement.insertBefore(successDiv, form);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (successDiv.parentElement) {
            successDiv.remove();
        }
    }, 5000);
}

function showErrorMessage(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'alert alert-error';
    errorDiv.innerHTML = `
        <i class="fas fa-exclamation-circle"></i>
        <span>${message}</span>
        <button class="close-btn" onclick="this.parentElement.remove()">&times;</button>
    `;
    
    const form = document.getElementById('contactForm');
    form.parentElement.insertBefore(errorDiv, form);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (errorDiv.parentElement) {
            errorDiv.remove();
        }
    }, 5000);
}

function initializeContactMap() {
    // Initialize interactive map (placeholder)
    const mapContainer = document.querySelector('.map-container');
    if (!mapContainer) return;
    
    // Create a simple interactive map placeholder
    mapContainer.innerHTML = `
        <div class="map-placeholder">
            <i class="fas fa-map-marked-alt"></i>
            <p>Interactive Map</p>
            <small>Kathmandu, Nepal</small>
        </div>
    `;
    
    // Add click event to show location details
    mapContainer.addEventListener('click', function() {
        showLocationDetails();
    });
}

function showLocationDetails() {
    const modal = document.createElement('div');
    modal.className = 'location-modal';
    modal.innerHTML = `
        <div class="location-modal-content glassmorphic">
            <button class="close-modal" onclick="this.closest('.location-modal').remove()">
                <i class="fas fa-times"></i>
            </button>
            <h3>Our Location</h3>
            <div class="location-details">
                <div class="location-item">
                    <i class="fas fa-map-marker-alt"></i>
                    <div>
                        <strong>Address</strong>
                        <p>Kathmandu, Nepal</p>
                    </div>
                </div>
                <div class="location-item">
                    <i class="fas fa-clock"></i>
                    <div>
                        <strong>Office Hours</strong>
                        <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
                        <p>Saturday: 10:00 AM - 2:00 PM</p>
                    </div>
                </div>
                <div class="location-item">
                    <i class="fas fa-envelope"></i>
                    <div>
                        <strong>Contact</strong>
                        <p>john.doe@spinybabbler.org</p>
                        <p>+977-9841-234567</p>
                    </div>
                </div>
            </div>
            <div class="location-actions">
                <button class="btn btn-primary" onclick="getDirections()">
                    <i class="fas fa-directions"></i> Get Directions
                </button>
                <button class="btn btn-secondary" onclick="saveContact()">
                    <i class="fas fa-save"></i> Save Contact
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add animation
    setTimeout(() => {
        modal.querySelector('.location-modal-content').style.animation = 'slideInUp 0.3s ease';
    }, 10);
}

function getDirections() {
    // Open Google Maps with location
    window.open('https://maps.google.com/?q=Kathmandu,+Nepal', '_blank');
}

function saveContact() {
    // Create vCard data
    const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:John Doe
ORG:The Journey of Spiny Babbler
TEL:+9779841234567
EMAIL:john.doe@spinybabbler.org
URL:https://spinybabbler.org
ADR:;;Kathmandu;;;Nepal
NOTE:Wildlife Researcher & Conservationist
END:VCARD`;
    
    // Create download link
    const blob = new Blob([vCardData], { type: 'text/vcard' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'john-doe-spiny-babbler.vcf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    showSuccessMessage('Contact saved successfully!');
}

// Add CSS animations
const contactStyles = document.createElement('style');
contactStyles.textContent = `
    .form-group {
        position: relative;
        margin-bottom: 1.5rem;
    }
    
    .form-group.focused label {
        color: var(--accent-color);
        transform: translateY(-20px);
        font-size: 0.9rem;
    }
    
    .form-group label {
        position: absolute;
        left: 0.75rem;
        top: 0.75rem;
        color: var(--text-secondary);
        transition: all 0.3s ease;
        pointer-events: none;
        background: var(--bg-primary);
        padding: 0 0.25rem;
    }
    
    .form-group input:focus + label,
    .form-group textarea:focus + label,
    .form-group input:not(:placeholder-shown) + label,
    .form-group textarea:not(:placeholder-shown) + label {
        color: var(--accent-color);
        transform: translateY(-20px);
        font-size: 0.9rem;
    }
    
    .form-group.error input,
    .form-group.error textarea {
        border-color: #f56565;
        box-shadow: 0 0 0 3px rgba(245, 101, 101, 0.1);
    }
    
    .error-message {
        color: #f56565;
        font-size: 0.875rem;
        margin-top: 0.25rem;
        animation: slideInDown 0.3s ease;
    }
    
    @keyframes slideInDown {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideOutUp {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(-10px);
        }
    }
    
    .alert {
        padding: 1rem;
        border-radius: 8px;
        margin-bottom: 1rem;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        animation: slideInDown 0.3s ease;
    }
    
    .alert-success {
        background: rgba(72, 187, 120, 0.1);
        border: 1px solid rgba(72, 187, 120, 0.3);
        color: #48bb78;
    }
    
    .alert-error {
        background: rgba(245, 101, 101, 0.1);
        border: 1px solid rgba(245, 101, 101, 0.3);
        color: #f56565;
    }
    
    .alert .close-btn {
        margin-left: auto;
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0.7;
        transition: opacity 0.3s ease;
    }
    
    .alert .close-btn:hover {
        opacity: 1;
    }
    
    .map-placeholder {
        height: 300px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background: var(--bg-secondary);
        border-radius: 15px;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .map-placeholder:hover {
        background: var(--bg-primary);
        transform: translateY(-2px);
    }
    
    .map-placeholder i {
        font-size: 3rem;
        color: var(--accent-color);
        margin-bottom: 1rem;
    }
    
    .map-placeholder p {
        font-size: 1.2rem;
        color: var(--text-primary);
        margin-bottom: 0.5rem;
    }
    
    .map-placeholder small {
        color: var(--text-secondary);
    }
    
    .location-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
        backdrop-filter: blur(5px);
    }
    
    .location-modal-content {
        max-width: 500px;
        width: 90%;
        padding: 2rem;
        position: relative;
    }
    
    .close-modal {
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: var(--text-secondary);
        transition: color 0.3s ease;
    }
    
    .close-modal:hover {
        color: var(--text-primary);
    }
    
    .location-details {
        margin: 1.5rem 0;
    }
    
    .location-item {
        display: flex;
        align-items: flex-start;
        gap: 1rem;
        margin-bottom: 1.5rem;
        padding: 1rem;
        background: rgba(66, 153, 225, 0.05);
        border-radius: 8px;
    }
    
    .location-item i {
        color: var(--accent-color);
        font-size: 1.2rem;
        margin-top: 0.2rem;
    }
    
    .location-item strong {
        color: var(--text-primary);
        display: block;
        margin-bottom: 0.3rem;
    }
    
    .location-item p {
        color: var(--text-secondary);
        margin: 0;
        line-height: 1.5;
    }
    
    .location-actions {
        display: flex;
        gap: 1rem;
        justify-content: center;
        margin-top: 2rem;
    }
    
    .btn {
        padding: 0.75rem 1.5rem;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-size: 1rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        transition: all 0.3s ease;
        text-decoration: none;
    }
    
    .btn-primary {
        background: var(--accent-color);
        color: white;
    }
    
    .btn-primary:hover {
        background: var(--accent-hover);
        transform: translateY(-2px);
    }
    
    .btn-secondary {
        background: var(--bg-secondary);
        color: var(--text-primary);
        border: 1px solid var(--border-color);
    }
    
    .btn-secondary:hover {
        background: var(--bg-primary);
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(contactStyles);